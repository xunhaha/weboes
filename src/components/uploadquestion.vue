<template lang="html">
  <transition  name="uploadshow">
  <el-card class="maincard" v-loading="loading">
    <el-button class="goback" @click.native="goBack" icon="el-icon-arrow-down"></el-button>
    <b class="title">在线考试系统批量导入题库</b><br>
    <div class="warning">
      <b><i class="el-icon-warning"></i>注意！请<a href="https://xunhaha.top/oes_data_file/upload.xlsx">下载官方模板</a>后填写上传！使用其他格式无效！</b>
    </div>
    <div class="upload" v-if="upshow">
      <input type="file" id="excel-file" class="input" @change="upload">
    </div>
    <h1>判断题一览</h1>
    <el-table
    class="tabledata"
    :data="paperForm.questionbank1"
    border
    size="mini"
    style="width: 90%">
      <el-table-column
        width="50">
      </el-table-column>
      <el-table-column
        prop="qdescription"
        label="题干"
        width="450">
      </el-table-column>
      <el-table-column
        prop="qcomplexity"
        label="难度"
        align="center"
        width="180"
        :filter-method="filterHandler"
        :formatter="checkQcomplexity">
      </el-table-column>
      <el-table-column
        prop="qscore"
        align="center"
        label="分值">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="答案"
        align="center"
        :filter-method="filterHandler"
        :formatter="checkAnswer1">
      </el-table-column>
      <el-table-column
        label="编辑"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="changeq1(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h1>选择题一览</h1>
    <el-table
    class="tabledata"
    :data="paperForm.questionbank2"
    border
    size="mini"
    style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="elem in props.row.options" :key="elem.key">
                选项{{elem.n+1}}：<span><b>{{ elem.option }}</b></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="qdescription"
        label="题干"
        width="450">
      </el-table-column>
      <el-table-column
        prop="qcomplexity"
        label="难度"
        align="center"
        width="180"
        :filter-method="filterHandler"
        :formatter="checkQcomplexity">
      </el-table-column>
      <el-table-column
        prop="qscore"
        align="center"
        label="分值">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="答案"
        align="center"
        :filter-method="filterHandler"
        :formatter="checkAnswer2">
      </el-table-column>
      <el-table-column
        label="编辑"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="changeq2(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="编辑试题" :visible.sync="dialogFormVisible1">
      <el-form :model="questionself1">
        <el-form-item label="题干：" :label-width="formLabelWidth">
          <el-input v-model="questionself1.qdescription" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-radio v-model="questionself1.answer" label="5">正确</el-radio>
          <el-radio v-model="questionself1.answer" label="6">错误</el-radio>
        </el-form-item>
        <el-form-item label="难度：" :label-width="formLabelWidth">
          <el-rate
            v-model="questionself1.qcomplexity"
            :max="3"
            :texts="['简单','一般','偏难']"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="分值：" :label-width="formLabelWidth">
          <el-input-number v-model="questionself1.qscore" :min="1" :max="30" label="分值"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1=false" circle icon="el-icon-back"></el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑试题" :visible.sync="dialogFormVisible2">
      <el-form :model="questionself2">
        <el-form-item label="题干：" :label-width="formLabelWidth">
          <el-input v-model="questionself2.qdescription" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="index+1" :label-width="formLabelWidth" v-for="(elem,index) in questionself2.options" :key="elem.key">
          <el-input v-model="elem.option" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="难度：" :label-width="formLabelWidth">
          <el-rate
            v-model="questionself2.qcomplexity"
            :max="3"
            :texts="['简单','一般','偏难']"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="分值：" :label-width="formLabelWidth">
          <el-input-number v-model="questionself2.qscore" :min="1" :max="30" label="分值"></el-input-number>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-select v-model="questionself2.answer" placeholder="请选择答案">
            <el-option
              v-for="item in questionself2.options"
              :key="item.key"
              :label="item.n+1"
              :value="item.n+5">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2=false" circle icon="el-icon-back"></el-button>
      </div>
    </el-dialog>

    <el-button type="primary" size="small" v-if="!upshow" class="upbtn" @click="uploadTableData">提交试题</el-button>
  </el-card>
  </transition>
</template>

