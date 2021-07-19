<template>
  <v-container style="margin-top:30px">
    <!-- 分类页面主体 -->
    <v-card height="90px">
      <v-row justify="center">
        <v-col
          ><v-card-text style="padding-top:0px">
            <v-text-field
              v-model="article_type_name"
              label="新建"
              required
            ></v-text-field> </v-card-text
        ></v-col>
        <v-col cols="2">
          <v-card-actions>
            <v-btn depressed color="primary" @click="createArticleType">
              新建
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              objectId
            </th>
            <th class="text-left">
              type_id
            </th>
            <th class="text-left">
              名称
            </th>
            <th class="text-left">
              创建时间
            </th>
            <th class="text-left">
              修改时间
            </th>
            <th class="text-left">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.objectId">
            <td>{{ item.objectId }}</td>
            <td>{{ item.article_type_id }}</td>
            <td>{{ item.article_type_name }}</td>
            <td>{{ item.createdAt.substring(0, 10) }}</td>
            <td>{{ item.updatedAt.substring(0, 10) }}</td>
            <td>
              <v-btn depressed :disabled=!item.article_type_id @click="openDialog(index)">
                操作
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- 分类页面主体 END-->
    <!-- 弹出的操作窗 -->
    <div class="text-center">
      <v-dialog
        persistent
        v-model="dialog"
        width="500"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            文章种类
          </v-card-title>

          <v-card-text v-show="!atchange && !atdel">
            <v-container>
              <v-form>
                <v-text-field
                  v-model="objectId"
                  label="objectId"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="article_type_name"
                  label="文章种类"
                  required
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-subtitle v-show="atchange" class="display-1">
            确认将类别<span class="danger red--text text--lighten-1">{{
              old_article_type_name
            }}</span
            >改为<span class="danger red--text text--lighten-1">{{
              article_type_name
            }}</span
            >?
          </v-card-subtitle>
          <v-card-subtitle v-show="atdel" class="display-1">
            确认将类别<span class="danger red--text text--lighten-1">{{
              old_article_type_name
            }}</span
            >删除?
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              
              @click="!atdel ? (atdel = !atdel) : deleteArticleType()"
            >
              删除
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="!atchange ? (atchange = !atchange) : modifyArticleType()"
              :disabled="old_article_type_name == article_type_name"
            >
              修改
            </v-btn>
            <v-btn color="primary" text @click="closeDialog()">
              取消
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- 弹出的操作窗 END-->
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      atchange: false,
      atdel: false,
      data: [],
      objectId: '',
      article_type_id: '',
      old_article_type_name: '',
      article_type_name: '',
    };
  },
  methods: {
    openDialog(id) {
      this.objectId = this.data[id].objectId;
      this.article_type_id=this.data[id].article_type_id;
      this.old_article_type_name = this.article_type_name = this.data[
        id
      ].article_type_name;
      this.dialog = true;
    },
    closeDialog() {
      this.objectId = this.article_type_id = this.old_article_type_name = this.article_type_name =
        '';
      this.atchange = this.atdel = this.dialog = false;
    },
    createArticleType() {
      let data={
        'article_type_name':this.article_type_name
      }
      this.$douziAPI.createArticleType(data).then(r=>{
        alert('创建成功')
        this.init();
        this.closeDialog()
      })
    },
    deleteArticleType() {
      // console.log(this.objectId)
      this.$douziAPI.delArticleTypeById(this.objectId,this.article_type_id).then(r=>{
        alert('删除成功')
         this.init();
        this.closeDialog()
      }).catch(e=>{
        alert('删除失败')
      })
    },
    modifyArticleType() {
      this.$douziAPI.editArticleType(this.objectId,{'article_type_name':this.article_type_name}).then(r=>{
        alert('修改成功')
        this.init();
        this.closeDialog()
      })
    },
    init() {
      this.$douziAPI.getArticleType().then((r) => {
        this.data = r.data.results;
        // console.log(r.data);
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
