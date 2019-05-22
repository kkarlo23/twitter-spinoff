<template>
  <div class="content">
    <p class="content__description">Here you can search for tweets that contains your keyword</p>
    <Searchbar class="content__searchbar" @submitVal="submit"></Searchbar>
    <div class="content__no-searches" v-if="tweets.length < 1">
      <p>No tweets to show</p>
    </div>
    <Tweet
      class="content__tweet"
      v-for="tweet in tweets"
      v-bind:key="tweet.id"
      v-bind:tweet="tweet"
    ></Tweet>
  </div>
</template>

<script>
import Tweet from "@/components/Tweet.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  components: {
    Searchbar,
    Tweet
  },
  methods: {
    submit(value) {
      this.$store.dispatch("updateRecent", value);
      this.$store.dispatch("getTweets", {
        url: "https://projects.blabladev.com/twitter/search/tweets",
        param: "q",
        value: value
      });
    }
  },
  computed: {
    tweets() {
      return this.$store.getters.getTweets;
    }
  }
};
</script>


<style scoped>
.content {
  margin: auto;
  width: 60%;
}
.content__description,
.content__no-searches {
  text-align: center;
}

.content__no-searches {
  color: rgb(0, 0, 255);
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
</style>

