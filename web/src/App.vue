<template>
  <!-- NavBar 导航栏，全网站地址都用到 -->
  <NavBar />
  <!-- router-view 根据网址变化，具体变化规则由 router 文件夹下的 index.js 定义 -->
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  },
}
</script>

<style>
body {
  background-image: url("@/assets/images/preview1.jpg");
  background-size: cover;
}
</style>
