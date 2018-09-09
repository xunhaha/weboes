<template lang="html">
  <transition name="el-zoom-in-top">
  <div v-loading="loading">
    <el-carousel indicator-position class="rollimg">
      <el-carousel-item> <img src="http://www.nciae.edu.cn/images/biye.jpg" alt="1"> </el-carousel-item>
      <el-carousel-item> <img src="http://www.nciae.edu.cn/images/20180321180510.jpg" alt="2"> </el-carousel-item>
      <el-carousel-item> <img src="http://www.nciae.edu.cn/images/20180704.jpg" alt="3"> </el-carousel-item>
      <el-carousel-item> <img src="http://www.nciae.edu.cn/images/banner2.jpg" alt="4"> </el-carousel-item>
    </el-carousel>

    <img src="static/img/logobanner.png" alt="logobanner" class="logobanner">
    <div class="cards" >
      <el-card class="box-card" shadow="hover" :style="{color:color}">
        <div slot="header" class="clearfix">
          <span name="tittle"><b>教育新闻</b>____<small>实现教育的梦想</small></span>

        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'版块建设中 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover" :style={color:color}>
        <div slot="header" class="clearfix">
          <span name="tittle"><b>晴雨华航</b>____<small>一手红花,一手彩云</small></span>
        </div>
        <div class="text item">今天是：{{weatherForm[0].date}}</div>
        <div class="text item">天气：{{weatherForm[0].type}}</div>
        <div class="text item">风向：{{weatherForm[0].fengxiang}}</div>
        <div class="text item">最高温度：{{weatherForm[0].high}}</div>
        <div class="text item">最低温度：{{weatherForm[0].low}}</div>
      </el-card>
      <el-card class="box-card" shadow="hover" :style={color:color}>
        <div slot="header" class="clearfix">
          <span name="tittle"><b>校园动态</b>____<small>身边事早知道</small></span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'版块建设中 ' + o }}
        </div>
      </el-card>

      <el-card class="box-card" shadow="hover" :style={color:color}>
        <div slot="header" class="clearfix">
          <span name="tittle"><b>名师风采</b>____<small>有您在，我放心</small></span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'版块建设中 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover" :style={color:color}>
        <div slot="header" class="clearfix">
          <span name="tittle"><b>在线课堂</b>____<small>随时随地学习</small></span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'版块建设中 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card" shadow="hover" :style={color:color}>
        <div slot="header" class="clearfix">
          <span name="tittle"><b>学生讨论</b>____<small>隔壁小美同学</small></span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'版块建设中 ' + o }}
        </div>
      </el-card>
    </div>

    <div class="footer">
      <div class="youqing">
        <ul class="youqing_ul">
          <li v-for="elem in 9" :key="elem.key" class="youqing_li">
            <img :src="schoolImg[elem-1]" class="youqing_img">
          </li>
        </ul>
      </div>
      <div class="zanzhu">
        <p data-spm-anchor-id="5176.8142029.631162.i0.3dbd6d3elqAMZF">
          <b>赞助商：</b>
          <a class="link-item" rel="nofollow" href="http://www.alibabagroup.com/cn/global/home" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8001" data-spm-anchor-id="5176.8142029.631162.d8001">阿里巴巴集团</a>

          <a class="link-item" rel="nofollow" href="//www.taobao.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8002" data-spm-anchor-id="5176.8142029.631162.d8002">淘宝网</a>

          <a class="link-item" rel="nofollow" href="//www.tmall.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8003" data-spm-anchor-id="5176.8142029.631162.d8003">天猫</a>

          <a class="link-item" rel="nofollow" href="//ju.taobao.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8004" data-spm-anchor-id="5176.8142029.631162.d8004">聚划算</a>

          <a class="link-item" rel="nofollow" href="//www.aliexpress.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8005" data-spm-anchor-id="5176.8142029.631162.d8005">全球速卖通</a>

          <a class="link-item" rel="nofollow" href="//www.alibaba.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8006" data-spm-anchor-id="5176.8142029.631162.d8006">阿里巴巴国际交易市场</a>

          <a class="link-item" rel="nofollow" href="//www.1688.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8007" data-spm-anchor-id="5176.8142029.631162.d8007">1688</a>

          <a class="link-item" rel="nofollow" href="//www.alimama.com/index.htm" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8008" data-spm-anchor-id="5176.8142029.631162.d8008">阿里妈妈</a>

          <a class="link-item" rel="nofollow" href="//www.fliggy.com" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8009" data-spm-anchor-id="5176.8142029.631162.d8009">飞猪</a>

          <a class="link-item" rel="nofollow" href="//www.aliyun.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8010" data-spm-anchor-id="5176.8142029.631162.d8010">阿里云计算</a>

          <a class="link-item" rel="nofollow" href="//www.alios.cn/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8011" data-spm-anchor-id="5176.8142029.631162.d8011">AliOS</a>

          <a class="link-item" rel="nofollow" href="//aliqin.tmall.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8012" data-spm-anchor-id="5176.8142029.631162.d8012">阿里通信</a>

          <a class="link-item" rel="nofollow" href="//wanwang.aliyun.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8013" data-spm-anchor-id="5176.8142029.631162.d8013">万网</a>

          <a class="link-item" rel="nofollow" href="http://www.autonavi.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8014" data-spm-anchor-id="5176.8142029.631162.d8014">高德</a>

          <a class="link-item" rel="nofollow" href="http://www.uc.cn/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8015" data-spm-anchor-id="5176.8142029.631162.d8015">UC</a>

          <a class="link-item" rel="nofollow" href="//www.umeng.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8016" data-spm-anchor-id="5176.8142029.631162.d8016">友盟</a>

          <a class="link-item" rel="nofollow" href="//www.xiami.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8017" data-spm-anchor-id="5176.8142029.631162.d8017">虾米</a>

          <a class="link-item" rel="nofollow" href="//www.alibabaplanet.com" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8018" data-spm-anchor-id="5176.8142029.631162.d8018">阿里星球</a>

          <a class="link-item" rel="nofollow" href="//www.dingtalk.com/?lwfrom=20150205111943449" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8020" data-spm-anchor-id="5176.8142029.631162.d8020">钉钉</a>

          <a class="link-item" rel="nofollow" href="https://www.alipay.com/" target="_blank" data-spm-click="gostr=/aliyun;locaid=d8021" data-spm-anchor-id="5176.8142029.631162.d8021">支付宝</a>
        </p>
      </div>
      <div class="beian">@xunhaha备案号：冀ICP备18017935号-1</div>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name:'main',
  props: ['color'],
  data() {
    return {
      schoolImg:[
        "http://www.hixianchang.com/images/school/index/college01.jpg",
        "http://www.hixianchang.com/images/school/index/college02.jpg",
        "http://www.hixianchang.com/images/school/index/college03.jpg",
        "http://www.hixianchang.com/images/school/index/college04.jpg",
        "http://www.hixianchang.com/images/school/index/college05.jpg",
        "http://www.hixianchang.com/images/school/index/college06.jpg",
        "http://www.hixianchang.com/images/school/index/college07.jpg",
        "http://www.hixianchang.com/images/school/index/college08.jpg",
        "http://www.hixianchang.com/images/school/index/college09.jpg"
      ],
      weatherForm:[
        {
          date:'天气获取失败',
          type:'',
          fengxiang:'',
          high:'',
          low:''
        }
      ],
      warrytip:'',
      wendu:''
    };
  },
  beforeCreate() {
    //do something before creating vue instance
    this.loading = true;
  },
  created() {
    var that = this;
    //do something before creating vue instance
    //获取今日天气
    this.$axios.get('https://www.apiopen.top/weatherApi',{
      params:{
        city: '廊坊'
      }
    }).then(function(res){
      if(res.data.code==200){
        that.weatherForm = res.data.data.forecast;
        that.warrytip = res.data.data.ganmao;
        that.wendu = res.data.data.wendu;
        that.$notify({
          title: '温馨提示',
          dangerouslyUseHTMLString: true,
          iconClass: 'el-icon-location-outline',
          duration: 1000,
          message: '今天是'+that.weatherForm[0].date+'<br>天气'+that.weatherForm[0].type+'<br>请注意天气变化！',
        });
      }else{
        that.$message.error('天气获取失败');
      }
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });

    that.loading = false;
  }
}
</script>

<style lang="css" scoped>
  .rollimg img{
    height: 100%;
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
    display: inline-block;
    margin-top: 20px;
    width: 360px;
    height: 300px;
  }
  .cards{
    margin: 0px auto;
  }
  .footer{
    margin-top: 50px;
    background-color: #4D87F8;
    color:white;
    width: 100%;
    height: 230px;
  }
  .beian{
    font-size: 12px;
  }
  .youqing{
    float: left;
    width: 100%;
  }
  .youqing_ul{
    margin: 10px auto;
  }
  .youqing_img{
    width: 100%;
    border-radius: 100%;
  }
  .youqing_li{
    display: inline-block;
    list-style: none;
  }
  .logobanner{
    width: 70%;
    margin-left: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  span{
    float: left;
    font-size: 20px;
    font-family: cursive;
  }
  .link-item{
    margin-left: 5px;
    color: white;
  }
</style>
