<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-flaot" >
        <div class="flex"> 
            <img class="logo" src="../../assets/logo.png" alt="">
            <el-link  href="/index">
                <h1 class="title"> 联景汽配项目定制系统</h1>

            </el-link>
        </div>

        <div>
            <el-link style="margin-right: 5px;" href="http://192.168.134.237:8080/">
                <el-button type="primary" @click="loginOut">返回旧版本</el-button>
            </el-link>
        <el-button type="danger" @click="loginOut">退出</el-button>

        </div>

      </el-header>
      <el-container>
        <el-aside class="common-aside" width="200px">
            <el-menu
                class="el-menu-vertical-demo"
                background-color="none"
                text-color="#fff"
                :router="true"
                :default-openeds="['1',]"
            >
                <el-sub-menu index="1">
                <template #title>
                    <el-icon><Avatar /></el-icon>
                    <span>汽配业务流程</span>
                </template>
                    <el-menu-item index="/saplist">SAP料件资料维护</el-menu-item>
                    <el-menu-item index="/shjh">数据上传</el-menu-item>
                    <el-menu-item index="/shjl">收货记录</el-menu-item>
                    <el-menu-item index="/scrk">生产入库</el-menu-item>
                    <el-menu-item index="/scrkhd">入仓核对</el-menu-item>
                    <el-menu-item index="/jiesuan">结算管理</el-menu-item>
                    <el-menu-item index="/kucun">库存管理</el-menu-item>

                </el-sub-menu>


                <el-sub-menu index="2">
                <template #title>
                    <el-icon><Avatar /></el-icon>
                    <span>报表管理</span>
                </template>
                    <el-menu-item index="/rpchenpin">成品报表</el-menu-item>
                    <el-menu-item index="/rpzhuancang">开转仓单</el-menu-item>


                </el-sub-menu>





            </el-menu>


        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>

</template>


<script>
import { reactive,toRefs } from 'vue';
import {  useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'layout',
    setup() {
        const store=useStore()
        const router=useRouter()
        const data = reactive(
            {
                name: 'Vue2222',
            }
        )
        const loginOut=()=>{
            store.commit('setUserInfo',{})
            localStorage.removeItem('loginDate')
            router.push({path:'/login'})
        }
        const toin=()=>{
            router.push({path:'/index'})
        }
        return {...toRefs(data),loginOut};
    }
}
</script>

<style>
    .el-container{
        height: 100vh;
        overflow: hidden;
        
    }
    .common-header{
        background: rgb(35, 52, 51);
        display: flex;
    }
    .common-aside{
        background: rgb(53, 41, 29);
    }
    .logo{
        width: 80px;
    }
    .title{
        color: #fff;
        font-size: 20px;
        margin-left: 10px;
    }
    .el-main{
        background: rgb(235, 235, 235);
    }
    .el-menu{
        border-right: none;
    }


</style>