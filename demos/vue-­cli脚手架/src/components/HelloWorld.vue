<template>
  <div class="hello">
    <h1> HelloWorld 组件 </h1>
    <h2> 我是传递过来的参数： {{ $route.params.hellomsg }}</h2>
    <h3>我是vuex中的数据： {{ this.$store.state.count }} </h3>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: green;
}
</style>
