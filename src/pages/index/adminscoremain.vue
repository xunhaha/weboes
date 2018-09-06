<template lang="html">
  <div class="">
    <div class="" v-if="!paperinfo.paperid">
      <div class="nopaper">
        <img src="static/img/logo1.png" alt="logo" class="logo">
        <img src='static/img/logobanner.png' alt="logobanner" class="logobanner">
      </div>
    </div>

    <div v-else v-loading="loading">
      <div class="nav">
        <el-card class="tittle"><b v-text="paperinfo.papername"></b><a class="getExcel_a" @click="getExcel" href="javascript:void(0);">导出成绩</a></el-card>
        <el-card shadow="never" class="paperinfo">
          <span>试卷编号：<b>{{paperinfo.paperid}}</b></span>
          <span style="margin-left:30px">考试时间：<b>{{paperinfo.papertime}}</b>分</span>
          <span style="margin-left:30px">考试状态：<b v-if="paperinfo.status==1">已结束</b></span>
        </el-card>
      </div>
      <div class="mychart1">
        <canvas id="myChart1" width="400px" height="400px"></canvas>
      </div>
      <div class="mychart2">
        <canvas id="myChart2" width="400px" height="400px"></canvas>
      </div>
      <div>
        <el-table
          :data="scoreinfo"
          border
          style="width: 100%">
          <el-table-column
            prop="userid"
            label="考号"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="userclass"
            sortable
            label="所在班级">
          </el-table-column>
          <el-table-column
            prop="score"
            sortable
            label="得分">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'adminscoremain',
  data(){
    return{
      paperinfo:{},
      scoreinfo:[],
      userclass:[],
      scores:[],
      avgclass:[],
      scoreinfoTittle:["考号" , "姓名" , "班级" , "得分"]
    }
  },
  methods: {
    getScoreinfo() {
      this.loading=true;
      this.scoreinfo=[];
      this.userclass=[];
      this.scores=[];
      this.avgclass=[];
      debugger;
      var that = this;
      //do something after creating vue instance
      //获取班级
      this.$axios.get('https://xunhaha.top/oes/api/classinfo',{
        params:{
          action: 'get'
        }
      }).then(function(res){
          that.userClass = res.data;

          that.$axios.get('https://xunhaha.top/oes/api/admingetscoreinfo',{
            params:{
              paperid: that.paperinfo.paperid
            }
          }).then(function(res){
              that.scoreinfo = res.data.scoreinfo;
              that.scores=res.data.scores;
              that.avgclass=res.data.avgclass;
              that.showCanves();
            //ok
          }).catch(function(err){
            //error
            that.$message.error('网络好像有点问题');
          });
        //ok
      }).catch(function(err){
        //error
        that.$message.error('网络好像有点问题');
      });
    },
    showCanves(){
      debugger;
      var ctx = document.getElementById("myChart1");
      var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ["90分以上", "80-90分", "60-80分", "20-60分", "10-20分", "10分以下"],
              datasets: [{
                  label: '成绩分布图',
                  data: this.scores,
                  backgroundColor: [
                    'rgba(0, 255, 94, 0.2)',
                    'rgba(21, 158, 250, 0.2)',
                    'rgba(85, 240, 255, 0.2)',
                    'rgba(252, 245, 67, 0.2)',
                    'rgba(255, 130, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          }
      });
      //2
      var ctx = document.getElementById("myChart2");
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: this.userClass,
              datasets: [{
                  label: '班级平均分',
                  data: this.avgclass,
                  backgroundColor: [
                      'rgba(0, 255, 94, 0.2)',
                      'rgba(21, 158, 250, 0.2)',
                      'rgba(85, 240, 255, 0.2)',
                      'rgba(252, 245, 67, 0.2)',
                      'rgba(255, 130, 0, 0.2)',
                      'rgba(255, 0, 0, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
      this.loading=false;
    },
    getExcel(){
      var JSONData=this.scoreinfo;
      if(JSONData==[]) return;

      //生成Excel
      //先转化json
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

      var excel = '<table>';

      //设置表头
      var row = "<tr>";
      for (var i = 0, l = this.scoreinfoTittle.length; i < l; i++) {
          row += "<td>" + this.scoreinfoTittle[i] + '</td>';
      }


      //换行
      excel += row + "</tr>";

      //设置数据
      for (var i = 0; i < arrData.length; i++) {
          var row = "<tr>";

          row += '<td>' + arrData[i].userid + '</td>' + '<td>' + arrData[i].username + '</td>' + '<td>' + arrData[i].userclass + '</td>' + '<td>' + arrData[i].score + '</td>';

          excel += row + "</tr>";
      }

      excel += "</table>";

      var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
      excelFile += '; charset=UTF-8">';
      excelFile += "<head>";
      excelFile += "<!--[if gte mso 9]>";
      excelFile += "<xml>";
      excelFile += "<x:ExcelWorkbook>";
      excelFile += "<x:ExcelWorksheets>";
      excelFile += "<x:ExcelWorksheet>";
      excelFile += "<x:Name>";
      excelFile += "{worksheet}";
      excelFile += "</x:Name>";
      excelFile += "<x:WorksheetOptions>";
      excelFile += "<x:DisplayGridlines/>";
      excelFile += "</x:WorksheetOptions>";
      excelFile += "</x:ExcelWorksheet>";
      excelFile += "</x:ExcelWorksheets>";
      excelFile += "</x:ExcelWorkbook>";
      excelFile += "</xml>";
      excelFile += "<![endif]-->";
      excelFile += "</head>";
      excelFile += "<body>";
      excelFile += excel;
      excelFile += "</body>";
      excelFile += "</html>";


      var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

      var link = document.createElement("a");
      link.href = uri;

      link.style = "visibility:hidden";
      link.download = this.paperinfo.papername + "成绩.xls";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style lang="css" scoped>
.tittle{
  width: 99%;
  text-align: center;
  font-size: 20px;
}
.paperinfo{
  width: 99%;
  height: 50px;
}
.nopaper{
  text-align: center;
  margin-top: 130px;
}
.logobanner{
  width: 100%;
}
.logo{
  width: 20%;
  float: right;
}
.mychart1{
  float: left;
  margin: 20px 100px;
  width: 300px;
  height: 300px;
}
.mychart2{
  float: left;
  margin: 20px 100px;
  width: 300px;
  height: 300px;
}
.getExcel_a{
  font-size: 15px;
  float: right;
  margin-top: 15px;
}
</style>
