<template>
  <div class="users">
    <div class="search">
      <el-input
        placeholder="请输入关键字进行过滤"
        v-model="input"
        clearable>
      </el-input>
      <!-- <el-button type="info" plain icon="el-icon-s-order" class="el-dropdown-link default" >默认组织</el-button> -->
          <el-dropdown 
          type="primary" 
          @click="handleClick"
           trigger="click">
           <span>
             <el-button type="primary"
              icon="el-icon-s-order" 
             class="default" >默认组织</el-button>
           </span>
             <el-dropdown-menu style="width:200px" slot="dropdown" >
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </div>
    <div class="bot">
      <div class="title">
        <h3>用户管理</h3>
        <div class="btns">
          <el-button type="success"  size="small" plain  @click="showaddForm()">新增</el-button>
          <el-button type="danger"  size="small" plain>删除</el-button>
          <el-button type="info" size="small" plain @click="showrolesOne">角色</el-button>
        </div>
       </div>
       <div class="table">
         <el-input
           placeholder="请输入内容"
           prefix-icon="el-icon-search"
           style="width:200px;margin-bottom:10px"
           v-model="input1">
         </el-input>
         <!-- 表格 -->
         <el-table
            :data="Usertable"
            style="width: 99%"
            :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
             border
            @selection-change="handleSelectionChange"
             >
            <el-table-column
              type="selection"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center">
            </el-table-column>
             <el-table-column
              prop="name"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="account"
              label="账号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orgnization"
              label="组织机构"
              align="center">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="固定电话"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="固定电话"
              align="center">
            </el-table-column>
             <el-table-column
              prop="condition"
              label="状态"
              align="center">
            </el-table-column>
             <el-table-column
              prop="role"
              label="角色"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="180"
              >
              <template slot-scope="scope">
                <el-button @click="showaddForm(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">锁定</el-button>
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small"  @click="showroles(scope.row)">角色</el-button>
              </template>
            </el-table-column>
         </el-table>
        <!-- 分页 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20">
         </el-pagination>
       </div>
       <!-- 点击新增,编辑的弹框 -->
       <el-dialog title="新增" :visible.sync="addFormVisible">
        <el-form :model="addForm" :rules="addrules" :inline="true">
          <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
            <el-input v-model="addForm.name"  size="small" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="身份证号码" :label-width="formLabelWidth" class="addinput">
            <el-input v-model="addForm.idcar" style="width:200px" show-password size="small" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="addForm.account" size="small" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="组织机构" :label-width="formLabelWidth" prop='orgnization' class="addinput">
              <el-select v-model="addForm.orgnization"  size="small" placeholder="请选择组织机构" style="width:200px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
              <el-form-item label="设置密码" :label-width="formLabelWidth" prop='password'>
            <el-input type="password" v-model="addForm.password" size="small" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="移动电话" :label-width="formLabelWidth">
            <el-input v-model="addForm.mobile" size="small" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkpassword">
            <el-input v-model="addForm.checkpassword" size="small" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="固定电话" :label-width="formLabelWidth">
            <el-input v-model="addForm.telephone" size="small" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input v-model="addForm.email" size="small" autocomplete="off"  class="last"></el-input>
          </el-form-item>
          <el-form-item label="联系地址"  :label-width="formLabelWidth">
             <el-input type="textarea" autosize v-model="addForm.address"></el-input>
            <!-- <el-input  autocomplete="off"></el-input> -->
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth" class="text">
            <!-- <el-input  autocomplete="off"></el-input> -->
             <el-input type="textarea" autosize v-model="addForm.text"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFormVisible = false" class="right">确 定</el-button>
        </div>
       </el-dialog>
      <!-- 点击角色的弹框 -->
      <el-dialog
          title="人员绑定角色"
          :visible.sync="roleVisible"
          width="48%"
          >
          <div class="person">
            <span class="t">人员:</span>
            <el-tag
              v-for="item in items"
              :key="item.id"
              effect="plain">
              {{ item.name }}
            </el-tag>
          </div>
           <div class="role">
              <span class="t">角色:</span>
              <el-transfer 
                 :data="roleList" 
                  v-model="value"
                 filter-placeholder="请输入角色名"
                 :titles="['待选', '已选']"
                  filterable>
              </el-transfer>
            </div>
           <span slot="footer" class="dialog-footer">
            <el-button @click="roleVisible = false">取 消</el-button>
            <el-button type="primary" @click="roleVisible = false" class="mr">确 定</el-button>
           </span>
      </el-dialog>
    </div>
  </div>

