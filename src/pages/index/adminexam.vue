<template lang="html">
  <div class="" v-loading="loading">
    <el-tabs v-model="activeName2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane label="所有试卷" name="myexam">
        <!--获取试卷信息-->
        <el-table
          class="table"
          :data="paperinfo"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="paperid"
            label="试卷编号"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="papername"
            label="考试名称"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="papertime"
            label="考试时间(分)"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="考试状态"
            width="130"
            :formatter="checkStatus">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button  type="danger" size="mini" v-if="paperinfo[scope.$index].status=='0'" @click="stopExam(paperinfo[scope.$index].paperid)">结束考试</el-button>
              <el-button  type="warning" size="mini" v-if="paperinfo[scope.$index].status=='1'" @click="goScoreView()">查看成绩</el-button>
              <el-button  type="success" size="mini" v-if="paperinfo[scope.$index].status=='2'" @click="startExam(paperinfo[scope.$index].paperid)">发布考试</el-button>

              <el-button type="primary" plain size="mini" v-if="paperinfo[scope.$index].status=='2'" @click="paperView(paperinfo[scope.$index].paperid,true)">编辑试卷</el-button>
              <el-button type="primary" plain size="mini" v-else @click="paperView(paperinfo[scope.$index].paperid),false">查看试卷</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" size="small" class="addpaper" @click="dialogFormVisible = true">添加考试</el-button>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <paperoption :viewpaperid="viewpaperid" :color="color" :isEdit="isEdit"></paperoption>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加考试对话框 -->
    <el-dialog title="添加考试" :visible.sync="dialogFormVisible">
      <el-form :model="paperForm">
        <el-form-item label="考试名称：" :label-width="formLabelWidth">
          <el-input type="text" auto-complete="off" v-model="paperForm.papername"></el-input>
        </el-form-item>

        <el-form-item label="考试时间：" :label-width="formLabelWidth">
          <el-input-number v-model="paperForm.papertime" :min="10" :max="120" label="考试时间">分钟</el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="请选择考试班级" :visible.sync="dialogFormVisible3">
      <el-form :model="examclass.classids">
        <el-form-item>
          <el-checkbox-group v-model="examclass.classids" size="mini">
            <el-checkbox-button v-for="item in classinfo" :label="item" :key="item">{{item}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="startExamClose">取 消</el-button>
        <el-button type="primary" @click="startExamConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import paperoption from '@/components/paperoption.vue'
export default {
  name: 'adminexam',
  props: ['color'],
  components: {
    paperoption
  },
  data(){
    return{
      isEdit:'',
      viewpaperid:'',
      editableTabsValue2: '0',
      paperinfo:[],
      activeName2: 'myexam',
      editableTabs2: [],
      tabIndex: 0,
      dialogFormVisible:false,
      dialogFormVisible3:false,
      examclass:{
        paperid:'',
        classids:[]
      },
      formLabelWidth:'200px',
      paperForm:{
        papername:'',
        papertime:'20'
      }
    }
  },
    methods: {
      goScoreView(){
        this.$router.push({ path: '/adminindex/adminscore' });
      },
      stopExam(paperid){
        this.$confirm('确认结束考试？', '提示', {
          confirmButtonText: '立即结束',
          cancelButtonText: '再等等',
          type: 'warning'
        }).then(() => {
            var that = this;
            that.$axios.get('https://xunhaha.top/oes/api/stopexam',{
            //this.$axios.get('http://localhost:8080/oes/api/paperList',{
              params:{
                paperid:paperid
              }
            }).then(function(res){
              that.$message({
                type: 'success',
                message: '考试已结束，您可以查看考试分析'
              });
              that.loading = true;
              that.$axios.get('https://xunhaha.top/oes/api/admingetpaperinfo',{
              //this.$axios.get('http://localhost:8080/oes/api/paperList',{
                params:{

                }
              }).then(function(res){
                  that.paperinfo = res.data;
                  that.$message.success('加载成功');

                  that.loading = false;
                //ok
              }).catch(function(err){
                //error
                that.$message.error('网络好像有点问题');

                that.loading = false;
              });
              //ok
            }).catch(function(err){
              //error
              that.$message.error('网络好像有点问题');
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
      },
      startExamClose(){
        this.dialogFormVisible3=false;
        this.examclass.paperid = '';
        this.examclass.classids=[];
      },
      startExamConfirm(){
        if(this.examclass.classids==''){
          this.$message.warning('请选择班级');
          return false;
        }
        var that = this;
        this.$axios.post('https://xunhaha.top/oes/api/startexaming',that.examclass,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res){
            that.$message.success('成功开始考试');
            //获取试卷列表
            that.loading = true;
            that.$axios.get('https://xunhaha.top/oes/api/admingetpaperinfo',{
            //this.$axios.get('http://localhost:8080/oes/api/paperList',{
              params:{

              }
            }).then(function(res){
                that.paperinfo = res.data;
                that.$message.success('刷新成功');

                that.loading = false;
              //ok
            }).catch(function(err){
              //error
              that.$message.error('网络好像有点问题');

              that.loading = false;
            });
            that.startExamClose();
          //ok
        }).catch(function(err){
          //error
          that.$message.error('网络好像有点问题');
        });
      },
      startExam(paperid){
        this.dialogFormVisible3=true;
        this.examclass.paperid=paperid;
      },
      checkStatus(row, column,cellValue) {
        if(cellValue=='0'){
          return '考试中';
        }else if(cellValue=='1'){
          return '已结束';
        }else if(cellValue=='2'){
          return '未开始';
        }
      },
      paperView(data,isEdit){
        this.viewpaperid = data;
        this.isEdit=isEdit;
        this.addTab(this.editableTabsValue2);
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: '试卷详情',
          name: newTabName
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      dialogConfirm(){
        var that = this;
        that.$axios.get('https://xunhaha.top/oes/api/adminaddpaper',{
          params:{
            papername: that.paperForm.papername,
            papertime: that.paperForm.papertime
          }
        }).then(function(res){
            that.$message.success('新建考试成功，请尽快完善考试信息');
            that.$axios.get('https://xunhaha.top/oes/api/admingetpaperinfo',{
            //this.$axios.get('http://localhost:8080/oes/api/paperList',{
              params:{

              }
            }).then(function(res){
                that.paperinfo = res.data;
              //ok
            }).catch(function(err){
              //error
              that.$message.error('网络好像有点问题');
            });
            that.dialogClose();
        }).catch(function(err){
          //error
          alert(err);
          that.$message.error('网络好像有点问题');
        });
      },
      dialogClose(){
        this.paperForm.papername='';
        this.paperForm.papertime='20';
        this.dialogFormVisible = false;
      }
    },
    beforeCreate() {
      //do something before creating vue instance
      //获取试卷列表
      var that = this;
      that.loading = true;
      this.$axios.get('https://xunhaha.top/oes/api/admingetpaperinfo',{
      //this.$axios.get('http://localhost:8080/oes/api/paperList',{
        params:{

        }
      }).then(function(res){
          that.paperinfo = res.data;
          that.loading = false;
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');

        that.loading = false;
      });
    },
    created() {
      //do something after creating vue instance
      var that = this;
      //do something after creating vue instance
      //获取班级信息
      this.$axios.get('https://xunhaha.top/oes/api/classinfo',{
        params:{
          action: 'get'
        }
      }).then(function(res){
          that.classinfo = res.data;
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    }
}
</script>

<style lang="css" scoped>
.addpaper{
  margin-top: 15px;
  float: left;
}
</style>
