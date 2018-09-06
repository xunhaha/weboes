<template lang="html">
  <transition name="el-zoom-in-top">
  <div :style="{color:color}" v-loading="loading" v-if="uploadshow">
    <el-table
       :data="questionList"
       border
       row-style="height:10px"
       @selection-change="handleSelectionChange"
       style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
       <el-table-column
         prop="qid"
         label="问题编号"
         sortable
         align="center"
         width="250">
       </el-table-column>
       <el-table-column
         prop="qdescription"
         label="题干"
         align="center"
         width="450">
       </el-table-column>
       <el-table-column
         prop="qclassification"
         label="题型"
         sortable
         width="100"
         align="center"
         :filters="[{text: '选择题', value: '0'}, {text: '判断题', value: '1'}]"
         :filter-method="filterHandler"
         :formatter="checkQclassification">
       </el-table-column>
       <el-table-column
         prop="qcomplexity"
         label="难度"
         sortable
         width="100"
         align="center"
         :formatter="checkQcomplexity">
       </el-table-column>
       <el-table-column
         prop="qscore"
         label="分值(分)"
         sortable
         align="center"
         width="100">
       </el-table-column>
       <el-table-column
         label="操作"
         align="center">
         <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-tickets" circle size="mini" @mouseenter.native="enter(scope)" @mouseleave.native="qinfoshow=false"></el-button>
           <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="oneDel(scope.row)"></el-button>
         </template>
       </el-table-column>
     </el-table>
     <el-button type="primary" size="mini" class="addquestion" @click="dialogFormVisible = true" v-if="addquestionVisible">添加题目</el-button>
     <el-button type="primary" size="mini" class="addquestion" @click="dialogFormVisible2 = true" v-if="addquestionVisible">添加至</el-button>
     <el-button type="primary" size="mini" class="addquestion" @click="dialogFormVisible3 = true" v-if="addquestionVisible">自动选题</el-button>
     <el-button type="danger" size="mini" class="addquestion" @click="someDel" v-if="addquestionVisible">批量删除</el-button>
     <el-button type="primary" size="mini" class="addquestion" @click="uploadshow=false" v-if="addquestionVisible">批量导入</el-button>
     <el-button type="primary" @click="getQuestion" class="getclass">点击查询</el-button>

     <transition name="card">
     <el-card class="box-card3 card_left" shadow="hover" v-if="qinfoshow">
       <h1>编号：{{this.questioninfo.old.qid}}</h1>
       <h1>题干：</h1><p style="margin-left:20px;margin-top:10px;">{{this.questioninfo.old.qdescription}}</p>
       <h1>题型：{{this.questioninfo.old.qclassification=='0'?'选择题':'判断题'}}</h1>
       <span v-if="this.questioninfo.old.qclassification=='0'">
         <h1>选项：</h1>
         <span style="margin-left:20px;margin-top:10px;" v-for="(elem,index) in this.questioninfo.new.options" :key="elem.key">选项{{index+1}}：{{elem.option}}<br></span>
       </span>
       <h1>正确答案：{{this.questioninfo.old.qclassification=='0'?('选项'+(Number(this.questioninfo.new.answer)-4)):(this.questioninfo.new.answer=='5'?'对':'错')}}</h1>
       <h1>小广告：</h1>
       <img src="http://s9.rr.itc.cn/r/wapChange/20168_15_12/a8kh2u7851370846233.jpg" width="100%" alt="huwwei">
     </el-card>
   </transition>
     <!--自动选题-->
     <el-dialog title="自动选题" :visible.sync="dialogFormVisible3">
       <el-form :model="addAutoForm.paperid">
         <el-form-item label="添加至:" :label-width="formLabelWidth">
           <el-select v-model="addAutoForm.paperid" placeholder="请选择试卷">
             <el-option  v-for="elem in paperStatus" :key="elem.key" :label="elem.papername" :value="elem.paperid"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="试卷难度：" :label-width="formLabelWidth">
           <el-rate
             v-model="addAuto.qcomplexity"
             :max="3"
             :texts="['简单','一般','偏难']"
             show-text>
           </el-rate>
         </el-form-item>
         <el-form-item label="试卷总分：" :label-width="formLabelWidth">
           <el-input-number v-model="addAuto.qscore" :min="1" :max="150" label="满分"></el-input-number>
         </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="addAutoClose">取 消</el-button>
         <el-button type="primary" @click="addAutoConfirm">确 定</el-button>
       </div>
     </el-dialog>

    <!-- 添加题目对话框 -->
    <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
      <el-form :model="questionform">
        <el-form-item label="题干：" :label-width="formLabelWidth">
          <el-input type="text" auto-complete="off" v-model="questionform.qdescription"></el-input>
        </el-form-item>
        <el-form-item label="题型：" :label-width="formLabelWidth">
          <el-radio v-model="questionform.qclassification" label="0">选择</el-radio>
          <el-radio v-model="questionform.qclassification" label="1">判断</el-radio>
        </el-form-item>
        <el-form-item label="难度：" :label-width="formLabelWidth">
          <el-rate
            v-model="questionform.qcomplexity"
            :max="3"
            :texts="['简单','一般','偏难']"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="分值：" :label-width="formLabelWidth">
          <el-input-number v-model="questionform.qscore" :min="1" :max="30" label="分值"></el-input-number>
        </el-form-item>

        <el-form-item label="选项：" :label-width="formLabelWidth" v-if="questionform.qclassification=='0'" v-model="questionform.options">
          <el-input type="text" size="mini" auto-complete="off" v-for="elem in questionform.optionnum" :key="elem.key" v-model="questionform.options[elem-1]"></el-input>
          <el-button type="primary" round @click="questionform.optionnum++">+</el-button>
        </el-form-item>

        <el-form-item label="答案" :label-width="formLabelWidth" v-if="questionform.qclassification=='1'">
          <el-radio v-model="questionform.answer" label="5">正确</el-radio>
          <el-radio v-model="questionform.answer" label="6">错误</el-radio>
        </el-form-item>

        <el-form-item label="答案" :label-width="formLabelWidth" v-if="questionform.qclassification=='0'">
          <el-select v-model="questionform.answer" placeholder="请选择答案">
            <el-option
              v-for="item in questionform.optionnum"
              :key="item.key"
              :label="item"
              :value="item+4">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加至试卷" :visible.sync="dialogFormVisible2">
      <el-form :model="addPaperForm.paperid">
        <el-form-item label="添加至:" label-width="200px">
          <el-select v-model="addPaperForm.paperid" placeholder="请选择试卷">
            <el-option  v-for="elem in paperStatus" :key="elem.key" :label="elem.papername" :value="elem.paperid"></el-option>
          </el-select>
        </el-form-item>
        <span>考试编号：</span><b>{{addPaperForm.paperid}}</b>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addPaperConfirm">确 定</el-button>
      </div>
  </el-dialog>

  <el-dialog title="正在选题" :visible.sync="dialogTableVisible4">
    <el-progress :percentage="percentage" :status="status"></el-progress>
    <template v-if="papershow">
      <p style="text-align:left">
        试卷编号：{{addAutoForm.paperid}}<br>
        试题编号：{{addAutoForm.paperinfo}}<br>
        试卷总分：{{addQuestionInfo.score}}分<br>
        题型：{{addQuestionInfo.choicenum}}道选择题，{{addQuestionInfo.tofnum}}道判断题<br>
        即将添加至试卷中，请<el-button type="success" size="mini" @click="addAutoPaper">确认添加</el-button>
      </p>
    </template>
    <template v-if="status=='exception'">
      选题失败，因为题库不能满足您设定的条件！
    </template>
  </el-dialog>
  </div>
  <uploadquestion v-else @goBack="goBack" @uploadSuccess="uploadSuccess"></uploadquestion>
  </transition>
