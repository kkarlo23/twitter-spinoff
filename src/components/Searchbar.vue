<template>
  <div class="searchbar">
    <div class="searchbar__input">
      <img class="searchbar__input__image" src="/images/search.png">
      <input
        class="searchbar__input__box"
        type="text"
        placeholder="Search..."
        v-model="value"
        @keyup.enter="$emit('submitVal', value), value=''"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      value: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.searchbar__input {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid rgb(128, 128, 128);
  border-radius: 8px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 10fr;
  min-width: 175px;
}

.searchbar__input__box {
  border: none;
  width: 100%;
}

.searchbar__input__box:focus {
  border: none;
  outline: none;
}
.searchbar__input__image {
  height: 20px;
  padding: 0;
  margin: 0;
}
.searchbar {
  width: 100%;
}
</style>
