<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <div class="flex">
                <div class="input_box">
                    <el-input v-model="keyWord" placeholder="Please input" class="input-with-select">
                        <template #append>
                            <el-button @click="searchList">
                                <el-icon>
                                    <Search />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="addUser">新建用户</el-button>

            </div>
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="name" label="用户名称" width="180" />
                <el-table-column prop="address" label="Address" />
                <el-table-column prop="mg_state" label="状态">
                    <template #default="scope">
                        <el-switch v-model="scope.row.mg_state" active-value="1"  inactive-value="0" @change="switchChange(scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="delUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>



        </div>
        <!--新建弹窗-->
        <el-dialog v-model="dialogFormVisible" title="新建用户">
            <!--表单-->
            <el-form ref="userForm" :model="formDate" :rules="rules">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="formDate.name" />
                </el-form-item>
                <el-form-item label="Address" prop="address">
                    <el-input v-model="formDate.address" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm(userForm)">确 定</el-button>
                </span>
            </template>

        </el-dialog>
        <!--编辑弹窗-->
        <el-dialog v-model="dialogFormEDVisible" title="编辑用户">
            <!--表单-->
            <el-form ref="userFormE" :model="formDate2" :rules="rules">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="formDate2.name" />
                </el-form-item>
                <el-form-item label="Address" prop="address">
                    <el-input v-model="formDate2.address" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitFormE(userFormE)">确 定</el-button>
                </span>
            </template>

        </el-dialog>

    </div>
</template>
<script>
import { reactive, toRefs, ref } from 'vue';
import { userListApi, userAddApi ,userChangeStateApi,userChangeInfoApi} from '@/util/request'
export default {
    name: 'Home',
    setup() {
        const data = reactive(
            {
                keyWord: "",
                searchParms: {
                    query: "",
                    page: 1,
                    pageSize: 10
                },
                userList: [],
                dialogFormVisible: false,
                dialogFormEDVisible: false,
                formDate: {
                    name: "",
                    address: ""
                },
                formDate2: {
                    name: "",
                    address: ""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    address: [
                        {
                            required: false,
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '请输入正确的邮箱'
                            , trigger: 'blur'
                        },
                    ]
                }
            }

        )
        const searchList = () => {
            console.log('搜索')
            userListApi(data.searchParms).then(res => {
                // if(res.data){
                console.log(res)
                data.userList = res
                // }

            })

        }
        const addUser = () => {
            console.log('新建用户')
            data.dialogFormVisible = true
        }

        const submitForm = (formEl) => {
            console.log('新建提交')
            formEl.validate(res => {
                if (res) {
                    console.log('验证成功')
                    userAddApi(data.formDate).then(res => {
                        console.log(res)
                        // if(res.code===200){
                        data.dialogFormVisible = false
                        data.formDate = {}
                        //     data.userList.push(res.data)
                        searchList()
                        // }
                    })
                } else {
                    console.log('验证失败')
                }
            })
        }
        const submitFormE = (formEl) => {
            console.log('修改提交')
            userChangeInfoApi(data.formDate2).then(res => {
                        console.log(res)
                        // if(res.code===200){
                        // data.dialogFormVisible = false
                        // data.formDate2 = {}
                        //     data.userList.push(res.data)
                        // searchList()
                        // }
                    })

        }
        const switchChange = row => {
            console.log('开关')
            console.log(row)
            userChangeStateApi(row).then(res => {
                console.log(res)
            })
        }
        const editUser = row => {
            console.log('编辑')
            console.log(row)
            data.dialogFormEDVisible = true
            data.formDate2.name=row.name
            data.formDate2.address=row.address


        }

        searchList()
        const userForm = ref()
        const userFormE = ref()
        // 返回
        return { ...toRefs(data), searchList, addUser, submitForm ,switchChange,editUser,submitFormE};
    }
}
</script>

<style scoped>
.input_box {
    width: 500px;
    height: 40px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 15px;
}
</style>