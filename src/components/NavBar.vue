<template>
  <!-- 颜色待定 rgba(37,47,42,0.86)  dark用来修改子特颜色风格
  -->
  <v-app-bar app clipped-left color="white">
    <v-app-bar-nav-icon
      v-if="this.$store.state.viewMode == '管理员'"
      @click="$store.commit('navDrawer')"
    ></v-app-bar-nav-icon>
     <v-tabs align-with-title v-else>
        <v-tabs-slider color="blue-grey darken-3"></v-tabs-slider>
        <v-tab
          v-for="item in items"
          :key="item.name"
          :to="item.path"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
    <!-- <v-toolbar-title>{{ $store.state.PAGE.title }}</v-toolbar-title> -->
    <!-- 将组件推到其容器的左右两侧 -->
    <v-spacer></v-spacer>
    <!-- 登录后显示预览模式 -->
    <v-overflow-btn
      v-model="viewMode"
      style="top:15px"
      v-if="$store.state.isLogin"
      class="my-2 col-2"
      :items="$store.state.PAGE.view_mode"
      :label="this.$store.state.viewMode"
      @change="change_view(viewMode)"
      target="#dropdown-example"
    ></v-overflow-btn>
    <!-- 登录后显示预览模式 END-->
    <!-- 非管理员模式导航 -->
    <!-- <template v-slot:extension v-if="this.$store.state.viewMode != '管理员'">
      <v-tabs align-with-title>
        <v-tabs-slider color="blue-grey darken-3"></v-tabs-slider>
        <v-tab
          v-for="item in items"
          :key="item.name"
          :to="item.path"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      
    </template> -->
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      viewMode: '',
      color:'white',
      items: [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about' },
        { name: 'BLOG', path: '/blog' },
      ],
    };
  },
  methods: {
    change_view(val) {
      this.$store.commit('navView', val);
      console.log(val);
      if (val == '管理员') {
        console.log('切换为管理员');
        this.$router.push({ name: 'Dashboard' });
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
<style>
</style>
