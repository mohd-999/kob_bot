export default {
    state: {  // 放置初始状态 app启动的时候的全局的初始值
        status: "matching",  // matching表示匹配界面，playing表示对战界面
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        gamemap: null,
        rows: 0,
        cols: 0,
        a_id: 0,
        a_sx: 0,
        a_sy: 0,
        b_id: 0,
        b_sx: 0,
        b_sy: 0,
        gameObject: null,
        loser: "none",  // none  all  A  B
    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) {  // 连接更换界面
            state.socket = socket;
        },
        updateOpponent(state, opponent) { // 对手的名字头像
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {  // 对战界面改变
            state.status = status;
        },
        updateGame(state, game) {
            state.gamemap = game.map;
            state.rows = game.rows;
            state.cols = game.cols;
            state.a_id = game.a_id;
            state.a_sx = game.a_sx;
            state.a_sy = game.a_sy;
            state.b_id = game.b_id;
            state.b_sx = game.b_sx;
            state.b_sy = game.b_sy;
        },
        updateGameObject(state, gameObject) {
            state.gameObject = gameObject;
        },
        updateLoser(state, loser) {
            state.loser = loser;
        },
    },
    actions: {
    },
    modules: {
    }
}
