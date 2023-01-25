export default {
    state: {
        status: "matching",  // matching表示匹配界面，playing表示对战界面
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        gamemap: null,
    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) {  // 前后端连接
            state.socket = socket;
        },
        updateOpponent(state, opponent) { // 对手的名字头像
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {  // 对战界面改变
            state.status = status;
        },
        updateGamemap(state, gamemap) {
            state.gamemap = gamemap;
        }
    },
    actions: {
    },
    modules: {
        // user: ModuleUser,
        // pk: ModulePk,
    }
}
