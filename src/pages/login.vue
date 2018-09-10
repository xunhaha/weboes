<template lang="html">
  <transition name="el-zoom-in-center">
  <div>
    <div class="left">
      <img src="..\assets\logo.png" alt="logo">
      <div class="notice">
        <h2>考试纪律</h2>
        <ul>
          <li>严格遵守考试纪律</li>
          <li>进入考试页面后,系统自动倒计时,规定时间内完成答题可点击“提交”提前交卷,超过规定时间系统会自动提交答卷。试卷一旦提交,将不能修改</li>
          <li>考试时须使用主流浏览器,不要使用手机、平板电脑(IPAD)等其他移动终端设备考试</li>
          <li>考试过程中不要点击浏览器“刷新”按钮,否则系统会重新出题,原答题信息丢失并相应减少一次登录考试机会</li>
          <li>由于考试人员较多,请合理安排考试时间,避免遇上网络拥堵情况。如在登录考试时,出现“超过最大在线人数”提示,请换个时间段再登录考试。再次考试。</li>
        </ul>
      </div>
    </div>

    <div class="main">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" v-loading="logining">
        <h3 class="title">考生登录</h3>
        <router-link :to="{ name: 'adminindex'}">我是管理员</router-link>||<router-link :to="{ name: 'register'}">还没注册？</router-link>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="on" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="on" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit2(ev) {
      var that = this;
      that.logining = true;
      if(that.ruleForm2.account==''||that.ruleForm2.checkPass==''){
        that.$message.error('请填写用户名和密码');
        that.logining = false;
      }else{
        //登录验证
        //this.$axios.get('http://localhost:8080/oes/api/login',{
        this.$axios.get('https://xunhaha.top/oes/api/login',{
          params:{
            userid: that.ruleForm2.account,
            password: that.ruleForm2.checkPass
          }
        }).then(function(res){
          if(res.data[0].status=="login"){
            that.$notify({
              title: '登录成功',
              message: '祝你取得好成绩！',
              duration: 3000,
              type: 'success'
            });
            sessionStorage.setItem('user', that.ruleForm2.account);
            that.$router.push({ path: '/' });
          }else{
            that.$message.error('用户名或密码错误');
            that.logining = false;
          }
          //ok
        }).catch(function(err){
          //error
          that.$message.error('网络好像有点问题');
          that.logining = false;
        });
      }
    }
  },
  created(){
    if(this.$route.query.account&&this.$route.query.password){
      this.ruleForm2.account=this.$route.query.account;
      this.ruleForm2.checkPass=this.$route.query.password;
    }
  }
}
</script>

<style lang="css" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    margin-right: 180px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 30px #cac6c6;
  }
  .title {
    font-family: 'Courier New', Courier, monospace;
    margin: 0px auto 20px auto;
    text-align: center;
    font-size: 20px;
    color: #4D87F8;
  }
  .remember {
    margin: 10px;
  }
  .left{
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #4D87F8;
    width: 590px;
    height: 110%;
    box-shadow: 0px 15px 15px 0px grey;
    z-index: 0;
  }
  a{
    color: #2a91f9;
  }
  .notice{
    width: 500px;
  }
  ul li{
    text-align: left;
    margin-left: 30px;
    margin-top: 10px;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .main{
    width: 100%;
    height: 110%;
    overflow: hidden;
  }
</style>
