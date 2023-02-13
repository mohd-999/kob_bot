<template>
    <div class="container" >
        <div class="row">
            <div class="col-6" style="margin: auto">
                <div class="card" style="margin-top: 30px;">
                    <div class="card-header">
                        <b style="font-size: 30px;">个人信息</b>
                    </div>
                    <div class="card-body">
                        <div class="row  justify-content-md-center">
                            <div class="col-7">
                                <form @submit.prevent="update_password">
                                    <div class="mb-3">
                                        <label for="password" class="password">旧密码:</label>
                                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入旧密码">
                                    </div>
                                    <div class="mb-3">
                                        <label for="new_password" class="new_password">新密码:</label>
                                        <input v-model="new_password" type="password" class="form-control" id="new_password" placeholder="请输入新密码">
                                    </div>
                                    <div class="mb-3">
                                        <label for="confirmedPassword" class="confirmedPassword">确认新密码:</label>
                                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="请确认新密码">
                                    </div>
                                    <div class="mb-3 text-center">
                                        <div class="error-message"> {{ error_message }}</div>
                                        <button type="submit" class="btn btn-outline-primary">更新密码</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> <!-- 右边上 -->
            </div> <!-- 右边 -->
        </div>
    </div>
</template>

<script>
import router from '@/router/index'
import { useStore } from 'vuex'
import { ref } from 'vue';
import $ from 'jquery'

export default {
    components: {
    },

    setup() {
        const store = useStore();
        let password = ref('');
        let new_password = ref('');
        let confirmedPassword = ref('');
        let error_message = ref('');

        const update_password = () => {  // 上传
            $.ajax({
                // url: "http://127.0.0.1:3000/api/user/center/update/password/",
                url: "https://app4435.acapp.acwing.com.cn/api/user/center/update/password/",
                type: "post",
                data: {
                    password: password.value,
                    new_password: new_password.value,
                    confirmedPassword: confirmedPassword.value,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if(resp.error_message === "success") {
                        password="";
                        new_password="";
                        confirmedPassword="";
                        router.push({name:"user_center_name_index"});
                    } else {
                        error_message.value = resp.error_message;
                    }
                }
            });
        }

        return {
            password,
            new_password,
            confirmedPassword,
            error_message,
            update_password,
        }
    }

}
</script>

<style scoped>
label.password {
    color:chocolate;
    font-weight: 600;
}
label.new_password {
    color:chocolate;
    font-weight: 600;
}
label.confirmedPassword {
    color:chocolate;
    font-weight: 600;
}
div.error-message {
    color: red;
}
</style>
