<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#4D87F8"
      text-color="rgb(255, 255, 255)"
      active-text-color="rgb(255, 255, 255)">
      <el-menu-item route="/"><img src="..\assets\logo.png" alt="logo"></el-menu-item>
      <el-menu-item index="1" route="/">首页</el-menu-item>
      <el-menu-item index="2" route="myexam">我的考试</el-menu-item>
      <el-menu-item index="3" route="myscore">我的成绩</el-menu-item>
      <el-menu-item index="4" route="about">关于</el-menu-item>
      <el-menu-item>
          <el-color-picker v-model="color" size="small"></el-color-picker>
      </el-menu-item>
      <el-submenu index="5" class="itemuser">
        <template slot="title">{{name}}</template>
        <el-menu-item index="5-1" route="center">个人中心</el-menu-item>
        <el-menu-item @click="dialogVisible = true">退出登录</el-menu-item>
      </el-submenu>
      <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>

    <transition  name="backtop">
        <a href="javascript:;"><div class="dingbu2" @click="goTop"><el-tooltip effect="light" content="返回顶部" placement="top-start"><img src="static/img/gotop.png" alt="gotop" class="dingbuimg"></el-tooltip></div></a>
    </transition>
    <!--退出登录确认-->
    <el-dialog
      title="确定退出？"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>您正在退出登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reallogout">确 定</el-button>
      </span>
    </el-dialog>

    <div class="main">
      <router-view :color="color"></router-view>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      name:sessionStorage.getItem('user'),
      activeIndex2: '1',
      dialogVisible: false,
      color: '#4D87F8'
    }
  },
  methods: {
    goTop(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    logout() {
      sessionStorage.removeItem('user');
      this.$router.push({ path: '/login' });
    },
    reallogout(){
      this.dialogVisible= false;
      this.logout();
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var that =this;
    var user = sessionStorage.getItem('user');
    if (!user) {
      this.$router.push({ path: '/login' });
    }

    //查询个人信息
    this.$axios.get('https://xunhaha.top/oes/api/userinfo',{
      params:{
        userid: user,
      }
    }).then(function(res){
        that.name = res.data[0].username;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  }
}
window.onscroll = function () {
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  var back_btn = document.getElementsByClassName('dingbu2')[0];
  if(top>0){
    back_btn.style.display = 'block';
  }else{
    back_btn.style.display = 'none';
  }
}
</script>

<style lang="css" scoped>
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
  img{
    width: 200px;
  }
  .itemuser{
    position: absolute;
    right: 0px;
  }
  .dingbu2{
    display: none;
    width: 50px;
    height: 50px;
    position: fixed;
    right: 50px;
    bottom: 35px;
  }
  .dingbuimg{
    width: 90%;
  }
  .backtop-enter-active{
    animation: bounceInUp .5s;
  }
  .backtop-leave-active{
    animation: fadeOutDown .5s;
  }
</style>
