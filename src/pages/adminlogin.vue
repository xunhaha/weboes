<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="index">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" v-loading="logining">
        <h3 class="title">管理员登录</h3>
        <router-link :to="{ name: 'index'}">我是考生</router-link>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="on" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="on" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
  </transition>
</template>

<script>
export default {
  name:'adminlogin',
  data(){
      return{
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
          this.$axios.get('https://xunhaha.top/oes/api/adminlogin',{
            params:{
              userid: that.ruleForm2.account,
              password: that.ruleForm2.checkPass
            }
          }).then(function(res){
            if(res.data[0].status=="login"){
              that.$notify({
                title: '登录成功',
                message: '桃李满天下！',
                type: 'success'
              });
              sessionStorage.setItem('adminuser', that.ruleForm2.account);
              that.$router.push({ path: '/adminindex/adminclass' });
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
    }
  }
</script>

<style lang="css" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 15px;
  border-radius: 15px;
  -moz-border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 150px #cac6c6;
  .title {
    margin: 0px auto;
    text-align: center;
    color: #505458;
  }
}
  .index{
    border: 1px solid #eaeaea;
    background-image: url('http://www.nciae.edu.cn/__local/E/2F/7A/49ACCE1901318E9DF5E97BCC2EA_AB4A72A2_C3C00.jpg');
    background-size: cover;
  }

</style>
