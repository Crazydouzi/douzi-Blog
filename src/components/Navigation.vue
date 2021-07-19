<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    app
    clipped
    disable-resize-watcher
  >
    <v-list nav dense>
      <!-- 登录后可见-预览模式 -->
      <v-list-item link three-line v-show="isLogin">
        <v-list-item-action>
          <v-icon large color="primary">mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{
            $store.state.USER.username
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            $store.state.USER.email
          }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >预览模式：{{ $store.state.viewMode }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <!-- 登录后可见的-预览模式 END-->

      <!-- 导航栏内容 -->
      <div
        v-for="item in $store.state.NAV"
        :key="item.index"
        @mouseleave="item.active = false"
      >
        <!-- 
				根据数据渲染为群组标签或者单标签
			 -->
        <v-list-group
          v-if="'items' in item"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          two-line
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.index"
            @click="
              $router.push({
                name: subItem.routeName,
                params: { data: subItem.data },
              })
            "
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          link
          v-else
          two-line
          @click="$router.push({ name: item.routeName })"
        >
          <v-list-item-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <!-- 导航栏内容 END-->
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      iapp: false,
      isLogin: this.$store.state.isLogin,
      viewMode: this.$store.state.viewMode,
    };
  },
  methods: {
    init() {
      this.$douziAPI
        .getNav(this.isLogin, this.$store.state.viewMode)
        .then((r) => {
          let pages = [];
          let items = [];
          for (let option of Object.values(r.NAV)) {
            items.push(option);
          }
          pages.push({ NAV: items });
          this.$store.commit("initPage", pages);
          // console.log(pages);
        });
    },
  },
  mounted() {
    console.log("登录：" + this.isLogin + "预览模式" + this.viewMode);
    if (this.isLogin && this.viewMode == "管理员") {
       console.log('已登录')
      this.iapp = true;
    }
    this.init();
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  transition: all 0.6s ease-in-out;
}
.v-navigation-drawer:not(.on-hover) {
  opacity: 0.8;
}
.v-navigation-drawer:hover {
  opacity: 1;
}
</style>
