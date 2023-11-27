<template>
  <div class="container">
    <ShareDaily></ShareDaily>
    <PostComponent
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:postData="post"
    ></PostComponent>
  </div>
</template>

<script>
import PostComponent from "../components/PostComponent.vue";
import ShareDaily from "../components/common/ShareDaily.vue";
export default {
  components: {
    ShareDaily,
    PostComponent,
  },
  data() {
    return {
      posts: "",
    };
  },
  methods: {
    async getPosts() {
      try {
        await this.$store.dispatch("postStore/LOAD_POSTS");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getPosts();
  },
  computed: {
    storePosts() {
      return this.$store.state.postStore.posts;
    },
  },
  watch: {
    storePosts(posts) {
      this.posts = posts.datas;
    },
  },
};
</script>

<style scoped>
@import url(../assets/css/container.css);
</style>
