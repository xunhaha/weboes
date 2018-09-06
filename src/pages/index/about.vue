<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="main" :style="{color:color}">

    <el-card :class="{'imgcard':!isClass,'imgcard01':isClass}" @mouseenter.native="enter(0)" @mouseleave.native="leave(0)">
      <img src="static/img/zanshang.png" alt="赞赏一下" class="img">
    </el-card>

    <el-card :class="{'imgcard1':!isClass1,'imgcard11':isClass1}" @mouseenter.native="enter(1)" @mouseleave.native="leave(1)">
      <img src="static/img/zhuyuan.jpg" alt="祝愿" class="img">
    </el-card>

    <el-card :class="{'imgcard2':!isClass2,'imgcard21':isClass2}" @mouseenter.native="enter(2)" @mouseleave.native="leave(2)">
      <img src="static/img/jishu.jpg" alt="技术栈" class="img">
    </el-card>

    <el-card :class="{'imgcard3':!isClass3,'imgcard31':isClass3}" @mouseenter.native="enter(3)" @mouseleave.native="leave(3)">
      <img src="static/img/chengyuan.jpg" alt="项目成员" class="img">
    </el-card>

    <el-card :class="{'imgcard4':!isClass4,'imgcard41':isClass4}" @mouseenter.native="enter(4)" @mouseleave.native="leave(4)">
      <img src="static/img/mingcheng.jpg" alt="项目名称" class="img">
    </el-card>

  </div>
  </transition>
</template>

<script>
export default {
  props: ['color'],
  name: 'about',
  data(){
    return{
      isClass:false,
      isClass1:false,
      isClass2:false,
      isClass3:false,
      isClass4:false
    }
  },
  methods: {
    enter(val) {
      if(val==0){
        this.isClass=!this.isClass;
      }else if(val==1){
        this.isClass1=!this.isClass1;
      }else if(val==2){
        this.isClass2=!this.isClass2;
      }else if(val==3){
        this.isClass3=!this.isClass3;
      }else if(val==4){
        this.isClass4=!this.isClass4;
      }
    },
    leave(val){
      if(val==0){
        this.isClass=!this.isClass;
      }else if(val==1){
        this.isClass1=!this.isClass1;
      }else if(val==2){
        this.isClass2=!this.isClass2;
      }else if(val==3){
        this.isClass3=!this.isClass3;
      }else if(val==4){
        this.isClass4=!this.isClass4;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.main{
  margin: 90px auto;
}
.imgcard{
  position: absolute;
  left: 20%;
  width: 450px;
  z-index: 100;
}
.imgcard01{
  position: absolute;
  left: 20%;
  top: 90px;
  width: 450px;
  z-index: 1000;
}
.imgcard1{
  position: absolute;
  left: 25%;
  width: 450px;
  z-index: 200;
}
.imgcard11{
  position: absolute;
  left: 25%;
  top: 90px;
  width: 450px;
  z-index: 1000;
}
.imgcard2{
  position: absolute;
  left: 30%;
  width: 450px;
  z-index: 300;
}
.imgcard21{
  position: absolute;
  left: 30%;
  top: 90px;
  width: 450px;
  z-index: 1000;
}
.imgcard3{
  position: absolute;
  left: 35%;
  width: 450px;
  z-index: 400;
}
.imgcard31{
  position: absolute;
  left: 35%;
  top: 90px;
  width: 450px;
  z-index: 1000;
}
.imgcard4{
  position: absolute;
  left: 40%;
  width: 450px;
  z-index: 500;
}
.imgcard41{
  position: absolute;
  left: 40%;
  top: 90px;
  width: 450px;
  z-index: 1000;
}
.img{
  width: 100%;
}
</style>
