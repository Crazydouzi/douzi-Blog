<template>
  <v-container style="margin-top:30px">
    <v-card height="90px">
      <v-row justify="center">
        <v-col no-gutters
          ><v-card-text style="padding-top:0px">
            <v-text-field
              v-model="title"
              label="新建"
              required
            ></v-text-field> </v-card-text
        ></v-col>
        <v-col cols="2">
          <v-card-actions>
            <v-btn
              depressed
              color="primary"
              @click="createArticle(title)"
              :disabled="!title.length"
            >
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
              类别
            </th>
            <th class="text-left">
              标题
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
            <td>{{ $store.state.articleType[item.article_type_id] }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.createdAt.substring(0, 10) }}</td>
            <td>{{ item.updatedAt.substring(0, 10) }}</td>
            <td>
              <v-btn depressed @click="editArticle(index)">
                编辑
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- 弹出的操作窗 -->
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template> </template>
        <v-card>
          <v-toolbar dark>
            <v-btn icon dark @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>文章编辑</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="$save()">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-row align="center">
            <v-col cols="3">
              <v-subheader>
                分类
              </v-subheader>
            </v-col>

            <v-col>
              <!-- :hint="`${select.state}, ${select.abbr}`" -->
              <v-select
                v-model="article_type_id"
                :items="articleType"
                item-text="article_type_name"
                item-value="article_type_id"
                label="请选择分类"
                single-line
              ></v-select>
            </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col cols="1">
              <v-btn depressed color="primary" @click="$save()">
                保存
              </v-btn>
            </v-col>
            <v-col cols="1">
              <v-btn depressed color="error" @click="deleteArticle">
                删除
              </v-btn>
            </v-col>
          </v-row>
          <v-card class="d-flex pa-2 " style="height:89vh" outlined tile>
            <!-- markdown编辑器 -->
            <mavon-editor
              ref="md"
              @imgAdd="$imgAdd"
              class="mavon_editor"
              v-model="blog_raw"
              @save="$save(1)"
            />
            <!-- markdown编辑器 END -->
          </v-card>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- 弹出的操作窗 END-->
  </v-container>
</template>

<script>
var AV = require('leancloud-storage');
var { Query, User } = AV;
export default {
  name: 'editor',
  data() {
    return {
      thumbnailURL: '',
      img_file: {},
      dialog: false,
      data: [],
      objectId: '',
      title: '',
      blog_article: '',
      blog_raw: '',
      article_type_id: 0,
      articleType: [],
      AVData: {
        appId: 'Ksbznav33FsKM20tu3IJq7Hn-gzGzoHsz',
        appKey: 'bTHubAyjhxuoe9Jq56BNtpqd',
        serverURL: 'https://api.blog.douzi.site',
      },
    };
  },
  inject: ['reloadNAV'],
  created() {
    AV.init(this.AVData);
  },
  mounted() {
    this.init();
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      //清空数据
      // this.objectId = '新建';
      this.objectId = this.title = this.blog_article = this.blog_raw = '';
      this.article_type_id = 0;
      this.dialog = false;
    },
    getArticleType() {
      this.$douziAPI.getArticleType().then((r) => {
        this.articleType = r.data.results;
      });
    },
    createArticle(title) {
      this.objectId = '';
      let time = new Date();
      this.blog_raw =
        `::: hljs-center\n\n# ${title}\n` +
        time.getFullYear() +
        '-' +
        (time.getMonth() + 1) +
        '-' +
        time.getDate() +
        '\n:::\n';
      this.openDialog();
      console.log(time.getMonth() + 1);
    },
    editArticle(index) {
      this.title = this.data[index].title;
      this.blog_raw = this.data[index].blog_raw;
      this.article_type_id = this.data[index].article_type_id;
      this.objectId = this.data[index].objectId;
      this.openDialog();
    },
    deleteArticle() {
      if (confirm('确认删除?') == true) {
        console.log(this.objectId);
        this.$douziAPI.delArticleById(this.objectId).then((r) => {
          alert('已删除！');
          this.closeDialog();
          this.init();
        });
      } else {
        return false;
      }
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadArticle() {
      this.title = /^#\s+[A-Za-z0-9\u4e00-\u9fa5\u0021-\u002F\u0b7\u2014-\u2026\u3001-\u3011\uff01-\uff1f]*/
        .exec(this.blog_raw.replace('::: hljs-center\n\n', ''))[0]
        .replace('# ', '');
      //首先找到正文开始标记，截取标识符到结尾，然后去掉回车符
      try {
        this.blog_article = this.blog_raw
          .substring(
            /\s:::\s/.exec(this.blog_raw).index + 4,
            this.blog_raw.length
          )
          .replace(/[\r\n]/g, ' ')
          .replace(/!\[(.*?)\]\((.*?)\)/gi, '');
        console.log(this.blog_article);
      } catch (error) {
        this.blog_article = '在写了在写了.....';
      }

      let data = {
        title: this.title,
        blog_raw: this.blog_raw,
        blog_article: this.blog_article,
        article_type_id: this.article_type_id,
        thumbnail_url: this.thumbnailURL,
      };
      // console.log(data);

      if (this.objectId == '') {
        this.$douziAPI
          .addArticle(data)
          .then((r) => {
            console.log(r.data);
            alert('新建成功！');
            this.closeDialog();
            this.init();
          })
          .catch((err) => {
            alert('新建失败' + err);
            console.log('新建失败');
            console.log(err);
          });
      } else {
        this.$douziAPI
          .editArticle(this.objectId, data)
          .then((r) => {
            alert('更新成功！');
            this.closeDialog();
            this.init();
            // console.log(r.data);
          })
          .catch((err) => {
            alert('更新失败' + err);
            console.log('更新失败');
            console.log(err);
          });
      }
    },
    /** 
     保存时先调用save上传图片
      图片上传完后替换原地址
     ，替换完后调用uploadArticle上传文章
    */
    $save(_img = 1) {
      let img_length = Object.keys(this.img_file).length;
      console.log(img_length);
      if (img_length == undefined || img_length == 0) {
        this.uploadArticle();
        return 0;
      } else {
        console.log(_img);
        console.log(this.img_file[_img]);
        const file = new AV.File(
          this.img_file[_img].lastModified + this.img_file[_img]._name,
          this.img_file[_img]
        );
        file.save().then(
          (file) => {
            if (_img == 1) {
              this.thumbnailURL = file.thumbnailURL(100, 200);
            }
            console.log(file.url());
            this.$refs.md.$img2Url(_img, file.url());
            if (_img >= img_length) {
              //上传全文
              this.uploadArticle();
              return 0;
            } else {
              _img++;
              this.$save(_img);
            }
          },
          (error) => {
            console.log(error);
          }
        );
        console.log(file);
      }
    },
    init() {
      this.getArticleType();
      this.$douziAPI.getAllArticle().then((r) => {
        this.data = r.data.results;

        // console.log(r.data);
      });
    },
  },
};
</script>
<style scoped>
@import url(/css/dashboard.css);
.mavon_editor {
  min-width: 100%;
  z-index: 0;
}
</style>
