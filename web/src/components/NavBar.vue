<!-- template 为 HTML5 -->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <router-link class="navbar-brand" :to="{name: 'home'}">贪吃蛇大战</router-link>
            <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false"
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link :class="'nav-link ' + (route_name === 'pk_index' ? 'active' : '')" :to="{name: 'pk_index'}">对战</router-link>
            </li>
            <li class="nav-item">
                <router-link :class="'nav-link ' + (route_name === 'record_index' ? 'active' : 'n')" :to="{name: 'record_index'}">对局列表</router-link>
            </li>
            <li class="nav-item">
                <router-link :class="'nav-link ' + (route_name === 'ranklist_index' ? 'active' : '')" :to="{name: 'ranklist_index'}">排行榜</router-link>
            </li>
        </ul> <!-- 左边 -->
        <ul class="navbar-nav" v-if="$store.state.user.is_login">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ $store.state.user.username }}
                    &nbsp;
                    <img :src="$store.state.user.photo" alt="" class="user-photo">
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <router-link class="dropdown-item" :to="{name: 'user_center_name_index'}">个人中心</router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" :to="{name: 'user_bot_index'}">我的Bot</router-link>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
                </ul>
            </li>
        </ul>
        <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
            <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'user_account_login'}" role="button">
                登录
            </router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'user_account_register'}" role="button">
                注册
            </router-link>
            </li>
        </ul><!-- 右边 -->
        </div>
    </div>
    </nav>
</template>

<!-- script 为 JS -->
<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        let route_name = computed(() => route.name)

        const logout = () => {
            store.dispatch("logout");
        }

        return {
            route_name,
            logout,
        }
    }
}
</script>

<!-- style 为 CSS -->
<!-- scoped 使组件加上随机字符串 不影响到这个文件以外的地方 -->
<style scoped>
img.user-photo {
    width: 4vh;
    border-radius: 50%;
}
</style>
