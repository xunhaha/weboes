<template lang="html">
  <div class="">
    <el-menu
      class="el-menu-demo topnav"
      mode="horizontal"
      router
      background-color="#4D87F8"
      text-color="rgb(255, 255, 255)"
      active-text-color="rgb(255, 255, 255)">
      <el-menu-item><img src="..\assets\logo.png" alt="logo"></el-menu-item>
      <el-menu-item class="right">
          <el-color-picker v-model="color" size="small"></el-color-picker>
      </el-menu-item>
    </el-menu>

    <a href="javascript:;"><i class="el-icon-tickets tipicon" @click="tipcardshow==true?tipcardshow=false:tipcardshow=true"></i></a>

    <div :style="{color:color}">
      <div class="left">
        <el-card class="box-card" :style="{color:color}">
        <div class="text item">
          <h2>准考证</h2>
          <div class="video">
            <video id="video" width="200" height="150" autoplay></video>
          </div>

          <div class="tip">考试过程中不要将面部离开画面区域</div>

          <ul>
            <li>考试账号：<b>{{userid}}</b></li>
            <li>试卷编号: <b>{{paperid}}</b></li>
            <li>考生姓名：<b>{{username}}</b></li>
            <li>所在班级：<b>{{userclass}}</b></li>
          </ul>

          <div class="getup">
            <el-button type="primary" round @click="submitScore" :loading="scoreLoading">交卷</el-button>
          </div>
          <div>
           <p>距离考试结束还有{{minute}}分:{{second}}秒</p>
         </div>
        </div>
      </el-card>
      </div>
    </div>

    <div class="main" :style="{color:color}" v-loading="scoreLoading">
        <b class="lefttitle">判断题</b>
        <el-card shadow="hover" v-for="(q1,n) in questionbank1" :key="q1.key" :style="{color:color}" class="questioncard" :id="getName(n,'1')">
          {{n+1}}：{{q1.qdescription}}({{q1.qscore}}分)：
          <el-radio v-model="q1.qcomplexity" label="5" :style="{color:color}">对</el-radio>
          <el-radio v-model="q1.qcomplexity" label="6" :style="{color:color}">错</el-radio>
        </el-card>
        <b class="lefttitle">选择题</b>
        <el-card shadow="hover" v-for="(q2,i) in questionbank2" :key="q2.key" :style="{color:color}" class="questioncard" :id="getName(i,'2')">
          {{i+1}}：{{q2.qdescription}}({{q2.qscore}}分)：
          <el-radio v-model="q2.qcomplexity" :label="q2o.n+5" v-for="q2o in q2.options" :key="q2o.key" :style="{color:color}">{{q2o.n}}.{{q2o.option}}</el-radio>
        </el-card>
    </div>

    <transition name="card">
    <el-card class="tipcard" v-if="tipcardshow">
      <a href="javascript:;"><i class="el-icon-arrow-right tipcardicon2" @click="tipcardshow==true?tipcardshow=false:tipcardshow=true"></i></a>
      <h2>试卷地图</h2>
      <div class="tipcardmain">
        <b>判断题：</b><br>
        <a :href="getHref(index,'1')" v-for="(elem,index) in questionbank1" :key="elem.key"> <div class="questionindex">{{index+1}}</div> </a>
        <br><b>选择题：</b><br>
        <a :href="getHref(index,'2')" v-for="(elem,index) in questionbank2" :key="elem.key"> <div class="questionindex">{{index+1}}</div> </a>
      </div>
    </el-card>
    </transition>

    <el-dialog
      title="试卷得分"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>您的分数为 <h2>{{score}}</h2> 分</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goMyexam">我的成绩</el-button>
        <el-button type="primary" @click="goMyexam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script scoped>
