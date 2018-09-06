<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="">
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo navleft"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item @click="isCollapse=true" v-if="!isCollapse">
        <i class="el-icon-d-arrow-left"></i>
      </el-menu-item>
      <el-menu-item @click="isCollapse=false" v-if="isCollapse">
        <i class="el-icon-d-arrow-right"></i>
      </el-menu-item>
      <el-menu-item v-for="elem in paperinfo" :key="elem.key" v-if="elem.status==1" :index="elem" @click="toMain(elem)">
        <el-tooltip class="item" effect="dark" :content="elem.papername" placement="right">
          <i class="el-icon-star-off"></i>
        </el-tooltip>
        <span>{{elem.papername}}</span>
      </el-menu-item>
    </el-menu>

    <div class="main" :style="{width:isCollapse?'92%':'75%'}">
      <adminscoremain ref="paperscore"></adminscoremain>
    </div>
  </div>
  </transition>
</template>

<script>
import adminscoremain from '@/pages/index/adminscoremain.vue'
export default {
  name:'adminscore',
  data(){
    return{
      isCollapse: true,
      paperinfo:[]
    }
  },
  components: {
    adminscoremain
  },
  beforeCreate() {
    //do something before creating vue instance
    //获取试卷列表
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/admingetpaperinfo',{
    //this.$axios.get('http://localhost:8080/oes/api/paperList',{
      params:{

      }
    }).then(function(res){
        that.paperinfo = res.data;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  },
  methods: {
    toMain(elem) {
      debugger;
      this.$refs.paperscore.paperinfo=elem;
      this.$refs.paperscore.getScoreinfo();
    }
  }
}
</script>

<style lang="css" scoped>
.navleft{
  position: absolute;
  left: 0px;
  top:  0px;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 25%;
  min-height: 400px;
}
.main{
  position: absolute;
  right: 0px;
  text-align: left;
  height: 100%;
}
</style>
