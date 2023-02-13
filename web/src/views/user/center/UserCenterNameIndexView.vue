<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top: 30px;">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" style="width:100%;">
                    </div>
                </div>
            </div> <!-- 左边 -->
            <div class="col-9">
                <div class="card" style="margin-top: 30px;">
                    <div class="card-header">
                        <b style="font-size: 30px;">个人信息</b>
                    </div>
                    <div class="card-body">
                        <div class="row  justify-content-md-center">
                            <div class="col-7">
                                <form @submit.prevent="update_user">
                                    <div class="mb-3">
                                        <label for="username" class="username">用户名:</label>
                                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名称">
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="email">邮件地址:</label>
                                        <input v-model="email" type="text" class="form-control" id="email" placeholder="请输入邮箱">
                                    </div>
                                    <div class="mb-3">
                                        <label for="introduction" class="introduction">个人简介:</label>
                                        <textarea v-model="introduction" class="form-control" id="introduction" rows="5" placeholder="请输入简介"></textarea>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <div class="error-message"> {{ error_message }}</div>
                                        <button type="submit" class="btn btn-outline-primary">更新信息</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> <!-- 右边上 -->
                <div class="card" style="margin-top: 30px;">
                    <div class="card-header">
                        <b style="font-size: 30px;">账号安全</b>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="col-4">
                                        <img src="@/assets/images/password.jpg" style="width:5%;">
                                        <a style="margin: 10px;">密码</a>
                                    </td>
                                    <td class="col-4">
                                        已设置
                                    </td>
                                    <td class="col-4" style="text-align:end;">
                                        <router-link :to="{name: 'user_center_password_index'}">更改密码</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div><!-- 右边下 -->
            </div> <!-- 右边 -->
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue';
import $ from 'jquery'

export default {
    components: {
    },

    setup() {
        const store = useStore();
        let username = ref('');
        let email = ref('');
        let introduction = ref('');
        let error_message = ref('');

        const refresh_user = () => {  // 更新
            $.ajax({
                // url: "http://127.0.0.1:3000/api/user/center/get/name/",
                url: "https://app4435.acapp.acwing.com.cn/api/user/center/get/name/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    username.value = resp.username;
                    email.value = resp.email;
                    introduction.value = resp.introduction;
                }
            })
        }

        refresh_user();

        const update_user = () => {  // 上传
            $.ajax({
                // url: "http://127.0.0.1:3000/api/user/center/update/name/",
                url: "https://app4435.acapp.acwing.com.cn/api/user/center/update/name/",
                type: "post",
                data: {
                    username: username.value,
                    email: email.value,
                    introduction: introduction.value,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if(resp.error_message === "success") {
                        location.reload(true);
                        refresh_user();
                    } else {
                        error_message.value = resp.error_message;
                    }
                }
            });
        }

        return {
            username,
            email,
            introduction,
            error_message,
            update_user,
        }
    }

}
</script>

<style scoped>
label.username {
    color:chocolate;
    font-weight: 600;
}
label.email {
    color: chocolate;
    font-weight: 600;
}
label.introduction {
    color: chocolate;
    font-weight: 600;
}
div.error-message {
    color: red;
}
</style>
