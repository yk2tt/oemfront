<template>
    <h1>收货记录</h1>

    <el-col :span="12">
        <el-card shadow="always">
            <el-button type="primary" @click="dingtodb">开始同步收货数据</el-button>

        </el-card>
    </el-col>



    <el-row :gutter="12">
        <el-col :span="8" v-for="item in data.shjl_day">
            <el-card shadow="always" :header="item.day">
                <el-statistic :title=item.yldh03 :value=item.aa />
            </el-card>
        </el-col>
    </el-row>

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
            <el-table :data="data.tableData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="150" />
                <el-table-column prop="yldh01" label="SAP号" width="120" />
                <el-table-column prop="yldh03" label="批号" width="120" />
                <el-table-column prop="yldh06" label="收货数量" width="120" />
                <el-table-column prop="yldh07" label="收货日期" width="120" />
                <el-table-column prop="yldh08" label="SAPP" width="120" />
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">修改</el-button>
                        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 
            <el-pagination background layout="prev, pager, next, jumper, ->, total" :page-size="data.searchParms.pageSize"
                v-model:current-page="data.searchParms.page" :total="100" /> -->

        </el-card>

        <!--编辑弹窗-->
        <el-dialog v-model="data.dialogFormVisible" title="编辑用户" width="600px">
            <!--表单-->
            <el-form ref="userForm" :model="data.formDate">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="data.formDate.id" disabled />
                </el-form-item>
                <el-form-item label="SAP号" prop="yldh01">
                    <el-input v-model="data.formDate.yldh01" disabled />
                </el-form-item>
                <el-form-item label="批号" prop="yldh03">
                    <el-input v-model="data.formDate.yldh03" disabled />
                </el-form-item>
                <el-form-item label="收货数量" prop="yldh06">
                    <el-input-number v-model="data.formDate.yldh06" controls-position="right" style="width: 100px"
                        :min="0" />
                </el-form-item>
                <el-form-item label="收货日期" prop="yldh07">
                    <el-date-picker v-model="data.formDate.yldh07" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"/>
                </el-form-item>
                <el-form-item label="SAPP" prop="yldh08">
                    <el-radio-group v-model="data.formDate.yldh08" class="ml-4">
                        <el-radio label="是" size="large">是</el-radio>
                        <el-radio label="否" size="large">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitForm(userForm)">确 定</el-button>
                </span>
            </template>

        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { shjldayApi, shjlListApi, shjlChangeInfoApi, shjlDingtoDbApi } from '@/util/request'
import { ElMessageBox } from 'element-plus'
const data = reactive(
    {
        name: 'shjl',
        shjl_day: [],
        tableData: [],
        keyWord: "",
        searchParms: {
            query: "",
            page: 1,
            pageSize: 10
        },
        total: 0,
        dialogFormVisible: false,
        formDate: {
            id: "",
            yldh01: "",
            yldh03: "",
            yldh06: "",
            yldh07: "",
            yldh08: "",
        }
    }
)

const shjl_dayList = () => {
    shjldayApi().then(res => {
        data.shjl_day = res
    })

}
const searchList = () => {
    shjlListApi(data.searchParms).then(res => {
        data.tableData = res
    })

}

const dingtodb = () => {
    shjlDingtoDbApi().then(res => {
        ElMessageBox.alert('钉钉数据后台同步中,预计需要30秒时间.', 'Title', {
            confirmButtonText: 'ok',
            beforeClose: (action, instance, done) => {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = 'Loading...'
                setTimeout(() => {
                    done()
                    setTimeout(() => {
                        instance.confirmButtonLoading = false
                    }, 300)
                }, 30000)


            }


        })
    })
}

const submitForm = (formEl) => {
    // console.log('修改提交')
    shjlChangeInfoApi(data.formDate).then(res => {
        console.log(res)
        data.dialogFormVisible = false
        data.formDate = {}
        searchList()
        shjl_dayList()
    })

}

const handleClick = row => {
    // console.log('编辑')
    // console.log(row)
    data.dialogFormVisible = true
    data.formDate.id = row.id
    data.formDate.yldh01 = row.yldh01
    data.formDate.yldh03 = row.yldh03
    data.formDate.yldh06 = row.yldh06
    data.formDate.yldh07 = row.yldh07
    data.formDate.yldh08 = row.yldh08
}

shjl_dayList()
</script>

<style scoped>
.input_box {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    margin-right: 15px;
}
</style>