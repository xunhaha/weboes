<template>
  <div class="" :style="{color:color}">
    <h2>以下为编号<small>{{viewpaperid}}</small>的试卷详情<l v-if="!isEdit">(仅查看)</l><l v-else>(可编辑)</l>：</h2>
    <b>判断题</b>
      <el-card shadow="hover" v-for="(q1,index) in questionbank1" :key="q1.key" class="box-card" :style="{color:color}" @dblclick.native="editQuestions1(q1)">
        <a href="javascript:void(0);"><i class="el-icon-delete delete" v-if="isEdit" @click="qidDelete1(index)"></i></a>
        {{index+1}}：{{q1.qdescription}}({{q1.qscore}}分)
        <p>正确答案：<b>{{allanswers[index][q1.qid]=='5'?'对':'错'}}</b></p>
      </el-card>

    <b>选择题</b>
    <el-card shadow="hover" v-for="(q2,index) in questionbank2" :key="q2.key" class="box-card" :style="{color:color}" @dblclick.native="editQuestions2(q2)">
      <a href="javascript:void(0);"><i class="el-icon-delete delete" v-if="isEdit" @click="qidDelete2(index)"></i></a>
      {{index+1}}：{{q2.qdescription}}({{q2.qscore}}分)：
      <span v-model="q2.qcomplexity" :label="q2o.n+5" v-for="q2o in q2.options" :key="q2o.key">{{q2o.n+1}}.{{q2o.option}}</span>
      <p>正确答案：选项<b>{{allanswers[index+Number(questionbank1.length)][q2.qid]-4}}</b></p>
    </el-card>

    <el-button type="success" icon="el-icon-upload2" circle class="save" @click="handleSave" v-if="isEdit"></el-button>
    <el-dialog title="编辑试题" :visible.sync="dialogFormVisible1">
      <el-form :model="questionself1">
        <el-form-item label="题干：" :label-width="formLabelWidth">
          <el-input v-model="questionself1.qdescription" auto-complete="off"></el-input>
        </el-form-item>
        <b style="color:red;">注意：正确答案不可以修改，请酌情修改题干</b>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1=false" circle icon="el-icon-back"></el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑试题" :visible.sync="dialogFormVisible2">
      <el-form :model="questionself2">
        <el-form-item label="题干：" :label-width="formLabelWidth">
          <el-input v-model="questionself2.qdescription" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="index+1" :label-width="formLabelWidth" v-for="(elem,index) in questionself2.options" :key="elem.key">
          <el-input v-model="elem.option" auto-complete="off"></el-input>
        </el-form-item>
        <b style="color:red;">注意：正确答案不可以修改，请酌情修改题干或选项信息</b>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2=false" circle icon="el-icon-back"></el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'paperoption',
  props: ['viewpaperid','color','isEdit'],
  data () {
    return {
      paperinfo:[],
      questionbank1:[],
      questionbank2:[],
      questionself1:{},
      questionself2:{},
      formLabelWidth:'90px',
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      allanswers:[]
    }
  },
  methods: {
    qidDelete1(index){
      this.$confirm('是否删除该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.questionbank1.splice(index,1);
        }).catch((error) => {
        });
    },
    qidDelete2(index){
      this.$confirm('是否删除该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.questionbank2.splice(index,1);
        }).catch((error) => {
        });
    },
    editQuestions1(q1){
      if(!this.isEdit) return false;
      this.questionself1=q1;
      this.dialogFormVisible1=true;
    },
    editQuestions2(q2){
      if(!this.isEdit) return false;
      this.questionself2=q2;
      this.dialogFormVisible2=true;
    },
    handleSave(){
      var that=this;
      this.$confirm('此操作将修该试卷考题，是否继续?', '是否继续', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('https://xunhaha.top/oes/api/adminupdatepaperinfo',
            {
              paperid: that.viewpaperid,
              qids: that.paperinfo
            },
            {
          //that.$axios.post('http://localhost:8081/oes/api/getscore',that.answer,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res){
            that.$message({
              type: 'success',
              message: '保存成功!'
            });
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
        }).catch((error) => {
          that.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  },
  mounted() {
    //do something after mounting vue instance
    //获取试题
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/admingetqids',{
      params:{
        paperid:that.viewpaperid
      }
    }).then(function(res){
        that.paperinfo=res.data;
        that.questionbank1=res.data.questionbank1;
        that.questionbank2=res.data.questionbank2;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });

    this.$axios.get('https://xunhaha.top/oes/api/getallanswers',{
    //this.$axios.get('http://localhost:8080/oes/api/paperList',{
      params:{
        paperid:this.viewpaperid
      }
    }).then(function(res){
        that.allanswers = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 900px;
  margin: 10px auto;
}
.save{
  position: fixed;
  bottom: 100px;
  right: 0px;
}
.delete{
  color: red;
  float: right;
}
</style>
