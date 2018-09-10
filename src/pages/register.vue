<template lang="html">
  <transition name="el-zoom-in-top">
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo topbar"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#4D87F8"
      text-color="rgb(255, 255, 255)"
      active-text-color="rgb(255, 255, 255)">
      <div align="left"><router-link :to="{ name: 'index'}"><img src="..\assets\logo.png" alt="logo"></router-link></div>
      <div class="itemlogin"><el-menu-item index="1" route="login">已有账号，去登录</el-menu-item></div>
    </el-menu>

    <el-steps :active="stepactive" finish-status="success" simple style="margin-top: 20px">
      <el-step title="申请账号" ></el-step>
      <el-step title="完善信息" ></el-step>
      <el-step title="注册成功" ></el-step>
    </el-steps>
    <div class="main">
      <transition name="el-fade-in-linear">
      <el-card class="box-card">
        <div v-if="stepactive==0">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
              <el-input v-model.number="ruleForm2.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm1('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="stepactive==1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所在班级" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择班级">
                <el-option v-for="elem in classinfo" :key="elem.key" :label="elem" :value="elem"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="stepactive==2">
          <i class="el-icon-success" align="center"></i>
          <h2>恭喜你，注册成功！</h2>
          <el-button type="primary" @click="login">去登录</el-button>
        </div>
      </el-card>
      </transition>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    //表单1检测
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          if (value < 100000) {
            callback(new Error('必须大于6位数字'));
          } else if(value > 100000000000){
            callback(new Error('必须小于12位数字'));
          }else{
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeIndex2: '',
      stepactive: 0,
      ruleForm: {
        name: '',
        region: ''
      },
      ruleForm2: {
          pass: '',
          checkPass: '',
          username: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.stepactive<2){
            this.stepactive++;
          }else{
            alert('到底了');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.stepactive<2){
            //注册提交
            that.$axios.get('https://xunhaha.top/oes/api/register',{
              params:{
                userid: that.ruleForm2.username,
                password: that.ruleForm2.pass,
                username: that.ruleForm.name,
                userclass: that.ruleForm.region
              }
            }).then(function(res){
              if(res.data[0].status=="register"){
                that.stepactive++;
                that.$message.success('恭喜你，注册成功！');
              }else{
                that.$message.warning('账号已存在，可以直接登录');
                that.$router.push({ path: '/' });
              }
              //ok
            }).catch(function(err){
              //error
              that.$message.error('注册失败，请重新填写');
              that.$router.push({ path: '/' });
            });
          }else{
            alert('error');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    login(){
      this.$router.push({path:'/login',query:{account:this.ruleForm2.username,password:this.ruleForm2.checkPass}});
    }
  },
  beforeCreate() {
    var that = this;
    //do something before creating vue instance
    that.$axios.get('https://xunhaha.top/oes/api/classinfo',{
      params:{
        action: 'get'
      }
    }).then(function(res){
        that.classinfo = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('班级信息获取失败');
    });
  }
}
</script>

<style lang="css" scoped>
  .topbar{
    height: 100px;
  }
  .box-card {
    width: 450px;
    margin: 80px auto;
  }
  .itemlogin{
    position: absolute;
    bottom: 0px;
    right: 0px;
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
</style>