</template>
<script>
export default {
  data(){
    return {
      roleList:[],
      value:[],
      activeName:'first',
      input: '',
      input1: '',
      Usertable: [
        {
          id:1111,
          account: '2016-05-02',
          name: '王小虎',
          telephone: '6318965',
          role:'员工'
       }, {
          id:2222,
          account: '2016-05-02',
          name: '小虎',
          telephone: '631836',
          role:'管理员'
       }, {
          id:3333,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:4,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:5,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:6,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:7,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }, {
          id:8,
          account: '2016-05-02',
          name: 'test',
          telephone: '631836',
          role:'管理员'
       }
      ],
      currentPage: 4,
      addFormVisible:false,
      addForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      addrules:{
        name: [
            { required: true, message: '请输入活动名称', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        checkpassword: [
            { required: true, message: '请再次输入密码', trigger: ['blur','change'] },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        orgnization:[
            {required: true, message: '请选择组织', trigger: ['blur','change']},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      // 角色弹框
      roleVisible:false,
      // 角色标签
      items: [],
      // 表格选中
      selected:0,
      // 点击角色数据回显过渡
      multipleSelection:{},
    }
  },
  mounted(){
   
  },
  methods:{
    handleClick() {
        console.log("点击了默认组织");
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    showaddForm(){
      this.addFormVisible=true
    },
    handleSelectionChange(rows){
      let selected = rows.length
      this.selected=selected
        // console.log(selected)  // 1就是选中，0是取消选中
      this.items=rows
      // console.log(rows)
      this.multipleSelection = rows
      // console.log(this.multipleSelection)
    },
    // 点击角色按钮
    showrolesOne(){
      if(this.selected==1||this.selected>1){
        this.roleVisible=true
        var arr=this.multipleSelection;
        let roleList = [];
        for (var i=0;i<arr.length;i++){
            roleList.push({key:arr[i].id,label:arr[i].role});
            this.roleList=roleList
        // console.log(roleList)
        }
      }else{
        // console.log('空的')
        this.$message('请先选中用户');
      }
    },
    // 点击表格中的角色按钮
    showroles(rows,row){
      this.roleVisible=true
      var item=[]
      this.roleList=[]
          item.push(rows)
      var roles={key:rows.id,label:rows.role}
          // console.log(rows)
      this.items=item
      this.roleList.push(roles)
    }
  }
}
</script>
<style scoped>
  .title{
    height: 50px;
    position: relative;
    border-bottom: 1px solid #ece8e8;
    margin-bottom: 10px;
  }
  .btns{
    position: absolute;
    top: 8px;
    right: 20px;
  }
  h3{
    line-height: 40px;
    font-size: 16px;
    margin-left: 5px;
  }
  .bot{
    position: absolute;
    left: 250px;
    top: 32px;
    bottom: 15px;
    right: 0px;
    margin-top: 15px;
    overflow: auto;
  }
  .search{
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #fff;
    border-right: 1px solid #ece8e8;
    margin: 15px;
    overflow: auto;
    padding-right: 5px;
  }
  .default{
    width: 200px;
    margin-top: 1px;
  }
  /* .el-popper /deep/.popper__arrow, .el-popper /deep/.popper__arrow::after{
    border-style:none;
  } */
  .el-pagination{
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
  .last{
    width: 530px;
  }
  .right{
    margin-right: 94px;
  }
  .el-textarea{
    width: 110%;
  }
  .el-dialog{
    position: relative;
  }
  .person{
     position: absolute;
     left: 30px;
     top: 85px;
     width: 73%;
     height: 70px;
     margin-left: 77px;
     border: 1px solid #dbd6d6;
     border-radius: 2px;
     padding: 10px;
   }
   .el-tag{
     margin-right: 10px;
     margin-top: 5px;
   }
  .role{
    margin-top: 115px;
    margin-left: 86px;
    position: relative;
  }
  .t{
    position: absolute;
    left: -45px;
  }
  .mr{
    margin-right: 45px;
  }
</style>