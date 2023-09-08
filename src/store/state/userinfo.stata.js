export default {
    state: {
        userInfo:(localStorage.getItem('loginDate')&& JSON.parse(localStorage.getItem('loginDate')))||{}

    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }       
    },
    actions: {  
        // 获取用户信息
        getUserInfo({commit}, userInfo) {
            commit('setUserInfo', userInfo);
        }
    }
};