<script>
export default {
  name:'uploadquestion',
  data(){
    return{
        upshow:true,
        uploadquestioninfo:[],
        paperForm:{
          questionbank1:[],
          questionbank2:[]
        },
        questionself1:{},
        questionself2:{},
        dialogFormVisible1:false,
        dialogFormVisible2:false
    }
  },
  methods: {
    uploadTableData(){
        var that=this;
        this.$confirm('即将批量导入题库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('https://xunhaha.top/oes/api/adminaddquestionplus',this.paperForm,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
          }).then(function(res){
              that.$message.success('导入题库成功');
              that.$emit('uploadSuccess');
              //ok
          }).catch(function(err){
              //error
              that.$message.error('网络好像有点问题');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导入'
          });
        });
    },
    changeq1(row){
      this.questionself1=row;
      this.dialogFormVisible1=true;
    },
    changeq2(row){
      this.questionself2=row;
      this.dialogFormVisible2=true;
    },
    checkAnswer1(row, column,cellValue){
      if(cellValue=='5'){
        return '对';
      }else{
        return '错';
      }
    },
    checkAnswer2(row, column,cellValue){
      return cellValue-4;
    },
    checkQcomplexity(row, column,cellValue) {
      if(cellValue=='1'){
        return '简单';
      }else if(cellValue=='2'){
        return '一般'
      }else if(cellValue=='3'){
        return '偏难'
      }
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    goBack() {
      this.$emit('goBack');
    },
    upload(e){
        this.upshow=false;
        var that=this;
        that.loading=true;
        var files = e.target.files;

        var fileReader = new FileReader();
        fileReader.onload = function(ev) {
          try {
                var data = ev.target.result,
                    workbook = XLSX.read(data, {
                        type: 'binary'
                    }), // 以二进制流方式读取得到整份excel表格对象
                    persons = []; // 存储获取到的数据
            } catch (e) {
                console.log('文件类型不正确');
                return;
            }

            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }

            console.log(persons);
            var data=persons;
            if(data.length==0){
              that.$message.warning('请不要上传空文件！');
              return false;
            }
            that.uploadquestioninfo=data;
            that.showType(data);
        };

        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);

        this.$nextTick(function () {
          that.loading=false;
        })
    },
    showType(data){
      let questionbank1=[];
      let questionbank2=[];
      for(let i=0;i<data.length;i++){
          if(data[i]['题型']=="选择题"){
            let qcomplexity=1;
            if(data[i]['难度']=='简单'){
              qcomplexity=1;
            }else if(data[i]['难度']=='一般'){
              qcomplexity=2;
            }else if(data[i]['难度']=='偏难'){
              qcomplexity=3;
            }else{
              alert('难度类型不合法！请修改后刷新系统！');
              return false;
            }

            let os=data[i]['选项'].split(',');
            let options=[];
            for(let i=0;i<os.length;i++){
              options[i]={
                option:os[i],
                n:i
              }
            }

            let q2={
              qdescription:data[i]['题干'],
              qcomplexity:qcomplexity,
              qscore:data[i]['分值'],
              options:options,
              answer:Number(data[i]['答案'])+4
            }
            questionbank2.push(q2);

          }else if(data[i]['题型']=="判断题"){
            let qcomplexity=1;
            if(data[i]['难度']=='简单'){
              qcomplexity=1;
            }else if(data[i]['难度']=='一般'){
              qcomplexity=2;
            }else if(data[i]['难度']=='偏难'){
              qcomplexity=3;
            }else{
              alert('难度类型不合法！请修改后刷新系统！');
              return false;
            }

            let answer='5';
            if(data[i]['答案']=='对'){
              answer='5';
            }else if(data[i]['答案']=='错'){
              answer='6';
            }else{
              alert('答案类型不合法！请修改后刷新系统！');
              return false;
            }

            let q1={
              qdescription:data[i]['题干'],
              qcomplexity:qcomplexity,
              qscore:data[i]['分值'],
              answer:answer
            }

            questionbank1.push(q1);
          }else{
            alert('试题类型不合法！请修改后刷新系统！');
            return false;
          }
      }
      this.paperForm.questionbank1=questionbank1;
      this.paperForm.questionbank2=questionbank2;

      // //添加表格
      // let code='<table>';
      // code+='<tr><th>批量导入数据一览</th></tr>'
      // code+='<tr><td>题干</td><td>难度</td><td>分值</td><td>答案</td><td>题型</td></tr>'
      // for(let i=0;i<questionbank1.length;i++){
      //   code+='<tr><td>'+questionbank1[i].qdescription+'</td><td>'+questionbank1[i].qcomplexity+'</td><td>'+questionbank1[i].qscore+'</td><td>'+questionbank1[i].answer+'</td><td>判断题</td></tr>'
      // }
      // code+='<tr><td>题干</td><td>难度</td><td>分值</td><td>选项</td><td>答案</td><td>题型</td></tr>'
      //
      // document.getElementById('show').innerHTML=code+'</table>';
    }
  }
}
</script>

<style lang="css" scoped>
.maincard{
  width: 99%;
}
.uploadshow-enter-active{
  animation: bounceInUp .9s;
}
.uploadshow-leave-active{
 animation: fadeOutDown .9s;
}
.goback{
  float: left;
  font-size: 15px;
}
.title{
  font-size: 20px;
}
.el-icon-warning{
  font-size: 15px;
  color: red;
}
.upload-demo{
  margin-top: 50px;
}
.warning{
  margin-top: 10px;
}
.upload{
  margin: 20px auto;
  width: 300px;
}
.input{
  border: none;
  border-bottom:1px solid #999;
}
.tabledata{
  margin: 10px auto;
}
.upbtn{
  float: right;
  margin: 30px 55px 30px 0;
}
</style>
