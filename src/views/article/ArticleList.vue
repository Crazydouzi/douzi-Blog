<template>
  <div>
    <v-card
      rounded="lg"
      class="mx-auto article-list"
      outlined
      v-for="(item, index) in articleData"
      :key="index"
    >
      <v-card-title style="color:#000">
        {{ item.title }}
      </v-card-title>
      <v-card-text>
        <p>{{ item.createdAt.substring(0, 10) }}</p>
        <div class="text--primary">
          {{ item.blog_article }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="
            $router.push({ name: 'Article', params: { data: item.objectId } })
          "
        >
          Read More
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reveal: false,
      value: '',
      typeId: -1,
      articleData: [],
    };
  },

  methods: {
    init() {
      this.typeId = Number(this.$route.query.id);
      if (this.typeId || this.typeId == 0) {
        console.log(this.typeId);
        this.$douziAPI.getArticleByTypeId(this.typeId).then((r) => {
          this.articleData = r.data.results;
        });
      } else {
        this.$douziAPI.getAllArticle().then((r) => {
          this.articleData = r.data.results;
        });
      }
    },
  },
  watch: {
    '$route.query.id': {
      handler: function(newval) {
        this.init();
      },
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.article-list {
  opacity: 0.92;
  max-height: 220px;
  overflow: hidden;
  margin: 10px;
}
.article-list .article-text {
  max-height: 170px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
