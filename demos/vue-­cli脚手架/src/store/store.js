import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
     count : 0
 }
})
//直接通过this.$sore.state.XXX拿到全局状态