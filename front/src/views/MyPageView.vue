<template>
  <div class="my-page-container container">
    <MyPageProfile class="item"></MyPageProfile>
    <user-info class="item"></user-info>
    <share-daily class="item"></share-daily>
    <div class="post-list item">
      <div class="my-post-title">나의 포스트</div>
      <post-component
        class="post"
        v-for="post in myPosts"
        v-bind:key="post.id"
        v-bind:postData="post"
      ></post-component>
    </div>
  </div>
</template>

<script>
import MyPageProfile from "@/components/MyPageProfile.vue";
import UserInfo from "@/components/UserInfo.vue";
import ShareDaily from "@/components/common/ShareDaily.vue";
import PostComponent from "@/components/PostComponent.vue";

export default {
  components: {
    UserInfo,
    MyPageProfile,
    ShareDaily,
    PostComponent,
  },
  data() {
    return {
      myPosts: "",
    };
  },
  methods: {
    async getMyPosts() {
      try {
        await this.$store.dispatch("postStore/GET_MY_POSTS");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getMyPosts();
  },
  computed: {
    storeMyPosts() {
      return this.$store.state.postStore.myPosts;
    },
  },
  watch: {
    storeMyPosts(myPosts) {
      this.myPosts = myPosts;
    },
  },
};
</script>

<style scoped>
@import url(../assets/css/container.css);
.my-page-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max(300px);
  grid-template-areas:
    "profile profile profile"
    "info   daily-share daily-share"
    "posts posts posts";
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}

.item:nth-child(1) {
  grid-area: profile;
}

.item:nth-child(2) {
  grid-area: info;
  max-width: 100%;
}

.item:nth-child(3) {
  grid-area: daily-share;
}

.item:nth-child(4) {
  grid-row-gap: 15px;
  grid-area: posts;
}

.post-list {
  display: flex;
  flex-direction: column;
}
.my-post-title {
  font-size: 25px;
}
</style>
