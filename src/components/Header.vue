<template>
  <div class="header">
    <h1 class="header__title">Twitter Spinoff</h1>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
@font-face {
  font-family: "Helvetica Md";
  font-style: normal;
  font-weight: normal;
  src: url("/fonts/HelveticaNeueLTCom-Md.ttf") format("ttf");
}
/* downloaded similar font because that one have an error */
@font-face {
  font-family: "Helvetica Bold";
  font-style: normal;
  font-weight: normal;
  src: url("/fonts/HelveticaNeueLTStd-BdCn.woff") format("woff");
}

* {
  margin: 0;
  padding: 0;
}
.header {
  font-family: "Helvetica Md", "Helvetica Bold", Helvetica;
  font-size: 25px;
  background-image: url("/images/header.png");
  color: #fff;
  height: 180px;
  background-size: 100% 100%;
  display: block;
}
.header__title {
  font-weight: bolder;
  float: right;
  margin-top: 55px;
  margin-right: 5%;
}
</style>
