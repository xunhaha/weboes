<template lang="html">
  <transition name="el-zoom-in-top">
  <div :style="{color:color}" v-loading="loading">
    <el-table
      class="table"
      :data="classinfo.slice((currentPage-1)*11,currentPage*11)"
      border
      row-style="height:0"
      cell-style="padding:0"
      style="width: 100%">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="学生账号"
        align="center"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        align="center"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="userclass"
        label="所在班级"
        align="center"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text" style="color: #5DAF34">奖励</el-button>
          <el-button type="text" style="color: #DD6161">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      @current-change="handleCurrentChange_pagination"
      :total="classinfo.length">
    </el-pagination>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name:'adminclass',
  props: ['color'],
  data(){
    return{
      classinfo:[],
      currentPage:1
    }
  },
  methods: {
    handleCurrentChange_pagination(val) {
      this.currentPage=val;
    },
    getUserinfo(){
      var that = this;
      this.loading = true;
      this.$axios.get('https://xunhaha.top/oes/api/adminclass',{
        params:{

        }
      }).then(function(res){
          //that.$message.success('查询成功');
          that.classinfo = res.data;
          that.loading = false;
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    }
  },
  created() {
    //do something after creating vue instance
    this.getUserinfo();
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
.getclass{
  float: right;
  margin-top: 30px;
}
.table{
  
}
.pagination{
  margin-top: 20px;
}
</style>
