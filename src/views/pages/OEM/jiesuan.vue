<template>
    <h2>结算</h2>
    <el-row :gutter="12">
        <el-col :span="12">
            <el-card shadow="always">
                <h1>可结批号</h1>
                <el-table ref="multipleTableRef" :data="data.tablepiData" style="width: 100%"
                    @selection-change="handleSelectionChange1" max-height="250">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="bgsl04" label="批号" width="120" />
                    <el-table-column prop="aa" label="可结数量" width="120" />
                    <el-table-column prop="bb" label="已结数量" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="always">
                <h1>已结单据</h1>
                <el-table ref="multipleTableRef" :data="data.tableweiData" style="width: 100%"
                    @selection-change="handleSelectionChange2" max-height="250">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="aa" label="单号" width="120" />
                    <el-table-column prop="bb" label="结算数量" width="120" />
                    <el-table-column prop="cc" label="涉及批号" />
                </el-table>
            </el-card>
        </el-col>
    </el-row>


    <div class="page_content">
        <div class="flex">
            <div class="buts">
                <el-popconfirm title="确定生成结算表?" @confirm="confirmEvent">
                    <template #reference>
                        <el-button type="primary">生成结算表</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" @click="filedo">导出最新结算表</el-button>
            </div>

        </div>

        <el-card shadow="never">
            <el-table :data="data.tableData" style="width: 100%" :summary-method="getSummaries" show-summary height="800">
                <el-table-column prop="sap03" label="总成SAP" width="120" />
                <el-table-column prop="sap02" label="产品名称" width="220" />
                <el-table-column prop="sap06" label="本日结算 数量" width="120" />
                <el-table-column prop="sap10" label="结算单价(未税）" width="90" />
                <el-table-column prop="sap11" label="去毛边总金额（未税）" width="120" />
                <el-table-column prop="sap12" label="去毛边加税后总金额" width="120" />
                <el-table-column prop="bgsl03" label="装配/切割后(数量)" width="120" />
                <el-table-column prop="sap21" label="结算单价(未税）" width="90" />
                <el-table-column prop="sap22" label="总金额（未税）" width="90" />
                <el-table-column prop="sap23" label="加税后金额" width="120" />
                <el-table-column prop="bgsl04" label="批号" width="120" />
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue';
import { jskeListApi, jsweiListApi, jsListApi, jsCreateApi, jsCreate1Api } from '@/util/request'
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
// import { ElLoading } from 'element-plus'

const data = reactive(
    {
        name: 'jiesuan',
        searchParms: {
            pihaoSelectedIds: [],
            danhaoSelectedIds: []
        },
        total: 0,
        dialogFormVisible: false,
        row: [],
        editstate: '1',
        tableData: []

    }
)

const jskeList = () => {
    jskeListApi().then(res => {
        data.tablepiData = res
    })
}

const jsweiList = () => {
    jsweiListApi().then(res => {
        data.tableweiData = res
    })
}

const handleSelectionChange1 = (val) => {
    data.searchParms.pihaoSelectedIds = []
    for (let selectedItem of val) {
        data.searchParms.pihaoSelectedIds.push(selectedItem.bgsl04)
    }
    if ((data.searchParms.pihaoSelectedIds.length) > 0 || (data.searchParms.danhaoSelectedIds.length) > 0) { jilist() }
    else {
        data.tableData = []
    }
}

const handleSelectionChange2 = (val) => {
    data.searchParms.danhaoSelectedIds = []
    for (let selectedItem of val) {
        data.searchParms.danhaoSelectedIds.push(selectedItem.aa)
    }
    if ((data.searchParms.pihaoSelectedIds.length) > 0 || (data.searchParms.danhaoSelectedIds.length) > 0) { jilist() }
    else {
        data.tableData = []
    }
}

const jilist = () => {
    jsListApi(data.searchParms).then(res => {
        data.tableData = res

    }
    )

}
const getSummaries = (param) => {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计'
        } else if (index === 2 || index === 4 || index === 5 || index === 6 || index === 8 || index === 9) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0).toFixed(2)
            } else {
                sums[index] = 'N/A'
            }
        } else {
            sums[index] = '--'
        }
    })
    return sums
}



const exportFile = (content, customFileName, type) => {
    let filename = content.filename || customFileName;
    let URL = window.URL || window.webkitURL;
    let objectUrl = URL.createObjectURL(content);
    let a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename; //这步要注意 filename要写成 '文件名.xlsx'
    document.body.appendChild(a);
    a.click();
    a.remove();
}

const confirmEvent = () => {
    if ((data.searchParms.pihaoSelectedIds.length) > 0 || (data.searchParms.danhaoSelectedIds.length) > 0) {
        jsCreateApi(data.searchParms).then(res => {
            filedo()
            jskeList()
            jsweiList()

        })
    }
    else {
        console.log("空")

    }

}



const filedo = () => {
    jsCreate1Api().then(response => {

    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });
    const a = document.createElement("a");
    const href = window.URL.createObjectURL(blob); // 下载的链接
    a.href = href;
    // a.download = decodeURI(
    //   response.headers["content-disposition"].split(";")[1].split("=")[1]
    // ); // 获取后台设置的文件名称
    document.body.appendChild(a);
    a.click(); // 点击导出
    document.body.removeChild(a); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  });
}



jskeList()
jsweiList()

</script>

<style scoped>
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
</style>