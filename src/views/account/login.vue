<template>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="cyan" dark flat>
                <v-toolbar-title>登录</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>找回密码(想淦蛤呢)</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-alert
                  v-if="isInvalid"
                  type="error"
                  color="error"
                  border="left"
                  outlined
                  dense
                  >{{ errInfo }}</v-alert
                >
                <v-form>
                  <v-text-field
                    label="email"
                    name="email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="[rules.required, rules.emailReg]"
                    @change="isInvalid = false"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="[rules.required, rules.pwdMin]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dologin">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>

export default {
  data() {
    return {
      password: '',
      isInvalid: false,
      email: '',
      errInfo: '',
      rules: {
        required: (value) => !!value || '此项不能为空',
        pwdMin: (v) => v.length >= 6 || '这应该是一个至少6位的密码',
        emailReg: (v) =>
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            v
          ) || '这不是一个正确的电子邮箱',
      },
    };
  },
  props: {
    source: String,
  },
  methods: {
    dologin() {
      this.$douziAPI
        .login(this.email, this.password)
        .then(r => {
          this.$store.dispatch("saveUserAsync", r.data);
          this.$store.commit('navView', '管理员')
          this.$route.query.redirect
            ? this.$router.push(this.$route.query.redirect)
            : this.$router.push("/admin/dashboard");
        })
        .catch((err) => {
          switch (err.response.data.code) {
            case 210:
              this.errInfo = '错误的邮箱或密码';
              break;
            default:
              this.errInfo = err.response.data.error;
              break;
          }
          this.isInvalid = true;
          this.password = '';
          this.email = '';
        });
    },
  },
  created() {
    //再次进入时判断用户是否登录，若登录直接跳转至控制台
    if (sessionStorage.getItem("user-sessionToken")) {
      this.$router.push("/admin/dashboard");
    }
  },
};
</script>
