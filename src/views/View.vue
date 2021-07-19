<template>
  <div class="">
    <NavBar />
    <!-- 登录+管理员预览下才会出现侧边导航 -->
    <Navigation
      v-if="
        isRouterAside &&
          this.$store.state.isLogin &&
          this.$store.state.viewMode == '管理员'
      "
    />
    <v-main class="grey lighten-3 app" style="min-height: calc(100vh - 24px);">
      <router-view></router-view>
    </v-main>
    <!-- <Live2D v-if="
          this.$store.state.viewMode != '管理员'
      "></Live2D> -->
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Live2D from '@/components/Live2D'
export default {
  components: {
    NavBar,
    Footer,
    Navigation,
    Live2D,
  },
  data() {
    return {
      isRouterAside: true,
    };
  },
  methods: {
    reloadNAV() {
      this.isRouterAside = false;
      this.$nextTick(() => {
        this.isRouterAside = true;
      });
    },
  },
  provide() {
    return {
      reloadNAV: this.reloadNAV,
    };
  },
};
</script>
<style>
.app {
  /* background-image: url("https://pixiv.cat/80981871-4.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
a {
  list-style: none;
  text-decoration: none;
  color: red;
}
.router-link-active {
  text-decoration: none;
}
.box {
  margin-bottom: 30px;
  /* position: absolute; */
  /* width: 100%; */
  /* height: 100%; */
}
</style>
