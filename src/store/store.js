import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function HashsLinksUsers(data) {
  //getting text of a tweet and whenever it finds link or user or hash it wrap it around
  //span so it can change color in tweet component
  //I belive this is not best way to do this, but this is the only way I can think of to color
  //differently hashtags, and links, and users
  //styling is inside of index html, could not find a way to style it trough tweet component,
  //yea I know it is not good practice, but hey.. it works :D
  var newText = [];
  data.forEach(function(element) {
    var textSplit = element.text.split(" ");
    var newWord = [];
    textSplit.forEach(function(el) {
      if (el[0] == "#") {
        el = `<span class="hashtag-link-user">${el}</span>`;
      } else if (el[0] == "@") {
        el = `<span class="hashtag-link-user">${el}</span>`;
      } else if (el[0] == "h" && el[1] == "t" && el[2] == "t" && el[3] == "p") {
        el = `<span class="hashtag-link-user">${el}</span>`;
      }
      el += " ";
      newWord += el;
    });
    newText.push(newWord);
  });
  for (var i = 0; i < data.length; i++) {
    data[i].text = newText[i];
  }
  return data;
}

export default new Vuex.Store({
  state: {
    tweets: [],
    recent: [],
    popular: [],
    bbdev: []
  },
  getters: {
    getTweets: state => {
      return state.tweets;
    }
  },
  actions: {
    //get tweets that include some word
    getTweets: (context, endpoint) => {
      const formData = new FormData();
      let url = "";
      formData.append(endpoint.param, endpoint.value);
      url = endpoint.url;
      axios.post(url, formData).then(response => {
        context.commit("changeTweets", HashsLinksUsers(response.data.statuses));
      });
    },
    //get liked by or recent tweets by some user
    getLikedAndRecent: (context, endpoint) => {
      const formData = new FormData();
      let url = "";
      formData.append(endpoint.param, endpoint.value);
      url = endpoint.url;
      axios.post(url, formData).then(response => {
        if (
          response.data.length == undefined ||
          response.data[0].code == 34
          //because of error, canot read property image_url of undefined at tweet component
        ) {
          context.commit("changeTweets", []);
        } else {
          context.commit("changeTweets", HashsLinksUsers(response.data));
        }
      });
    },
    //get recent user searches when starting app
    getRecent: context => {
      axios
        .get("https://projects.blabladev.com/twitter/saved_searches/list")
        .then(response => {
          context.commit("changeRecent", response.data.reverse());
        });
    },
    //update recent searches when user search for something
    updateRecent: (context, newVal) => {
      context.commit("updateRecent", newVal);
    },
    //delete entry from recent searches
    deleteRecent: (context, id) => {
      context.commit("deleteRecent", id);
    },
    //get global trending tweets
    getTrends: context => {
      axios
        .get("https://projects.blabladev.com/twitter/trends/place")
        .then(response => {
          context.commit("changePopular", response.data[0].trends);
        });
    },
    //getting tweets that include word bbdev
    bbdev: context => {
      axios
        .post(
          "https://projects.blabladev.com/twitter/statuses/mentions_timeline"
        )
        .then(response => {
          context.commit("changebbdev", HashsLinksUsers(response.data));
        });
    },
    //updating recent searches
    changeRecent: (context, value) => {
      const formData = new FormData();
      formData.append("query", value);
      axios
        .post(
          "https://projects.blabladev.com/twitter/saved_searches/create",
          formData
        )
        .then(response => {
          context.dispatch("getRecent");
        });
    },
    //delete entry from user searches
    deleteSearch: (context, id) => {
      const formData = new FormData();
      formData.append("id", id);
      axios
        .post(
          "https://projects.blabladev.com/twitter/saved_searches/destroy",
          formData
        )
        .then(response => {
          //still does not work
        });
    }
  },
  //mutating the state
  mutations: {
    changeTweets: (state, data) => {
      state.tweets = data;
    },
    changeRecent: (state, data) => {
      state.recent = data.slice(0, 5);
    },
    changePopular: (state, data) => {
      state.popular = data.slice(0, 10);
    },
    changebbdev: (state, data) => {
      state.bbdev = data;
    },
    updateRecent: (state, newVal) => {
      state.recent.unshift({
        id: Math.floor(Math.random() * 100000),
        query: newVal
      });
      state.recent = state.recent.slice(0, 5);
    },
    deleteRecent: (state, id) => {
      state.recent = state.recent.filter(entry => {
        return entry.id != id;
      });
    }
  }
});
