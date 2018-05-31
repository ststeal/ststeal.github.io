import Vue from 'vue';
import App from './App';

import message from './components/message';
import question from './components/question';
import resultScreen from './components/resultScreen';
import startScreen from './components/startScreen';

Vue.component('message',message);
Vue.component('question',question);
Vue.component('resultScreen',resultScreen);
Vue.component('startScreen',startScreen);

new Vue({
  el: '#app',
  render: h => h(App)
})
