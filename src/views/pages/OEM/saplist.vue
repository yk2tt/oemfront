<template>
    <h1>料件资料维护</h1>

    <div class="page_content">
        <div class="flex">
            <div class="input_box">
                <el-input v-model="data.searchParms.query" placeholder="Please input SAP" clearable>
                    <template #append>
                        <el-button @click="searchList">
                            <el-icon>
                                <Search />
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>

        </div>
        <el-card shadow="never">
            <el-table :data="data.tableData" style="width: 100%"  stripe   height="800">
                <el-table-column label="操作" width="80">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">修改</el-button>
                        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID"  width="80"/>
                <el-table-column prop="sap29" label="分类" width="120" />
                <el-table-column prop="sap01" label="去毛边SAP" width="120" />
                <el-table-column prop="sap02" label="产品名称" width="120" />
                <el-table-column prop="sap03" label="总成SAP代码" width="120" />
                <el-table-column prop="sap05" label="配件名"  width="80"  />
                <el-table-column prop="sap07" label="去毛边加工单价(未税)" width="130" />
                <el-table-column prop="sap08" label="相似品单价" width="70" />
                <el-table-column prop="sap09" label="涂油单价(未税)" width="80" />
                <el-table-column prop="sap10" label="结算单价(未税)" width="80" />
                <el-table-column prop="sap13" label="去毛边PO" width="70" />
                <el-table-column prop="sap16" label="贴标签(0.09)/吹气0.05" width="120" />
                <el-table-column prop="sap17" label="装底座(未税)" width="80" />
                <el-table-column prop="sap18" label="压环单价(未税)" width="80" />
                <el-table-column prop="sap19" label="加防尘罩单价(未税)" width="110" />
                <el-table-column prop="sap20" label="切割单价(未税)" width="80" />
                <el-table-column prop="sap21" label="结算单价(未税)" width="80" />
                <el-table-column prop="sap24" label="装配/切割PO" width="90" />
                <el-table-column prop="sap25" label="备注" width="80" />
                <el-table-column prop="sap26" label="其它" width="80" />
                <el-table-column prop="sap27" label="每箱数量" width="80" />
                <el-table-column prop="sap28" label="一模几件" width="80" />

                
            </el-table>
            <!-- <div>个数总计:{{data.len  }}</div> -->
            <!-- 
            <el-pagination background layout="prev, pager, next, jumper, ->, total" :page-size="data.searchParms.pageSize"
                v-model:current-page="data.searchParms.page" :total="100" /> -->

        </el-card>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="data.dialogFormVisible" title="编辑用户">
            <!-- #表单 -->
            <el-form ref="userForm" :model="data.row" >

                <el-form-item label="ID" prop="id">
                    <el-input v-model="data.row.id" disabled />
                </el-form-item>
                <el-form-item label="去毛边SAP" prop="sap01">
                    <el-input v-model="data.row.sap01"  />
                </el-form-item>
                <el-form-item label="产品名称" prop="sap02">
                    <el-input v-model="data.row.sap02"  />
                </el-form-item>
                <el-form-item label="总成SAP代码" prop="sap03">
                    <el-input v-model="data.row.sap03"  />
                </el-form-item>
                <el-form-item label="配件名" prop="sap05">
                    <el-input v-model="data.row.sap05"  />
                </el-form-item>
                <el-form-item label="去毛边加工单价(未税)" prop="sap07">
                    <el-input v-model="data.row.sap07"  />
                </el-form-item>
                <el-form-item label="相似品单价" prop="sap08">
                    <el-input v-model="data.row.sap08"  />
                </el-form-item>
                <el-form-item label="涂油单价(未税)" prop="sap09">
                    <el-input v-model="data.row.sap09"  />
                </el-form-item>
                <el-form-item label="结算单价(未税）" prop="sap10">
                    <el-input v-model="data.row.sap10"  />
                </el-form-item>
                <el-form-item label="去毛边PO" prop="sap13">
                    <el-input v-model="data.row.sap13"  />
                </el-form-item>
                <el-form-item label="贴标签(0.09)/吹气0.05" prop="sap16">
                    <el-input v-model="data.row.sap16"  />
                </el-form-item>
                <el-form-item label="装底座(未税)" prop="sap17">
                    <el-input v-model="data.row.sap17"  />
                </el-form-item>
                <el-form-item label="压环单价（未税）" prop="sap18">
                    <el-input v-model="data.row.sap18"  />
                </el-form-item>
                <el-form-item label="加防尘罩单价(未税)" prop="sap19">
                    <el-input v-model="data.row.sap19"  />
                </el-form-item>
                <el-form-item label="切割单价(未税)" prop="sap20">
                    <el-input v-model="data.row.sap20"  />
                </el-form-item>
                <el-form-item label="结算单价(未税)" prop="sap21">
                    <el-input v-model="data.row.sap21"  />
                </el-form-item>
                <el-form-item label="装配/切割PO" prop="sap24">
                    <el-input v-model="data.row.sap24"  />
                </el-form-item>
                <el-form-item label="备注" prop="sap25">
                    <el-input v-model="data.row.sap25"  />
                </el-form-item>
                <el-form-item label="其它" prop="sap26">
                    <el-input v-model="data.row.sap26"  />
                </el-form-item>
                <el-form-item label="每箱数量" prop="sap27">
                    <el-input v-model="data.row.sap27"  />
                </el-form-item>
                <el-form-item label="一模几件" prop="sap28">
                    <el-input v-model="data.row.sap28"  />
                </el-form-item>
                <el-form-item label="分类" prop="sap29">
                    <el-input v-model="data.row.sap29"  />
                </el-form-item>


            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="editForm(userForm)">修改</el-button>
                    <el-button type="primary" @click="copyForm(userForm)">复制</el-button>
                </span>
            </template>

        </el-dialog> 


    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import {  sapListApi,sapcopyApi,sapeditApi } from '@/util/request'

const data = reactive(
    {
        name: 'sap',
        searchParms: {
            query: "",
            page: 1,
            pageSize: 10
        },
        total: 0,
        dialogFormVisible: false,
        row:[],
        len:0,
    }
)


const searchList = () => {
    sapListApi(data.searchParms).then(res => {
        data.tableData = res
        data.len = res.length
    })
}

const editForm = (formEl) => {
    // console.log('修改提交')
    sapeditApi(data.row).then(res => {
        console.log(res)
        data.dialogFormVisible = false
        data.row = {}
        searchList()
    })

}
const copyForm = (formEl) => {
    // console.log('修改提交')
    sapcopyApi(data.row).then(res => {
        console.log(res)
        data.dialogFormVisible = false
        data.row = {}
        searchList()
    })

}
const handleClick = row => {
   
    data.dialogFormVisible = true
    data.row=row
    console.log(data.row)
}

</script>

<style scoped>
.input_box {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    margin-right: 15px;
}
</style>