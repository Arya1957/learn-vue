<template>
  <div class="hello">
    <h1> test  组件  </h1>
    <h3>我是vuex中的数据： {{ this.$store.state.count }} </h3>

  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: '你好呀，router'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: blue;
}
</style>
