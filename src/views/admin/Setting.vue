<template>
  <v-card class="d-flex pa-2 dashboard_setting" outlined tile>
    <v-row no-gutters>
      <!-- 左侧 系统信息 -->
      <v-col class="col col-8">
        <v-row class="d-sm-none d-md-flex d-xs-none">
          <v-col>
            <v-card class="pa-2" outlined tile>
              <v-card-title class="card_title ">SETTING</v-card-title>
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
          <v-col v-for="setting in settings" :key="setting.title">
            <v-card class="pa-2" outlined tile>
              <v-card-title class="card_title">{{
                setting.title
              }}</v-card-title>
              <hr
                role="separator"
                aria-orientation="horizontal"
                class="v-divider theme--light"
              />
              <v-card-text
                class="text--primary"
                v-for="info in setting.infos"
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
              <v-card-title class="card_title ">修改密码</v-card-title>
              <v-card-text style="overflow: auto;max-height: 260px">
                <v-row>
                  <v-col cols="12">
                    RPWD
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
      settings: [
        {
          title: '基本信息',
          infos: [
            {
              title: '站点名称',
              data: 'Crazydouzi\'Blog',
            },
            {
              title: 'ip/域名地址',
              data: 'douzi.site',
            },
          ],
        },
        {
          title: '云盘',
          infos: [
            { title: '云盘URL', data: 'pan.makjust.com' },
            { title: '云盘状态', data: '已启用' },
          ],
        },
        {
          title: '访问限制',
          infos: [
            { title: '限制模式:', data: '仅登录' },
            { title: '开放注册:', data: 'N/A' },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
@import url(/css/dashboard.css);
</style>
