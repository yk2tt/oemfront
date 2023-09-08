import axios from "axios";
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loadingObj = null

const Service = axios.create({
    timeout: 50000,
    baseURL: "http://192.168.134.237:9001/api/",
    // baseURL: "http://127.0.0.1:9001/api/",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

//请求拦截
Service.interceptors.request.use(config => {
    loadingObj = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

//响应拦截
Service.interceptors.response.use(response => {
    loadingObj.close()
    if (response instanceof ArrayBuffer) {
        return response;
      }
    else{
        return response.data;

    }
},
    (error) => {
        loadingObj.close()
        ElMessage({
            type: 'error',
            message: '请求失败',
            duration: 2000
        });
    }
);

//post请求
export const post = config => {
    return Service({
        ...config,
        method: 'post',
        data: config.data,
    })
}

//get请求
export const get = config => {
    return Service({
        ...config,
        method: 'get',
        params: config.data,
    })
}

//get请求
export const get1 = config => {
    return Service({
        ...config,
        method: 'get',
        params: config.data,
        responseType: 'arraybuffer'
    })
}


//put请求
export const put = config => {
    return Service({
        ...config,
        method: 'put',
        data: config.data,
    })
}

//del请求
export const del = config => {
    return Service({
        ...config,
        method: 'DELETE',
        params: config.data,
    })
}

