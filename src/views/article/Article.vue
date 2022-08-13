<template>
  <v-card class="d-flex pa-2 mavon_editor" outlined rounded="lg">
    <!-- markdown编辑器 -->
    <mavon-editor
      boxShadowStyle=""
      style="width:100%"
      :editable="false"
      v-model="value"
      :toolbarsFlag="false"
      defaultOpen="preview"
      previewBackground=#00000
      :subfield="false"
      class="edit_class"
    />
    <!-- markdown编辑器 END -->
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      objectId: '',
    };
  },

  methods: {
    init() {
      this.objectId = this.$route.params.data;
      this.$douziAPI.getArticleById(this.objectId).then((r) => {
        this.value = r.data.blog_raw;
        console.log(r.data)
      });
    },
  },

  mounted() {
    this.init();
  },
  watch: {
    '$route.params.data': {
      handler: function(newval) {
        this.init();
      },
    },
  },
};
</script>
<style scoped>
@import url(/css/dashboard.css);
.edit_class{
  background-color: rgba(255,255,255,0);
}
.mavon_editor {
  background-color: rgba(255,255,255,0.92);
  min-width: 100%;
  margin-top: 10px;
  z-index: 0;
}
.v-note-wrapper img{
  min-width: 360px;
  max-width: 800px;
}
</style>
