import router from 'vue-router'
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld'
import test from '../components/test'

Vue.use(router)

// 配置路由
export default new router({
  routes: [
    {
    name: 'helloworld',
    path: '/hello/:hellomsg', //指定要跳转的路径
    component: HelloWorld //指定要跳转的组件
  },
  {
    name: 'test',
    path: '/test/:testmsg',
    component: test
  }
]
})