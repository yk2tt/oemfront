<template>
    <h1>上传数据</h1>

    <div class="page_content">
        <el-col :span="8">
            <el-card shadow="always">
                <el-upload action="http://192.168.134.237:9001/api/upload/shjh" name="file" method="post" accept=".xls,.xlsx"
                    :on-success="succmess">
                    <el-button size="default" type="primary">收货计划电子档上传</el-button>
                </el-upload>
            </el-card>
            <el-card shadow="always">
                <el-upload action="http://192.168.134.237:9001/api/upload/james" name="file" method="post" accept=".xls,.xlsx"
                    :on-success="succmess">
                    <el-button size="default" type="primary">James电子档上传</el-button>
                </el-upload>
            </el-card>
            <el-card shadow="always">
                <el-upload action="http://192.168.134.237:9001/api/upload/wscl" name="file" method="post" accept=".xls,.xlsx"
                    :on-success="succmess">
                    <el-button size="default" type="primary">尾数电子档上传</el-button>
                </el-upload>
            </el-card>
            <el-card shadow="always">
                <el-upload :action=data.url
                    name="file" method="post"
                    list-type="text" accept=".xls,.xlsx"
                    :on-success="succmess">
                    <el-button size="default" type="primary">废品电子档上传</el-button>

                </el-upload>
                <el-input v-model="data.input" placeholder="Please input 批号" @blur="urlch"  />
            </el-card>
        </el-col>

    </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue';
import { ElMessage } from 'element-plus'
const succmess = (res) => {
    console.log(res);
    ElMessage(res)
}
const data=reactive({
    input:'',
    url:"http://192.168.134.237:9001/api/upload/fpdj/"
})

const urlch = () => {
    data.url="http://192.168.134.237:9001/api/upload/fpdj/"+data.input
}

</script>

<style scoped></style>