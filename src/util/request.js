import { post, get, put,del,get1 } from "./service"

export const loginApi = data => {
    return post({ url: "/login", data })
}

export const shjlApi = data => {
    return get({ url: "/shjl/day", data })
}

export const userListApi = data => {
    return get({ url: "/user", data })
}

export const userAddApi = data => {
    return post({ url: "/user", data })
}

export const userChangeStateApi = data => {
    return put({ url: `users/${data.name}/state/${data.mg_state}`, data })
}

export const userChangeInfoApi = data => {
    return put({ url: `users/${data.name}`, data })
}


// shjl
export const shjldayApi =() => {
    return get({ url: "/shjl/day" })
}

export const shjlListApi = data => {
    return get({ url: "/shjl/List", data })
}

export const shjlChangeInfoApi = data => {
    return put({ url: `shjl/${data.id}`, data })
}

export const shjlDingtoDbApi = data => {
    return get({ url: "/shjl/Dingtodb", data })
}


// sap
export const sapListApi = data => {
    return get({ url: "/sap/List", data })
}

export const sapeditApi = data => {
    return put({ url: `sap/edit/${data.id}`, data })
}

export const sapcopyApi = data => {
    return put({ url: `sap/copy/${data.id}`, data })
}

//scrk
export const scrkAddApi = data => {
    return post({ url: "/scrk/add", data })
}

export const scrkChangeapi = data => {
    return post({ url: "/scrk/change", data })
}
export const scrktemListApi = data => {
    return get({ url: "/scrk/temList", data })
}

export const scrktemClsApi = data => {
    return del({ url: "/scrk/temCls", data })
}

export const scrktemTodbApi = data => {
    return get({ url: "/scrk/temtodb", data })
}

export const scrkListApi = data => {
    return post({ url: "/scrk/List", data })
}

//scrkhd
export const scrkhdAddApi = data => {
    return post({ url: "/scrkhd/add", data })
}

export const scrkhdChangeapi = data => {
    return post({ url: "/scrkhd/change", data })
}

export const scrkhdListApi = data => {
    return post({ url: "/scrkhd/List", data })
}
export const scrkhdListbutongApi = data => {
    return post({ url: "/scrkhd/Listbutong", data })
}


//jiesuan
export const jskeListApi = data => {
    return get({ url: "/js/piList", data })
}

export const jsweiListApi = data => {
    return get({ url: "/js/jieList", data })
}

export const jsListApi = data => {
    return post({ url: "/js/List", data })
}

export const jsCreateApi = data => {
    return post({ url: "/js/Create", data})
}
export const jsCreate1Api = data => {
    return get1({ url: "/download", data })
}

export const testApi = data => {
    return get({ url: "/test2", data })
}

//kucun
export const kcListApi = data => {
    return get({ url: "/kc/List", data })
}

export const kcdownApi = data => {
    return get1({ url: "/kc/download", data })
}

export const kcDetailApi = data => {
    return get({ url: `/kc/${data.sap}` })
}

export const kcqcChangeApi = data => {
    return get({ url: `/kc/${data.sap}/num/${data.num}` })
}



//index
export const indexHeatmapApi = data => {
    return get({ url: "/index/Heatmap" })
}

export const indexRadarApi = data => {
    return get({ url: "/index/Radar" })
}

export const indexSumApi = data => {
    return get({ url: "/index/Sum" })
}