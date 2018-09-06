<template lang="html">
  <transition  name="papershow">
    <el-card shadow="hover" class="maincard" v-loading="loading">
      <el-button class="goback" @click.native="goBack" icon="el-icon-arrow-down"></el-button>
        <div class="papermain">
          <h2>以下为编号<small>{{paperid}}</small>的考试详情</h2>
          本次考试共：{{qnumber()}} 道题 <br>
          <b>判断题</b>
            <el-card shadow="hover" v-for="(q1,index) in questionbank1" :key="q1.key" class="box-card">
              <i class="el-icon-circle-close no" v-if="isNo(q1.qid)"></i>
              <i class="el-icon-circle-check yes" v-else></i>
              {{index+1}}：{{q1.qdescription}}({{q1.qscore}}分)
              <span v-if="isNo(q1.qid)" class="answer">正确答案：{{allanswers[index][q1.qid]=='5'?'对':'错'}}<p class="error">我的答案：{{allanswers[index][q1.qid]==5?'错':'对'}}</p></span>
              <span v-else class="answer">正确答案：{{allanswers[index][q1.qid]=='5'?'对':'错'}}<br>我的答案：{{allanswers[index][q1.qid]=='5'?'对':'错'}}</span>
            </el-card>

          <b>选择题</b>
            <el-card shadow="hover" v-for="(q2,index) in questionbank2" :key="q2.key" class="box-card">
              <i class="el-icon-circle-close no" v-if="isNo(q2.qid)"></i>
              <i class="el-icon-circle-check yes" v-else></i>
              {{index+1}}：{{q2.qdescription}}({{q2.qscore}}分)：
              <span v-model="q2.qcomplexity" :label="q2o.n+5" v-for="q2o in q2.options" :key="q2o.key">{{q2o.n+1}}.{{q2o.option}} </span>

              <span v-if="isNo(q2.qid)" class="answer">正确答案：{{allanswers[index+Number(questionbank1.length)][q2.qid]-4}}<p class="error">我的答案：{{errorAnswer(q2.qid)>0?errorAnswer(q2.qid):'未做'}}</p></span>
              <span v-else class="answer">正确答案：{{allanswers[index+Number(questionbank1.length)][q2.qid]-4}}<br>我的答案：{{allanswers[index+Number(questionbank1.length)][q2.qid]-4}}</span>
            </el-card>

        </div>
    </el-card>
  </transition >
</template>

<script>
export default {
  name:'userscoreinfo',
  props: ['paperid','userid'],
  data(){
    return{
      paperinfo:[],
      questionbank1:[],
      questionbank2:[],
      questionself1:{},
      questionself2:{},
      allanswers:[],
      erroranswers:[]
    }
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
    isNo(qid){
      for(let i=0;i<this.erroranswers.length;i++){
        if(this.erroranswers[i].qid==qid) return true;
      }
      return false;
    },
    errorAnswer(qid){
      for(let i=0;i<this.erroranswers.length;i++){
        if(qid==this.erroranswers[i].qid){
          return this.erroranswers[i].answer-4;
        }
      }
    },
    qnumber(){
      return Number(this.questionbank1.length)+Number(this.questionbank2.length);
    },
    allscore(){
      let allscore=0;
      for(let i=0;i<this.questionbank1.length;i++){
        allscore+=this.qusetionbank1[i].qscore;
      }
      for(let j=0;j<this.questionbank2.length;j++){
        allscore+=this.qusetionbank2[j].qscore;
      }
      return allscore;
    }
  },
  mounted() {
    //do something after creating vue instance
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/getallanswers',{
    //this.$axios.get('http://localhost:8080/oes/api/paperList',{
      params:{
        paperid:this.paperid
      }
    }).then(function(res){
        that.allanswers = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });

    this.$axios.get('https://xunhaha.top/oes/api/geterrorquestion',{
    //this.$axios.get('http://localhost:8080/oes/api/paperList',{
      params:{
        userid:this.userid,
        paperid:this.paperid
      }
    }).then(function(res){
        that.erroranswers = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });

    this.$nextTick(function () {
      this.loading=false;
    })
  },
  created() {
    //do something after creating vue instance
    //获取试题
    var that = this;
    this.loading=true;
    this.$axios.get('https://xunhaha.top/oes/api/admingetqids',{
      params:{
        paperid:that.paperid
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
  }
}
</script>

<style lang="css" scoped>
.maincard{
  margin: 50px auto;
  width: 90%;
}
.goback{
  float: left;
  font-size: 20px;
}
.box-card {
  width: 900px;
  margin: 10px auto;
}
.papermain{
  margin-top: 20px;
}

.papershow-enter-active{
  animation: bounceInUp .9s;
}
 .papershow-leave-active{
   animation: fadeOutDown .9s;
 }
 .yes{
   font-size: 25px;
   color: green;
   float: left;
 }
 .no{
   font-size: 25px;
   color: red;
   float: left;
 }
 .answer{
   float: right;
   color: green;
 }
 .error{
   color: red;
 }
</style>
