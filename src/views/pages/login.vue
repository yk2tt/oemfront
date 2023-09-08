<template>
    <div class="login_wrap">
        <div class="form_wrap">

            <el-form ref="formRef" :model="loginDate" label-width="80px" class="demo-dynamic">
                <el-form-item prop="username" label="用户名" :rules="[
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                    },

                ]">
                    <el-input v-model="loginDate.username" />
                </el-form-item>

                <el-form-item prop="password" label="密码" :rules="[
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                    },

                ]">
                    <el-input type='password' v-model="loginDate.password" />
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleLogin">登录</el-button>

        </div>

    </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { createLogger, useStore } from 'vuex';
import { loginApi, shjlApi } from '@/util/request'

export default {
    name: 'login',
    setup() {
        const store = useStore()
        const router = useRouter()
        const data = reactive(
            {
                loginDate: {
                    username: '',
                    password: ''
                }
            }
        )
        const handleLogin = () => {

            // console.log(data.loginDate)
            // shjlApi(data.loginDate).then(res=>{
            //                    if(res.data){
                // console.log(res)
                // }
            if (data.loginDate.username == 'aab') {
                console.log(data.loginDate)
                store.commit('setUserInfo', data.loginDate)
                localStorage.setItem('loginDate', JSON.stringify(data.loginDate))
                router.push('/')
            }
        }

        return { ...toRefs(data), handleLogin };
    }
}
</script>

<style scoped> 
.login_wrap {
     width: 100%;
     height: 100vh;
     background: rgb(49, 43, 43);
     /* background-image: url('../assets/login_bg.png'); */
     position: relative;
 }

 .form_wrap {
     background: rgb(255, 255, 255);
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
     border-radius: 10px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
     padding: 30px 50px;
 }
</style>