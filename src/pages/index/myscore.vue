<template lang="html">
  <transition name="el-zoom-in-top">
  <div>
    <template v-if="scoreshow">
      <div class="top" :style="{color:color}">
        <b style="font-size:17px;">成绩查询须知</b>
        <ul>
          <li>系统会自动查询您所有考试的成绩，进行显示</li>
          <li>如果长时间未加载成绩，可能您未参加任何考试，或遇到网络延迟，请耐心等待不要重复刷新页面</li>
          <li>为维护考试公平，考试过程中强制退出系统或遇网络情况被动退出系统，系统都不予补考，您可以向管理员发出补考申请。</li>
        </ul>
      </div>
      <div v-show="scoreinfo.length==0" class="noScore">
        <span>未查询到您的考试数据！请参加考试后查询。</span>
      </div>
      <div class="score" v-loading="loading" element-loading-text="成绩加载中，请稍等">
        <a href="javascript:void(0);">
        <el-card class="box-card" v-for="elem in scoreinfo" :key="elem.key" shadow="hover" @click.native="goScore(elem.paperid)">
          <div slot="header" class="clearfix">
            <span>试卷编号：{{elem.paperid}}</span>
            <i class="el-icon-arrow-up scoreicon"></i>
          </div>
          <div class="text item">
            姓名：{{elem.username}}  /  成绩：<b>{{elem.score}}</b>分
          </div>
        </el-card>
        </a>
      </div>
    </template>
    <userscoreinfo v-else :paperid='paperid' :userid='userid' @goBack="goBack"></userscoreinfo>
  </div>
  </transition>
</template>

<script>
import userscoreinfo from '@/components/userscoreinfo.vue'
export default {
  name: 'myscore',
  props: ['color'],
  components: {
    userscoreinfo
  },
  data(){
    return{
      scoreinfo:[],
      scoreshow:true,
      scoreinfoshow:false,
      paperid:'',
      userid:''
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var that = this;
    that.loading =true;
    this.$axios.get('https://xunhaha.top/oes/api/scoreinfo',{
    //this.$axios.get('http://localhost:8080/oes/api/paperList',{
      params:{
        userid: sessionStorage.getItem('user')
      }
    }).then(function(res){
        that.scoreinfo = res.data;
        that.loading =false;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
      that.loading = false;
    });
  },
  methods: {
    goScore(paperid) {
      this.paperid=paperid;
      this.userid=sessionStorage.getItem('user');
      this.scoreshow=false;
    },
    goBack(){
      this.scoreshow=true;
    }
  }
}
</script>

<style lang="css" scoped>
  .top{
    margin: 20px auto;
    width: 1100px;
    height: 150px;
    border: 1px dashed #4D87F8;
  }
  ul li{
    text-align: left;
    margin-left: 100px;
    margin-top: 10px;
  }
  .score{
    width: 900px;
    margin: 0px auto;
  }
  .text {
   font-size: 14px;
 }

 .item {
   margin-bottom: 18px;
 }

 .clearfix:before,
 .clearfix:after {
   display: table;
   content: "";
 }
 .clearfix:after {
   clear: both
 }

 .box-card {
   width: 900px;
   margin-top: 20px;
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
 .scoreicon{
   float: right;
   font-size: 20px;
   color: #4D87F8;
 }
 .noScore{
   font-size: 20px;
   color: #A1A1A1;
 }
</style>
