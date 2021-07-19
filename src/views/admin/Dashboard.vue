<template>
  <v-card class="d-flex pa-2 dashboard_gauge" tile>
    <v-row no-gutters>
      <!-- 左侧 系统信息 -->
      <v-col class="col col-8">
        <v-row class="d-sm-none d-md-flex d-xs-none">
          <v-col>
            <v-card class="pa-2" outlined tile>
              <v-card-title class="card_title">信息统计</v-card-title>
              <hr
                role="separator"
                aria-orientation="horizontal"
                class="v-divider theme--light"
              />

              <v-row no-gutters class="">
                <v-col class="col col-2">
                  <v-card-text>HI~欢迎回来</v-card-text>
                  <v-card-text class="text--primary">DASHBOARD</v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col v-for="gauge in gauges" :key="gauge.title">
            <v-card class="pa-2" outlined tile>
              <v-card-title class="card_title" :style="gauge.state">{{
                gauge.title
              }}</v-card-title>
              <hr
                role="separator"
                aria-orientation="horizontal"
                class="v-divider theme--light"
              />
              <v-card-text
                class="text--primary"
                v-for="info in gauge.infos"
                :key="info.title"
              >
                {{ info.title }}&nbsp;:
                <span>{{ info.data }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- 左侧 END-->
      <!-- 右侧 -->
      <v-col class="col col-4" style="">
        <v-row class="d-sm-none d-md-flex">
          <v-col class="col col-12">
            <v-card class="pa-2 dashboard_controller" outlined tile>
              <v-card-title class="card_title">日志</v-card-title>
              <v-card-text style="overflow: auto; max-height: 260px">
                <v-row>
                  <v-col cols="12" v-for="log in logs" :key="log.time">
                    [time:{{ log.time }}]:{{ log.logMsg }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- 右侧end -->
    </v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      gauges: [
        {
          title: "访问量",
          infos: [
            {
              title: "拒绝访问",
              data: "1",
            },
            {
              title: "页面访问量",
              data: "N/A",
            },
          ],
          state: "",
        },
        {
          title: "性能",
          infos: [
            { title: "慢查询次数", data: "14" },
            { title: "内存占用", data: "正常" },
          ],
          state: "borderColor:rgb(176,0,32)",
        },
        {
          title: "空间",
          infos: [
            { title: "已用空间:", data: "N/A" },
            { title: "剩余空间", data: "N/A" },
          ],
          state: "",
        },
      ],
      logs: [{ time: "20210331:18:08", logMsg: "在做了在做了：新建文件夹" }],
    };
  },
};
</script>
<style scoped>
/* @import url(/css/dashboard.css); */
</style>
