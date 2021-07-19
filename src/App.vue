<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),
  created() {
    //初始化：
    this.$store.commit('initUserInfo', window.sessionStorage);
    //管理员登录后，解决在管理页面下刷新页面导致奇怪的问题
    if (
      sessionStorage.getItem('user-sessionToken') &&
      /\/admin\//.test(window.location.href)
    ) {
      this.$store.commit('navView', '管理员');
    }
    // console.log("APP.vue")
    this.$douziAPI.init
      .getPage(sessionStorage.getItem('user-sessionToken') ? true : false)
      .then((r) => {
        let pages = [];
        let obj = {};
        for (let option of Object.values(r.PAGE)) {
          if (option.web_option == 'view_mode') {
            obj[option.web_option] = option.web_option_items
              .replace(/\s*/g, '')
              .split(',');
          } else {
            obj[option.web_option] = option.web_option_items;
          }
        }
        pages.push({ PAGE: obj });
        this.$store.commit('initPage', pages);
      })
      .catch((err) => {});
  },
};
</script>
<style>
body {
    margin: 0;
    padding: 0;
  }
.html{
  min-width:0;
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>