export default {
  name: 'examing',
  data(){
    return{
      tipcardshow:false,
      color:'#4D87F8',
      paperid:this.$route.params.paperid,
      userid:this.$route.params.userid,
      username:'',
      userclass:'',
      scoreLoading:false,
      questionbank1: [],
      questionbank2: [],
      answer:{},
      minute:Number(this.$route.params.papertime),
      second:60,
      score:0,
      centerDialogVisible:false,
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var user = sessionStorage.getItem('user');
    if (!user) {
      this.$router.push({ path: '/login' });
      this.centerDialogVisible = false;
    }

  },
  created() {
    //do something after creating vue instance
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/userinfo',{
    //this.$axios.get('http://localhost:8080/oes/api/userinfo',{
      params:{
        userid: sessionStorage.getItem('user')
      }
    }).then(function(res){
        that.username=res.data[1].username;
        that.userclass=res.data[1].userclass;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });

    //获取试题
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/examing',{
      params:{
        userid: sessionStorage.getItem('user'),
        paperid:this.$route.params.paperid
      }
    }).then(function(res){
        that.questionbank1=res.data[0].questionbank1;
        that.questionbank2=res.data[0].questionbank2;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  },
  methods: {
    getHref(index,c){
      return '#'+index+c;
    },
    getName(n,c){
      return n+c;
    },
    goMyexam(){
      var that = this;
      that.$axios.get('https://xunhaha.top/oes/api/setScore',{
      //hat.$axios.get('https://localhost:8080/oes/api/setScore',{
        params:{
          userid: sessionStorage.getItem('user'),
          paperid:that.$route.params.paperid,
          score: that.score,
          set:"1"
        }
      }).then(function(res){
            that.$message({
              type: 'success',
              message: '成绩已录入!'
            });
            that.$router.push({ path: '/myscore' });
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    },
    handleRemove(file, fileList) {
       console.log(file, fileList);
     },
     handlePictureCardPreview(file) {
       this.dialogImageUrl = file.url;
       this.dialogVisible = true;
     },
     submitScore(){
       this.$confirm('提交后不得补考, 是否继续?', '是否提交', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.scoreLoading=true;
         var that = this;
         that.getAnswer();
         that.$axios.post('https://xunhaha.top/oes/api/getscore',
         //that.$axios.post('http://localhost:8080/oes/api/getscore',
          {
            paperid:this.paperid,
            userid:this.userid,
            questioninfo:this.answer
          },
          {
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           }
         }).then(function(res){
           that.$notify({
             title: '打分成功',
             message: '到"我的成绩"中查看"',
             type: 'success'
           });
           that.scoreLoading=false;
           that.score = res.data[0].score;
           that.centerDialogVisible=true;
           //ok
         }).catch(function(err){
           //error
           that.$message.error('网络故障，请联系管理员补考');
         });

       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消提交'
         });
       });
     },

     //生成答案
     getAnswer(){
       var that = this;
       var questionbankAnswer = [];
       for (var i = 0; i < this.questionbank1.length; i++) {
         var temp = {qid : this.questionbank1[i].qid, answer : this.questionbank1[i].qcomplexity, qscore : this.questionbank1[i].qscore};
         questionbankAnswer.push(temp);
       }
       for (var i = 0; i < this.questionbank2.length; i++) {
         var temp = {qid : this.questionbank2[i].qid, answer : this.questionbank2[i].qcomplexity, qscore : this.questionbank2[i].qscore};
         questionbankAnswer.push(temp);
       }
       that.answer = questionbankAnswer;
     }
  },
  mounted() {
    //do something after mounting vue instance
    if(!this.$route.params.paperid||!this.$route.params.userid){
      this.$router.push({ path: '/myexam' });
    }
    //以下代码禁止浏览器各种刷新行为
    history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
    document.onkeydown = function (e) {
        if (e.keyCode === 116) {
        return false;
      }
    }
    document.oncontextmenu = function() { event.returnValue = false; }
    document.oncontextmenu= function() {
      return   false;
    }

    //摄像头
    var aVideo = document.getElementById('video');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）
    navigator.getUserMedia({
        video: true,
        audio: false
    }, gotStream, noStream); //参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息

    function gotStream(stream) {
        video.src = URL.createObjectURL(stream);
        video.onerror = function() {
            stream.stop();
        };
        stream.onended = noStream;
        video.onloadedmetadata = function() {
        };
    }

    function noStream(err) {
      alert('摄像头调用失败，错误代码：'+err);
    }
    //摄像头
    //倒计时
    let timer = window.setInterval(() => {
      this.second==0?(this.second=60,this.minute--):this.second--;
      if(this.minute==0&&this.second==0){
        this.scoreLoading=true;
        alert('时间到，系统自动收卷！');
        //交卷
        var that = this;
        that.getAnswer();
        that.$axios.post('https://xunhaha.top/oes/api/getscore',that.answer,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res){
          that.$notify({
            title: '打分成功',
            message: '到"我的成绩"中查看"',
            type: 'success'
          });
          that.scoreLoading=false;
          that.score = res.data[0].score;
          that.centerDialogVisible=true;
          //ok
        }).catch(function(err){
          //error
          that.$message.error('网络故障，请联系管理员补考');
        });
      }
    },1000);
  }
}
</script>

<style lang="css" scoped>
  .topnav{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 999;
  }
  .main{
    width: 700px;
    position: absolute;
    top: 60px;
    left: 450px;
  }
  img{
    width: 200px;
  }
  .right{
    position: absolute;
    right: 0px;
  }
  .text {
    font-size: 14px;
  }

  .box-card {
    position: fixed;
    left: 0px;
    top: 60px;
    width: 400px;
    height: 610px;
  }
  .tip{
    margin-top: 13px;
  }
  ul li{
    text-align: left;
    margin-left: 90px;
    margin-top: 15px;
  }
  .getup{

  }
  .lefttitle{
    font-size: 20px;
  }
  .questioncard{
    margin-top: 10px;
  }
  .tipcard{
    width: 200px;
    min-height: 200px;
    position: fixed;
    right: 0px;
    top: 60px;
  }
  .tipicon{
    font-size: 30px;
    color: #4D87F8;
    position: fixed;
    top: 70px;
    right: 10px;
  }
  .tipcardicon2{
    font-size: 20px;
    color: #4D87F8;
    float: left;
  }
  .card-enter-active{
    animation: bounceInRight .5s;
  }
   .card-leave-active{
     animation: bounceOutRight .5s;
   }
   .tipcardmain{
     text-align: left;
   }
   .questionindex{
     width: 10px;
     height: 10px;
     float: left;
     border: 1px solid #4D87F8;
     margin-left: 2px;
   }
</style>