</template>

<script>
import uploadquestion from '@/components/uploadquestion.vue'
export default {
  name: 'adminquestion',
  props: ['color'],
  components: {
    uploadquestion
  },
  data(){
    return{
      questioninfo:{
        old:{},
        new:{}
      },
      qinfoshow:false,
      uploadshow:true,
      questionList:[],
      addquestionVisible:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      dialogTableVisible4:false,
      formLabelWidth: '120px',
      questionform:{
        qdescription:'',
        qclassification:'0',
        qcomplexity:'1',
        optionnum: 4,
        options:[],
        qscore:'10',
        answer:''
      },
      addPaperForm:{
        paperid:'',
        paperinfo:[]
      },
      addAutoForm:{
        paperid:'',
        paperinfo:[]
      },
      addQuestionInfo:{
        score:'',
        choicenum:'',
        tofnum:''
      },
      addAuto:{
        qcomplexity:'1',
        qscore:'20'
      },
      percentage:0,
      status:'',
      papershow:false
    }
  },
  methods: {
    enter(scope){
      var that=this;
      that.questioninfo.old=scope.row;
      that.qinfoshow=true;
      this.$axios.get('https://xunhaha.top/oes/api/admingetquestioninfobyqid',{
        params:{
          qid: scope.row.qid,
          classification: scope.row.qclassification
        }
      }).then(function(res){
        that.questioninfo.new=res.data[0];
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    },
    uploadSuccess(){
      this.uploadshow=true;
      this.getQuestion();
    },
    goBack(){
      this.uploadshow=true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    checkQcomplexity(row, column,cellValue) {
      if(cellValue=='1'){
        return '简单';
      }else if(cellValue=='2'){
        return '一般'
      }else if(cellValue=='3'){
        return '偏难'
      }
    },
    checkQclassification(row, column,cellValue) {
      if(cellValue=='0'){
        return '选择';
      }else if(cellValue=='1'){
        return '判断'
      }
    },
    someDel(){
      var that=this;
      this.$confirm('此操作将永久删除所选试题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.addPaperForm.paperinfo.length==0){
            that.$message({
              type: 'warning',
              message: '请至少选择一个试题!'
            });
            return false;
          }

          this.$axios.post('https://xunhaha.top/oes/api/admindelquestion',this.addPaperForm,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res){
              that.$message.success('删除题库成功');
              that.getQuestion();
            //ok
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
          //批量删除接口
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    oneDel(row){
      var that=this;
      this.$confirm('此操作将永久删除所选试题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('https://xunhaha.top/oes/api/admindelquestionone',{
            params:{
              qid:row.qid
            }
          }).then(function(res){
              that.$message.success('删除成功');
              that.getQuestion();
            //ok
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
          //批量删除接口
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getQuestion(){
      var that = this;
      this.loading = true;
      this.$axios.get('https://xunhaha.top/oes/api/questioninfo',{
        params:{

        }
      }).then(function(res){
          that.questionList = res.data;
          that.addquestionVisible = true;
          that.loading = false;
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    },
    dialogConfirm(){
      var that = this;
      this.$axios.post('https://xunhaha.top/oes/api/adminaddquestion',this.questionform,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
          that.$message.success('新建题目成功');
          that.dialogClose();
          that.getQuestion();
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    },
    dialogClose(){
      this.questionform.optionnum=4;
      this.questionform.qdescription='';
      this.questionform.options=[];
      this.questionform.answer='';
      this.dialogFormVisible = false;
    },
    handleSelectionChange(val) {
      var array = [];
      for(var i=0;i<val.length;i++){
        array[i]=val[i].qid;
      }
      this.addPaperForm.paperinfo = array;
    },
    addPaperConfirm(){
      var that = this;
      if(that.addPaperForm.paperinfo.length==0){
        that.$message.warning('请至少选择一个题目');
        that.dialogClose2();
      }else{
        that.$axios.post('https://xunhaha.top/oes/api/adminaddquestiontopaper',that.addPaperForm,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res){
            that.$message.success('添加题目成功');
            that.dialogClose2();
            that.getQuestion();
          //ok
        }).catch(function(err){
          //error
          that.$message.error('网络好像有点问题');
        });
      }
    },
    addAutoPaper(){
      var that=this;
      that.loading=true;
      that.$axios.post('https://xunhaha.top/oes/api/adminaddquestiontopaper',that.addAutoForm,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
          that.$message.success('添加题目成功');
          that.dialogTableVisible4=false;
          that.getQuestion();
        //ok
      }).catch(function(err){
        //error
        that.dialogTableVisible4=false;
        that.$message.error('添加失败！');
      });
      that.loading=false;
    },
    dialogClose2(){
      this.addPaperForm.paperid='';
      this.addPaperForm.paperinfo=[];
      this.dialogFormVisible2 = false;
    },
    addAutoConfirm(){
      if(this.addAutoForm.paperid==''){
        this.$message.warning('请选择试卷');
        return false;
      }
      this.dialogFormVisible3=false;
      this.dialogTableVisible4=true;
      this.papershow=false;

      //选题算法
      //查询符合难度要求的题目总分是否越界
      let sum=0;//总分
      let sum1=0;
      let n=this.questionList.length;
      for(let i=0;i<n;i++){
        if(this.questionList[i].qcomplexity==this.addAuto.qcomplexity){
          sum+=Number(this.questionList[i].qscore);
        }
      }
      this.percentage=20;//完成第一部分
      if(sum<this.addAuto.qscore){
        this.status='exception';
      }else{
        this.percentage=50;
        //开始选题
        let scoreinfo=[];
        let choicenum=0;
        let tofnum=0;
        debugger;
        for(let j=0;j<n;j++){
          if(this.questionList[j].qcomplexity==this.addAuto.qcomplexity){
            sum1+=Number(this.questionList[j].qscore);
            if(sum1>this.addAuto.qscore){
              this.percentage=100;
              this.status='success';
              break;
            }else{
              scoreinfo.push(this.questionList[j].qid);
              if(this.questionList[j].qclassification=='0'){
                choicenum++;
              }else{
                tofnum++;
              }
            }
          }
        }
        this.addAutoForm.paperinfo=scoreinfo;
        this.papershow=true;
        this.addQuestionInfo.score=sum1;
        this.addQuestionInfo.choicenum=choicenum;
        this.addQuestionInfo.tofnum=tofnum;
      }
    },
    addAutoClose(){
      this.addAutoForm.paperid='';
      this.addAuto.qcomplexity='1';
      this.addAuto.qscore='20';
      this.dialogFormVisible3=false;
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/admingetpaperstatus2',{
      params:{

      }
    }).then(function(res){
        that.paperStatus = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  }
}
</script>

<style lang="css" scoped>
.getclass{
  float: right;
  margin-top: 30px;
}
.addquestion{
  float: left;
  margin-top: 10px;
}
.optioninput{
  width: 80px;
}
.card_left{
  text-align: left;
  position: absolute;
  width: 350px;
  top: 0px;
  left: 0px;
  border: 1px solid #4D87F8;
  z-index: 999;
}
.card-enter-active{
  animation: bounceInLeft .5s;
}
 .card-leave-active{
   animation: bounceOutLeft .5s;
 }
</style>
