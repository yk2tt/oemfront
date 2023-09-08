<template>
    <h1>库存</h1>

    <div class="page_content">
        <div class="flex">
            <div class="buts">
                <el-popconfirm title="确定重新计算?" @confirm="confirmEvent">
                    <template #reference>
                        <el-button type="primary">库存重新计算</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" @click="filedo">导出库存表</el-button>
            </div>

        </div>
        <el-card shadow="never">
            <el-table :data="data.tableData" style="width: 100%" height="800">
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">明细</el-button>
                        <!-- <el-button link type="primary" size="small">Edit</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="sap" label="成品SAP" width="120" />
                <el-table-column prop="sap01" label="半成品SAP" width="120" />
                <el-table-column prop="sap05" label="材料" width="120" />
                <el-table-column prop="sap02" label="产品型号" width="250" />
                <el-table-column prop="sh" label="到货数量（切割后）" width="100" />
                <el-table-column prop="fp" label="废品数量（切割后）" width="100" />
                <el-table-column prop="rk" label="入库数量" width="120" />
                <el-table-column prop="js" label="出货数量" width="120" />
                <el-table-column prop="kc" label="存货数量" width="120" />
                <el-table-column prop="zzp" label="在制品数量" width="120" />
                <el-table-column prop="cp" label="成品库存" width="120" />
            </el-table>
            <!-- 
            <el-pagination background layout="prev, pager, next, jumper, ->, total" :page-size="data.searchParms.pageSize"
                v-model:current-page="data.searchParms.page" :total="100" /> -->
        </el-card>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="data.dialogFormVisible" title="库存明细">
            <div class="flex">
                <div class="buts flex">
                    <div>期初在制品数量:</div>

                     <el-input-number v-model="data.num" controls-position="right" style="width: 100px"/>
                </div>
                <el-button type="primary" @click="numchange">修改提交</el-button>
            </div>

            <!-- #表单 -->
            <el-table :data="data.tableData2" style="width: 100%">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="sap" label="成品SAP" width="120" />
                <el-table-column prop="date" label="异动日期" width="120" />
                <el-table-column prop="pihao" label="批号" width="120" />
                <el-table-column prop="sh" label="到货数量（切割后）" width="100" />
                <el-table-column prop="fp" label="废品数量（切割后）" width="100" />
                <el-table-column prop="rk" label="入库数量" width="120" />
                <el-table-column prop="js" label="出货数量" width="120" />
                <el-table-column prop="kc" label="存货数量" width="120" />
                <el-table-column prop="qc" label="在制品数量" width="120" />
                <el-table-column prop="cp" label="成品库存" width="120" />
            </el-table>
        </el-dialog>

    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { kcListApi, kcdownApi, kcDetailApi, kcqcChangeApi } from '@/util/request'

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
        row: [],
        num: 0,
        sap: ""
    }
)


const searchList = () => {
    kcListApi().then(res => {
        data.tableData = res
    })
}



const copyForm = (formEl) => {
    // console.log('修改提交')


}
const handleClick = row => {

    data.dialogFormVisible = true
    kcDetailApi(row).then(res => {
        data.sap = row.sap

        data.tableData2 = res.data
        data.num = res.num[0]['qc']

    })

}


const numchange = () => {
    kcqcChangeApi(data).then(res => {
        searchList()
        kcDetailApi(data).then(res => {
            data.tableData2 = res.data

        })
    })
}



const confirmEvent = () => {
    searchList()

}

const filedo = () => {
    kcdownApi().then(response => {

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



searchList()

</script>

<style scoped>
.input_box {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    margin-right: 15px;
}

.buts {
    width: 500px;
    /* border: 1px solid #409EFF; */
    background-color: antiquewhite;
}
</style>