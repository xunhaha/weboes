<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="index">
    <div class="left">
      <el-card class="box-card" shadow="hover">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532351846248&di=25f3b4b890047f82db99942bb3e2c6e7&imgtype=0&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F150323%2F15142J239-8.jpg" class="image">
        <div class="item" :style="{color:color}">
          <ul>
            <li>账号：{{userid}}</li>
            <li>姓名：{{username}}</li>
            <li>所在班级：{{userclass}}</li>
            <li><el-button type="text" @click="showchangePassword" class="btn_center">修改密码</el-button></li>
            <li><el-button type="text" @click="showchangeTouxiang" class="btn_center">更改头像</el-button></li>
            <li><el-button type="text" @click="showchangeQiamming" class="btn_center">个性签名</el-button></li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="main">
      <el-card class="box-card2" shadow="hover">
        <b :style="{color:color}" class="tittle">{{username}}的个人中心</b><hr>
        <iframe src="//player.bilibili.com/player.html?aid=1172321&cid=1724490&page=1" width="90%" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
        <img src="static/img/logobanner2.png" alt="logobanner" class="logobanner">
        <p :style="{color:color}">{{qiamming}}</p>
      </el-card>
    </div>
    <transition name="card">
    <el-card class="box-card3 card_right" shadow="hover" v-if="touxiang_show">
      <i class="el-icon-close card_close" @click="touxiang_show=false"></i>
      <b :style="{color:color}" class="tittle">更换头像</b><hr>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <div class="text item" :style="{color:color}">
        上传头像不要超过2Mb
      </div>
    </el-card>
    <el-card class="box-card3 card_right" shadow="hover" v-if="mima_show">
      <i class="el-icon-close card_close" @click="mima_show=false"></i>
      <b :style="{color:color}" class="tittle">修改密码</b><hr>
      <input style="color: blue" type="password" placeholder="请输入旧密码" v-model="passwordForm.password" class="text2" />
      <input style="color: blue" type="password" placeholder="请输入新密码" v-model="passwordForm.newpassword" class="text2" />
      <input style="color: blue" type="password" placeholder="请确认新密码" v-model="passwordForm.renewpassword" class="text2" />
      <el-button style="color: rgba(189, 189, 189, 1)" type="text" @click="resetPass">重置</el-button>
      <el-button type="text" @click="submitPass">确认修改</el-button>
    </el-card>
    <el-card class="box-card3 card_right" shadow="hover" v-if="qiamming_show">
      <i class="el-icon-close card_close" @click="qiamming_show=false"></i>
      <b :style="{color:color}" class="tittle">个性签名</b><hr>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="请输入内容"
        v-model="qiamming">
      </el-input>
    </el-card>
    </transition>
  </div>
</transition>
</template>

