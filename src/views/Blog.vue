<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="listNAV">
        <v-sheet rounded="lg" style="position: sticky;top: 78px;">
          <v-list color="transparent">
            <v-list-item
              v-for="item in articleType"
              :key="item.objectId"
              link
              @click="
                $router.push({
                  name: 'Blog',
                  query: {
                    id: item.article_type_id,
                  },
                })
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-folder-open</v-icon>
              </v-list-item-icon>
              <!-- <v-icon>mdi-folder-open</v-icon> -->
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.article_type_name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>
            <v-list-item link color="grey lighten-4" @click="$router.back(-1)">
              <v-list-item-content>
                <v-list-item-title>
                  上一页
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col style="padding:0px">
        <!-- <v-sheet min-height="70vh" rounded="lg"> -->
        <v-expand-transition>
          <router-view></router-view>
        </v-expand-transition>
        <!-- </v-sheet> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      articleType: [],
    };
  },
  methods: {
    getArticleType() {
      this.$douziAPI.getArticleType().then((r) => {
        this.articleType = r.data.results;
      });
    },
    init() {
      this.getArticleType();
    },
  },

  mounted() {
    this.init();
  },
};
</script>
<style scoped>
@import url(/css/dashboard.css);
.listNAV {
  opacity: 0.92;
}
.NAVITEM {
  width: 272px;
}
@media screen and (max-width: 960px) {
  .listNAV {
    display: none;
  }
}
@media screen and (max-width: 1263px) {
  .NAVITEM {
    width: 200px;
  }
}

.box {
  width: 100%;
  height: 100%;
}
</style>
