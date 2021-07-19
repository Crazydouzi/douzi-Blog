<template>
  <div >
    <v-card  v-bind:class="classObject" class="d-flex flex-column mb-6" outlined tile :loading="loading">
      <v-responsive>
        <iframe
          class="iframe"
          :src="url"
          frameborder="no"
          scrolling="hidden"
          width="100%"
          height="100%"
          seamless
          border="0"
          @load="ifshowValue"
        ></iframe>
      </v-responsive>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classObject:[{
        'v-card-top':$store.state.isLogin
      }],
      lasturl:'',
      loading: '',
    };
  },
  watch: {
   'url':function(){
      this.loading=true
    }
  },
  props:['url'],
  methods: {
    ifshowValue() {
      this.loading = false;
    },
  },
};
</script>
<style scoped>
  .v-card-top{
    margin-top: calc( 5vh + .325rem);
  }
  .iframe{
    height: calc(91vh);
  }
</style>