<template lang="html">
  <transition name="el-zoom-in-top">
  <div class="class" :style="{color:color}">
    <h1>所有注册班级：</h1>
    <div class="tag" v-loading="loading">
      <el-tag
        :key="tag"
        v-for="tag in userClass"
        closable
        type="success"
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加班级</el-button>
    </div>

    <!--提示信息-->
    <div class="tips" :style="{color:color}">
      <h2>注意事项</h2>
      <ul>
        <li>不要重复添加同一班级</li>
        <li>如果长时间不显示注册班级，请检查网络</li>
        <li>请勿重复刷新页面</li>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'adminclassinfo',
  props: ['color'],
  data(){
    return{
      userClass:[],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      var that = this;
      this.$confirm('删除班级将会清除该班级所有学生账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除数据库代码
          that.$axios.get('https://xunhaha.top/oes/api/admindeleteclass',{
            params:{
              classname: tag
            }
          }).then(function(res){
              that.$message.success('已删除该班级的所有信息');
              that.userClass.splice(that.userClass.indexOf(tag), 1);//删除标签
            //ok
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        var that = this;
        let inputValue = this.inputValue;
        if (inputValue) {
          this.$confirm('将要新建班级, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //增加数据库代码
              that.$axios.get('https://xunhaha.top/oes/api/classinfo',{
                params:{
                  action: 'set',
                  classname:inputValue
                }
              }).then(function(res){
                  if(res.data[0].status=="ok"){
                    that.$message.success('新建成功');
                    that.userClass.push(inputValue);//新建标签
                  }else{
                    that.$message.error('该班级已存在');
                  }
                //ok
              }).catch(function(err){
                //error
                that.$message.error('网络好像有点问题');
              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              });
            });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  },
  beforeCreate() {
    var that = this;
    this.loading = true;
    //do something after creating vue instance
    //获取班级信息
    this.$axios.get('https://xunhaha.top/oes/api/classinfo',{
      params:{
        action: 'get'
      }
    }).then(function(res){
        that.userClass = res.data;
        that.loading = false;
      //ok
    }).catch(function(err){
      //error
      that.$message.error('网络好像有点问题');
    });
  }

}
</script>

<style lang="css" scoped>
  .class{
    text-align: center;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .tips{
    margin: 120px auto;
    border: 1px dashed #4D87F8;
    width: 500px;
    height: 200px;
  }
  ul li{
    text-align: left;
    margin-left: 90px;
    margin-top: 10px;
  }
</style>
