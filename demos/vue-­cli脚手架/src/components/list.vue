<template>
  <div>
    <h2>路由参数传递</h2>
    <h3>用 name  和 params 传递： {name: 'xx',params: { }}</h3>
    <router-link :to = "{name: 'helloworld',params: {hellomsg: '你好呀'}}"> 点我给 HelloWorld 组件传递参数 </router-link>
    <hr>
        <h3>我是vuex中的数据： {{ this.$store.state.count }} </h3>


  </div>
</template>
<script>
export default {
  name: "list"
};
</script>