<script>
export default {
  name: 'center',
  props: ['color'],
  data(){
    return{
      userid: sessionStorage.getItem('user'),
      username: '获取失败',
      userclass: '获取失败',
      dialogImageUrl: '',
      dialogVisible: false,
      passwordForm:{
        password:'',
        newpassword:'',
        renewpassword:''
      },
      touxiang_show:false,  //是否显示修改头像
      mima_show:false,   //修改密码
      qiamming_show:false,
      qiamming:'学习尤如登山,需要坚持,虽然过程是艰难的,但只要懂得享受,也能其乐无穷,当攀上顶峰时,便能饱览美景。'
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    var that = this;
    this.$axios.get('https://xunhaha.top/oes/api/userinfo',{
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
  },
  methods: {
    showchangePassword(){
      if(this.mima_show){
        this.mima_show=false;
      }else{
        this.touxiang_show=false;
        this.qiamming_show=false;
        this.$nextTick(function () {
          this.mima_show=true;
        })
      }
      //this.mima_show==true?this.mima_show=false:(this.mima_show=true,this.touxiang_show=false,this.qiamming_show=false);
    },
    showchangeTouxiang(){
      if(this.touxiang_show){
        this.touxiang_show=false;
      }else{
        this.mima_show=false;
        this.qiamming_show=false;
        this.$nextTick(function () {
          this.touxiang_show=true;
        })
      }
      //this.touxiang_show==true?this.touxiang_show=false:(this.touxiang_show=true,this.mima_show=false,this.qiamming_show=false);
    },
    showchangeQiamming(){
      if(this.qiamming_show){
        this.qiamming_show=false;
      }else{
        this.touxiang_show=false;
        this.mima_show=false;
        this.$nextTick(function () {
          this.qiamming_show=true;
        })
      }
      //this.qiamming_show==true?this.qiamming_show=false:(this.qiamming_show=true,this.mima_show=false,this.touxiang_show=false);
    },
    resetPass(){
      this.passwordForm={
        password:'',
        newpassword:'',
        renewpassword:''
      }
    },
    submitPass(){
      if(this.passwordForm.password==''||this.passwordForm.newpassword==''||this.passwordForm.renewpassword==''){
        this.$message.warning('请填写完整信息');
      }else if(this.passwordForm.newpassword!=this.passwordForm.renewpassword){
        this.$message.warning('新密码和确认密码不一致');
      }else if(this.passwordForm.newpassword==this.passwordForm.password){
        this.$message.warning('不可以与旧密码相同');
      }else{
          var that = this;
          this.$axios.get('https://xunhaha.top/oes/api/changePassword',{
            params:{
              userid: sessionStorage.getItem('user'),
              password:this.passwordForm.password,
              newpassword:this.passwordForm.renewpassword
            }
          }).then(function(res){
              if(res.data[0].status=='ok'){
                that.$message.success('密码修改成功，请使用新密码登录');
                sessionStorage.removeItem('user');
                that.$router.push({ path: '/login' });
              }else{
                that.$message.warning('您的旧密码输入有误');
                return false;
              }
            //ok
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
        }
      },
    //验证字符串是否是数字
    checkNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    },
    handleRemove(file, fileList) {
       console.log(file, fileList);
     },
     handlePictureCardPreview(file) {
       this.dialogImageUrl = file.url;
       this.dialogVisible = true;
     }
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
  .index{
  }
  hr{/*透明渐变水平线*/
    width:80%;
    margin:10px auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .image{
    width: 60%;
    border-radius:70%;
    box-shadow:0 0 10px 0 rgb(71, 71, 71);
  }
  .left{
    margin-top: 30px;
    margin-left: 130px;
    width: 250px;
    height: 500px;
    float: left;
  }
  .main{
    float: left;
    margin-top: 30px;
    margin-left: 60px;
    float: left;
    width: 700px;
  }
  .box-card {
    width: 250px;
    height: 500px;
  }
  .box-card2 {
    width: 700px;
    height: 500px;
    margin: 0px auto;
  }
  .box-card3 {
    display: inline-block;
    width: 230px;
    height: 250px;
    margin-left: 1.5%;
  }
  .text {
    font-size: 10px;
  }
  .item {
    padding: 10px 0;
  }
  .infotext{
    font-size: 14px;
  }
  ul li{
    font-size: 15px;
    text-align: left;
    margin-left: 15px;
    margin-top: 15px;
  }
  .text2{
    height: 30px;
    border-bottom-width:2px;
    border-left-width:0px;
    border-right-width:0px;
    border-top-width:0px;
  }
  input::-webkit-input-placeholder {
      /* placeholder颜色  */
     color: #9dc4f6;
     /* placeholder字体大小  */
     font-size: 10px;
  }
  .tittle{
    font-size: 20px;
    font-family: cursive;
  }
  .btn_center{
    font-size: 15px;
    padding: 0;
  }
  .card_right{
    position: absolute;
    top: 90px;
    right: 0px;
    border: 1px solid #4D87F8;
  }
  .card-enter-active{
    animation: bounceInRight .5s;
  }
   .card-leave-active{
     animation: bounceOutRight .5s;
   }
   .card_close{
     color: red;
     font-size: 15px;
     float: left;
   }
   .logobanner{
     margin: 35px auto;
     width: 90%;
   }
</style>
