<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="index">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo topnav"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#4D87F8"
      text-color="rgb(255, 255, 255)"
      active-text-color="rgb(255, 255, 255)">
      <el-menu-item><img src="..\assets\logo.png" alt="logo"></el-menu-item>
      <el-menu-item class="right">
          <el-color-picker v-model="color" size="small"></el-color-picker>
      </el-menu-item>
      <el-submenu index="5" class="itemuser">
        <template slot="title">{{name}}</template>
        <el-menu-item @click="dialogVisible = true">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>


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


    <div class="leftnav">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo aside"
        router
        @open="handleOpen"
        @close="handleClose"
        background-color="#4D87F8"
        text-color="rgb(255, 255, 255)"
        active-text-color="rgb(255, 255, 255)">
        <div class="item">
          <el-menu-item index="1" route="/adminindex/adminclass">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="2" route="/adminindex/adminclassinfo">
            <i class="el-icon-edit"></i>
            <span slot="title">班级管理</span>
          </el-menu-item>
          <el-menu-item index="3" route="/adminindex/adminquestion">
            <i class="el-icon-document"></i>
            <span slot="title">题库管理</span>
          </el-menu-item>
          <el-menu-item index="4" route="/adminindex/adminexam">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">考试管理</span>
          </el-menu-item>
          <el-menu-item index="5" route="/adminindex/adminscore">
            <i class="el-icon-tickets"></i>
            <span slot="title">成绩分析</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>

    <div class="main">
      <router-view :color="color"></router-view>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'adminindex',
  data(){
    return{
      name:sessionStorage.getItem('adminuser'),
      dialogVisible: false,
      color: '#4D87F8'
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var that =this;
    var adminuser = sessionStorage.getItem('adminuser');
    if (!adminuser) {
      this.$router.push({ path: '/adminlogin' });
    }


  },
  methods: {
    logout() {
      sessionStorage.removeItem('adminuser');
      this.$router.push({ path: '/adminlogin' });
    },
    reallogout(){
      this.dialogVisible= false;
      this.logout();
    }
  }
}
</script>

<style lang="css" scoped>
img{
  width: 200px;
}
.index{
  overflow: hidden;
}
.itemuser{
  position: absolute;
  right: 0px;
}
.topnav{
  z-index: 999;
}
.aside{
  position: absolute;
  left: 0px;
  top:  0px;
  width: 160px;
  height: 100%;
  background-color: #4D87F8;
}
.main{
  position: absolute;
  left: 165px;
  width: 85%;
  height: 90%;
  overflow-y: auto;
}
.item{
  padding-top: 80px;
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
