<template>
  <div id="app">
    <Header class="header"></Header>
    <div class="container">
      <div class="container__nav">
        <router-link to="/search" class="nav__link">Search tweets</router-link>
        <router-link to="/" class="nav__link">Liked by | blablaDev</router-link>
        <router-link to="/recent" class="nav__link">Recent tweets</router-link>
      </div>
      <div class="container__popular-bar">
        <p class="bar__title">#popularTweets</p>
        <br>
        <div class="container__popular-bar__content">
          <p
            class="content__entry"
            v-for="name in popular"
            v-bind:key="name.name"
            @click="popularClicked(name.name)"
          >{{ name.name }}</p>
        </div>
      </div>
      <div class="container__router-view">
        <router-view/>
      </div>
      <div class="container__recent-bar">
        <p class="bar__title">#recentSearches</p>
        <br>
        <div class="container__recent-bar__content">
          <p
            v-if="recent.length == 0"
            class="recent-bar__content__no-searches"
          >Search for something...</p>
          <div
            class="content__recent-entry content__entry"
            v-for="search in recent"
            v-bind:key="search.id"
          >
            <p
              @click.self="popularClicked(search.query)"
              class="recent-entry__entry"
            >{{ search.query }}</p>
            <button @click="deleteRecent(search.id)" class="recent-entry__button">Delete</button>
          </div>
        </div>
        <br>
        <div>
          <p class="bar__title">#blablaDev</p>
          <Tweet v-for="tweet in tweets" v-bind:key="tweet.id" v-bind:tweet="tweet"></Tweet>
        </div>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Tweet from "@/components/Tweet.vue";

export default {
  name: "home",
  components: {
    Header,
    Footer,
    Tweet
  },
  computed: {
    tweets() {
      return this.$store.state.bbdev;
    },
    recent() {
      return this.$store.state.recent;
    },
    popular() {
      return this.$store.state.popular;
    }
  },
  methods: {
    popularClicked(value) {
      this.$store.dispatch("updateRecent", value);
      this.$store.dispatch("getTweets", {
        url: "https://projects.blabladev.com/twitter/search/tweets",
        param: "q",
        value: value
      });
    },
    deleteRecent(id) {
      this.$store.dispatch("deleteRecent", id);
    }
  },
  created: function() {
    this.$store.dispatch("getRecent");
    this.$store.dispatch("getTrends");
    this.$store.dispatch("getLikedAndRecent", {
      url: "https://projects.blabladev.com/twitter/favorites/list",
      param: "screen_name",
      value: "blabladev"
    });
    this.$store.dispatch("bbdev");
  }
};
</script>


<style scoped>
@font-face {
  font-family: "Helvetica LT";
  src: url("/fonts/HelveticaNeueLTCom-Lt.ttf") format("ttf");
}
@font-face {
  font-family: "Helvetica Normal";
  font-style: normal;
  font-weight: lighter;
  src: url("/fonts/HelveticaNeueLTStd-Cn.woff") format("woff");
}
* {
  font-family: "Helvetica LT", "Helvetica Normal", Verdana;
  font-weight: normal;
  font-style: normal;
}
#app {
  background-color: #f5f5f5;
}

.container {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
}

.container > * {
  margin: 20px;
}

.container__nav {
  grid-column: 2/3;
  margin: 30px auto;
  grid-template-columns: 1fr 1fr 1fr;
  width: fit-content;
}
.bar__title {
  text-align: center;
  margin-bottom: -15px;
}

.container__popular-bar__content,
.container__recent-bar__content {
  border: 1px solid #000;
  background-color: #fff;
  padding: 20px;
}
.container__popular-bar {
  grid-column-start: 1;
}
.container__popular-bar,
.container__recent-bar {
  width: 90%;
}

.nav__link {
  padding: 20px;
  background-color: #0582ac;
  color: #fff;
  text-decoration: none;
  font-weight: normal;
}
.router-link-exact-active {
  background-color: #bfdfee;
  color: #838a8c;
}
.recent-bar__content__no-searches {
  color: rgb(0, 0, 255);
}
.content__recent-entry {
  position: relative;
}
.recent-entry__entry {
  display: inline;
}

.content__entry:hover {
  color: #0582ac;
  cursor: pointer;
}
.content__recent-entry > .recent-entry__button {
  position: absolute;
  right: 0;
  visibility: hidden;
}
.content__recent-entry:hover > .recent-entry__button {
  background-color: rgb(240, 90, 90);
  visibility: visible;
}
.content__entry {
  margin: 10px;
}

@media only screen and (max-width: 1000px) {
  .container__popular-bar,
  .container__recent-bar {
    display: none;
  }
  .nav__link {
    display: block;
    padding: 20px 100px;
  }
  .container__router-view {
    grid-column: 1/4;
  }
}
</style>
