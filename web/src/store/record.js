export default {
    state: {  // 放置初始状态 app启动的时候的全局的初始值
        is_record: false,  // 是否录像
        a_steps: "",
        b_steps: "",
        record_loser: "",
    },
    getters: {
    },
    mutations: {
        updateIsRecord(state, is_record) {  // 前后端连接
            state.is_record = is_record;
        },
        updateSteps(state, data) {
            state.a_steps = data.a_steps;
            state.b_steps = data.b_steps;
        },
        updateRecordLoser(state, loser) {
            state.record_loser = loser;
        },
    },
    actions: {
    },
    modules: {
    }
}
