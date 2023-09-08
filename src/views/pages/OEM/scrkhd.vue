<template>
    <h2>生产入库</h2>
    <el-row :gutter="20">
    <el-col :span="18">
        <el-col :span="12">
            <el-card shadow="always" style="height:300px">
                <div>
                    <h1>统计日期:</h1>
                    <el-date-picker v-model="input.da" type="date" placeholder="入库日期" :disabled-date="disabledDate"
                        :shortcuts="shortcuts" size="large" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </div>
                <div>
                    <h1>扫码:</h1>
                    <el-input v-model="input.value" placeholder="Please input" @change="scanadd" />
                </div>

            </el-card>
        </el-col>

        <div class="page_content">
        <div class="flex">
            扫码日期:
            <el-date-picker v-model="data.searchParms.query" type="date" start-placeholder="Start date"
                end-placeholder="End date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
            <el-button type="primary" @click="query_all">查询</el-button>
        </div>

        <el-card shadow="never">
            <el-table :data="data.tableData" style="width: 100%" show-summary :summary-method="getSummaries" height="800">
                <el-table-column label="操作" width="80">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">修改</el-button>
                        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="bgsl02_id" label="总成SAP代码" width="120" />
                <el-table-column prop="bgsl10" label="品名" width="200" />
                <el-table-column prop="bgsl03" label="数量" width="80" />
                <el-table-column prop="bgsl04" label="批号" width="120" />
                <el-table-column prop="bgsl06" label="统计日期" width="120" />
                <el-table-column prop="bgsl07" label="每箱数量" width="80" />
                <el-table-column prop="bgsl08" label="箱数" width="80" />
                <el-table-column prop="bgsl09" label="零散" width="80" />

            </el-table>

        </el-card>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="data.dialogFormVisible" title="编辑用户" width="600px" @closed="closeDialog">
            <!-- #表单 -->
            <el-form ref="userForm" :model="data.row">

                <el-form-item label="ID" prop="id">
                    <el-input v-model="data.row.id" disabled />
                </el-form-item>
                <el-form-item label="总成SAP代码" prop="bgsl02_id">
                    <el-input v-model="data.row.bgsl02_id" disabled />
                </el-form-item>
                <el-form-item label="产品名称" prop="bgsl10">
                    <el-input v-model="data.row.bgsl10" disabled />
                </el-form-item>
                <el-form-item label="数量" prop="bgsl03">
                    <el-input v-model="data.row.bgsl03" disabled />
                </el-form-item>
                <el-form-item label="批号" prop="bgsl04">
                    <el-input v-model="data.row.bgsl04" />
                </el-form-item>
                <el-form-item label="统计日期" prop="bgsl06">
                    <el-date-picker v-model="data.row.bgsl06" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="每箱数量" prop="bgsl07">
                    <el-input-number v-model="data.row.bgsl07" @change="numchage" controls-position="right"
                        style="width: 100px" :min="0" />
                </el-form-item>
                <el-form-item label="箱数" prop="bgsl08">
                    <el-input-number v-model="data.row.bgsl08" @change="numchage1" controls-position="right"
                        style="width: 100px" :min="0" :max="1" />
                </el-form-item>
                <el-form-item label="零散" prop="bgsl09">
                    <el-input-number v-model="data.row.bgsl09" @change="numchage2" controls-position="right"
                        style="width: 100px" :min="0" />
                </el-form-item>


            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="editForm(userForm)">修改</el-button>
                </span>
            </template>

        </el-dialog>
    </div>
    </el-col>
        <el-col :span="5">
            <el-card shadow="always" style="height:1250px">
                <div class="flex">
                    扫码日期:
                    <el-date-picker v-model="data.searchParms1.query" type="date" start-placeholder="Start date"
                        end-placeholder="End date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                    <el-button type="primary" @click="query_butong">查询</el-button>
                </div>
                <el-table :data="data.tableData1" style="width: 100%" height="1100px" :row-class-name="tableRowClassName">
                    <el-table-column prop="sap" label="总成SAP代码" width="120" />
                    <el-table-column prop="sc" label="生产数量" width="120" />
                    <el-table-column prop="rc" label="入仓数量" width="120" />
                </el-table>
            </el-card>
        </el-col>
    </el-row>
    
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue';
import { scrkhdAddApi, scrkhdListApi, scrkhdChangeapi, scrkhdListbutongApi } from '@/util/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as dayjs from 'dayjs'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'

const data = reactive(
    {
        name: 'sap',
        searchParms: {
            query: dayjs().format('YYYY-MM-DD'),
        },
        searchParms1: {
            query: dayjs().format('YYYY-MM-DD'),
        },
        total: 0,
        dialogFormVisible: false,
        row: [],
        editstate: '1'
    }
)

const numchage = () => {

    data.row.bgsl03 = data.row.bgsl07 * data.row.bgsl08 + data.row.bgsl09
}
const numchage1 = () => {
    if (data.row.bgsl08 > 0) { data.row.bgsl09 = 0 }

    numchage()
}
const numchage2 = () => {
    if (data.row.bgsl09 > 0) { data.row.bgsl08 = 0 }

    numchage()

}
const editForm = (formEl) => {
    console.log('修改提交')
    scrkhdChangeapi(data.row).then(res => {
        console.log(res)
        data.dialogFormVisible = false
        data.row = []
    })

}

const tableRowClassName = ({row,rowIndex}) =>{
console.log("row",row)
console.log("rowIndex",rowIndex)
    if (row.rc != row.sc) {
    return 'warning-row'
  } 
  return ''
}


const succmess = (res) => {
    console.log("aabb", res);
    ElMessage(res)
}
let input = reactive({
    value: '',
    // da: new Date(),
    da: dayjs().format('YYYY-MM-DD')
})
const scanadd = (val) => {
    scrkhdAddApi(input).then(res => {
        if (res == "error") {
            ElMessageBox.alert('扫描错误,请重新扫描', 'Title', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: 'OK',
            })
           
        }
        else{
            query_butong()
        }
        input.value = ''

    })
}
const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },

]

const disabledDate = (time) => {
    return time.getTime() > Date.now()
}

const query_all = () => {
    scrkhdListApi(data.searchParms).then(res => {
        data.tableData = res
    })
}
const query_butong = () => {
    scrkhdListbutongApi(data.searchParms1).then(res => {
        data.tableData1 = res
    })
}
query_butong()

const closeDialog = () => {
    data.row = []
    query_all()
    query_butong()

}




const getSummaries = (param) => {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计'
        } else if (index === 4) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0)
            } else {
                sums[index] = 'N/A'
            }
        } else {
            sums[index] = '--'
        }
    })
    return sums
}

const handleClick = row => {

    data.dialogFormVisible = true
    data.row = row
}

</script>

<style >
.input_box {
    width: 200px;
    height: 40px;
    /* margin-top: 20px; */
    margin-right: 15px;
}

.buts { 
    width: 300px;
    /* border: 1px solid #409EFF; */
    background-color: antiquewhite;
}

.warning-row{
    --el-table-tr-bg-color: rgb(255, 138, 138);
}
</style>