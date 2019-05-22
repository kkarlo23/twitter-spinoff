<template>
  <div class="tweet" @click="redirect(tweet.id_str)">
    <div class="tweet__header"></div>
    <div class="tweet__content">
      <div class="tweet__content__imagebox">
        <img class="tweet__content__imagebox__image" :src="tweet.user.profile_image_url_https">
      </div>
      <div class="tweet__content__body">
        <h3 class="tweet__content__body__name">{{ tweet.user.name }}</h3>
        <p class="tweet__content__body__screen-name">@{{ tweet.user.screen_name }}</p>
        <br>
        <p class="tweet__content__body__text" v-html="tweet.text"></p>
        <br>
        <p class="tweet__content__body__date">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tweet",
  methods: {
    redirect(id) {
      window.open("https://twitter.com/statuses/" + id, "_blank");
    }
  },
  computed: {
    date() {
      var splitted = this.tweet.created_at.split(" ");
      var splitted_time = splitted[3].split(":");
      return (
        splitted_time[0] +
        ":" +
        splitted_time[1] +
        " - " +
        splitted[2] +
        " " +
        splitted[1] +
        " " +
        splitted[5]
      );
    }
  },
  props: ["tweet"]
};
</script>

<style scoped>
.tweet {
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px 0;
  min-width: 200px;
  font-size: 14px;
}

.tweet__header {
  height: 20px;
  background-color: #0582ac;
  border: 1px solid #000;
  border-radius: 5px 5px 0 0;
}
.tweet__content {
  background-color: #fff;
  border: 1px solid #000;
  display: grid;
  grid-template-columns: 1fr 10fr;
}
.tweet:hover {
  cursor: pointer;
}

.tweet__content__body__screen-name,
.tweet__content__body__date {
  color: #b6b6b6;
}

.tweet__content__body {
  padding: 10px;
}
.tweet__content__imagebox {
  padding: 3px;
}
.tweet__content__imagebox__image {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
