<template>
  <div class="dictionary">
       <el-tabs :tab-position="tabPosition" >
        <el-tab-pane  label="单位类型">
          <div class="right">
            <div class="top">
              <h3>单位类型</h3>
              <el-button type="success" plain size="small" class="add" @click="unitForm = true">新增</el-button>
            </div>
            <div class="bot">
              <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top:20px"
                    :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
                    <el-table-column
                      prop="name"
                      label="单位类型名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="备注"
                      align="center"
                      >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                     >
                        <!-- <template slot-scope="scope"> -->
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                        <!-- </template> -->
                    </el-table-column>
              </el-table>
              <!-- 新增单位类型的弹框 -->
              <el-dialog title="新增单位类型" :visible.sync="unitForm">
                <el-form :model="form">
                  <el-form-item label="单位类型名称" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <el-form :model="form">
                  <el-form-item label="备注" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="padding-bottom:70px;margin-top:-40px">
                  <el-button @click="unitForm = false">取 消</el-button>
                  <el-button type="primary" @click="unitForm = false">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          </el-tab-pane>
        <el-tab-pane label="计量单位">
         <div class="right">
            <div class="top">
              <h3>计量单位</h3>
              <el-button type="success" plain size="small" @click="calculateForm=true" class="add">新增</el-button>
            </div>
            <div class="bot">
              <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top:20px"
                    :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
                    <el-table-column
                      prop="name"
                      label="单位名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="单位类型"
                      align="center"
                      >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                     >
                        <!-- <template slot-scope="scope"> -->
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                        <!-- </template> -->
                    </el-table-column>
              </el-table>
               <!-- 新增计量单位的弹框 -->
              <el-dialog title="新增计量单位" :visible.sync="calculateForm">
                <el-form :model="form">
                  <el-form-item label="单位名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="单位类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择单位类型" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer"  style="padding-bottom:70px;margin-top:-40px">
                  <el-button @click="calculateForm = false">取 消</el-button>
                  <el-button type="primary" @click="calculateForm = false">确 定</el-button>
                </div>
              </el-dialog>
            </div>
         </div>
        </el-tab-pane>
        <el-tab-pane label="站点设备类型">
           <div class="right">
            <div class="top">
              <h3>站点设备类型</h3>
              <el-button type="success" plain size="small" @click="SiteForm=true" class="add">新增</el-button>
            </div>
            <div class="bot">
              <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top:20px"
                    :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
                    <el-table-column
                      prop="name"
                      label="站点设备类型"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="设备类型协议"
                      align="center">
                    </el-table-column>
                     <el-table-column
                      prop="address"
                      label="备注"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                     >
                        <!-- <template slot-scope="scope"> -->
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                        <!-- </template> -->
                    </el-table-column>
              </el-table>
               <!-- 新增站点设备的弹框 -->
               <el-dialog title="新增站点设备类型" :visible.sync="SiteForm">
                <el-form :model="form">
                  <el-form-item label="站点设备类型" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="站点类型协议" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="站点类型协议" style="width:100%">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer"  style="padding-bottom:70px;margin-top:-40px">
                  <el-button @click="SiteForm = false">取 消</el-button>
                  <el-button type="primary" @click="SiteForm = false">确 定</el-button>
                </div>
              </el-dialog>
            </div>
         </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
  data(){
   return {
        tabPosition:"left",
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        // options:[],
        form:{
          name:'',
          region:''
        },
        unitForm: false,
        calculateForm:false,
        SiteForm:false,
        formLabelWidth: '120px'
    }
  },
  mounted(){
     this.$nextTick(function(){
       var line=document.querySelector(".el-tabs--left .el-tabs__header.is-left")
       line.style.marginRight="-1px"
     })
  },
  mounths:{

  }

}
</script>

<style scoped>
.dictionary{
  height: 100%;
  position: relative;
}
.line{
  position: absolute;
  left: 122px;
  width: 2px;
  top: 20px;
  height: 100%;
  background-color: #ece8e8;
}

.right{
  padding: 0 20px;
  height: 100%;
  border-left: 2px solid #ece8e8;
}
.top{
  height: 50px;
  border-bottom: 1px solid #ece8e8;
  overflow: hidden;
}
h3{
  line-height: 50px;
  font-size: 16px;
  display: inline-block;
}
.add{
  float: right;
  /* margin-right: 20px; */
  margin-top: 10px;
}
.mr{
  margin-right: 190px;
}
</style>