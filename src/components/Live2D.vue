<template>
  <div class="live2D">
    <div id="landlord">
      <canvas id="live2d" width="280" height="500" class="live2d"></canvas>
      <div id="change" @click="$router.push('/');" class="hide-button btn1">返回首页</div>
    </div>
  </div>
</template>
<style>
@import url(/css/live2d.css);
</style>
<script>
// import message from '@/plugins/live2d/js/message.js';

export default {
  data() {
    return {
      modelIndex: 0,
      modelList: [
        '/live2d/model/sagiri/sagiri.model.json',
      ],
    };
  },
  methods: {
    changeMode() {
      var canvas = document.getElementById('live2d');
      if (this.modelIndex < this.modelList.length) {
        canvas.height = 500;
        loadlive2d('live2d', this.modelList[this.modelIndex]);
        console.log(this.modelList[this.modelIndex]);  
        this.modelIndex++;
      } else {
        this.modelIndex=0;
        loadlive2d('live2d', this.modelList[this.modelIndex]);
        this.modelIndex++;
      }

    },
  },
  mounted() {
    this.changeMode();
  },
};
</script>
