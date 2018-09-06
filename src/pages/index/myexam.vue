<template lang="html">
  <transition name="el-zoom-in-top">
  <div v-loading="loading">
    <div class="top">
      <div class="tips" :style="{color:color}">
        <b>查询须知</b>
        <ul>
          <li>点击右侧查询按钮，查询您的所有考试信息</li>
          <li>认真核实您的考试信息，确认无误后可以进行相应操作</li>
          <li>端正考试态度，杜绝舞弊现象，严守考试纪律，维护校园正气，驾诚信之舟，破学海之浪，成栋梁之才!</li>
        </ul>
      </div>
      <div class="tip-right"><el-button type="primary" round @click="getPaperList" :loading="btnloding">点击查询</el-button></div>
    </div>

    <div class="table">
      <el-card shadow="hover">
      <el-table
        :data="paperList"
        border
        style="width: 1100px">
          <el-table-column
            prop="paperid"
            align="center"
            label="试卷编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="papername"
            align="center"
            label="试卷名称"
            width="350">
          </el-table-column>
          <el-table-column
            prop="papertime"
            align="center"
            label="考试时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="考试状态"
            :filters="[{text: '考试中', value: '0'}, {text: '已结束', value: '1'}]"
            :filter-method="filterHandler"
            width="130"
            :formatter="checkStatus">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button  type="success" v-if="scope.row.status=='0'" @click="toExaming(paperList[scope.$index].paperid,paperList[scope.$index].papertime)" size="small">前去考试</el-button>
              <el-button  type="warning" v-if="scope.row.status=='1'" disabled size="small">考试结束</el-button>
            </template>
          </el-table-column>
      </el-table>
      </el-card>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'myexam',
  props: ['color'],
  data(){
    return{
      btnloding: false,
      paperList: [
        {
          paperid: "",
          papername: "",
          papertime: "",
          status: ""
        }
      ]
    }
  },
  beforeCreate() {
    //do something before creating vue instance
    this.loading = true;
  },
  created() {
    //do something after creating vue instance
    this.loading = false;
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    checkStatus(row, column,cellValue) {
      if(cellValue=='0'){
        return '考试中';
      }else if(cellValue=='1'){
        return '已结束'
      }
    },
    getPaperList() {
      var that = this;
      this.btnloding = true;
      //获取试卷列表
      this.$axios.get('https://xunhaha.top/oes/api/paperList',{
      //this.$axios.get('http://localhost:8080/oes/api/paperList',{
        params:{
          userid: sessionStorage.getItem('user')
        }
      }).then(function(res){
          that.paperList = res.data;
          that.$message.success('查询成功');

          setTimeout(function () {
            that.btnloding = false;
          }, 2000);
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');

        setTimeout(function () {
          that.btnloding = false;
        }, 2000);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toExaming(paperid,papertime){
      var that = this;
      var userid = sessionStorage.getItem('user');

      //弹窗注意事项
      this.$confirm('开始考试后，不得主动退出，系统不允许补考', '确认开始考试', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios.get('https://xunhaha.top/oes/api/setScore',{
        //that.$axios.get('http://localhost:8080/oes/api/setScore',{
          params:{
            userid: userid,
            paperid:paperid,
            set:"0"
          }
        }).then(function(res){
            if(res.data[0].status=='error'){
              that.$message.warning('不可再次补考');
              return false;
            }else{
              that.$message({
                type: 'success',
                message: '确认成功!'
              });
              that.$router.push({ name: 'examing', params:{ paperid: paperid , userid: userid , papertime: papertime}});
            }
          //ok
        }).catch(function(err){
          //error
          that.$message.error('网络好像有点问题');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消考试'
        });
      });
    },
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
  .top{
    margin: 20px auto;
    width: 1100px;
    height: 150px;
  }
  .tips{
    float: left;
    border: 1px dashed #4D87F8;
    width: 900px;
    height: 150px;
  }
  .tip-right{
    padding-right: 15px;
    padding-top: 60px;
  }
  ul li{
    text-align: left;
    margin-left: 30px;
    margin-top: 10px;
  }
  .table{
    width: 1100px;
    margin: 0px auto;
  }
</style>
