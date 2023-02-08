<template>
    <div class="matchground">
        <div class="row">
            <div class="col-4">
                <div class="user-photo">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="user-username">
                    {{ $store.state.user.username }}
                </div>
            </div>
            <div class="col-4">
                <div class="user-select-bot">
                    <select v-model="select_bot" class="form-select" aria-label="Default select example">
                        <option value="-1" v-if="match_btn_info === '开始匹配' || parseInt(select_bot) === -1" selected>御驾亲征</option>
                        <option v-for="bot in bots" :key="bot.id" :value="bot.id">
                            {{ bot.title }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="user-photo">
                    <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div class="user-username">
                    {{ $store.state.pk.opponent_username }}
                </div>
            </div>
            <div class="col-12" style="text-align:center; padding-top: 15vh;">
                <button @click="click_match_btn" type="button"
                    :class="'btn btn-' + (match_btn_info === '开始匹配' ?
                    'success' : 'danger') + ' btn-lg'">
                    {{ match_btn_info }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import $ from 'jquery'

export default {
    setup() {
        const store = useStore();
        let match_btn_info = ref("开始匹配");  // 初始为"开始匹配"，ref实现响应式实时更新数据
        let bots = ref([]);  // 初始为空，ref实现响应式实时更新数据
        let select_bot = ref("-1");   // 初始为-1，ref实现响应式实时更新数据

        const update_bots = () => {  // 开始匹配后不能更换参战人员
            let new_bots = [];
            for(const bot of bots.value) {
                if(bot.id === select_bot.value) {
                    new_bots.push(bot);
                }
            }
            bots.value = new_bots;
        }

        const click_match_btn = () => {
            if(match_btn_info.value === "开始匹配") {
                match_btn_info.value = "取消";
                update_bots();
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                    bot_id: select_bot.value,
                }));
            } else {
                match_btn_info.value = "开始匹配";
                refresh_bots();
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }));
            }
        }

        const refresh_bots = () => {
            $.ajax({
                url: "https://app4435.acapp.acwing.com.cn/api/user/bot/getlist/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;
                }
            })
        }

        refresh_bots();  // 从云端动态获取bots

        return {
            match_btn_info,
            click_match_btn,
            bots,
            select_bot,
        }
    }
}
</script>

<style scoped>
div.matchground {
    width: 60vw;
    height: 70vh;
    margin: 40px auto;
    background-color: rgba(50, 50, 50, 0.5);
}
div.user-photo {
    text-align: center;
    padding-top: 10vh;
}
div.user-photo > img {
    border-radius: 50%;
    width: 20vh;
}
div.user-username {
    padding-top: 2vh;
    text-align: center;

    color: white;
    font-size: 24px;

    font-weight: 700;
}
div.user-select-bot {
    padding-top: 20vh;
}
div.user-select-bot > select {
    width: 60%;
    margin: 0 auto;
}

</style>
