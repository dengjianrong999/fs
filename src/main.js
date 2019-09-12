// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// /axios配置/
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios,
axios.defaults.headers.post['Contet-type'] = 'application/json'
	// Vue.prototype.baseurl = 'http://192.168.4.20:8080/bjsy-jdc/fs/',
	// Vue.prototype.baseurl = 'http://183.6.158.26:8090/bjsy-jdc/fs/',
	// Vue.prototype.baseurl = 'http://124.42.41.43:9001/bjsy-jdc/fs/',
	Vue.prototype.baseurl = 'http://117.121.97.120:9001/bjsy-jdc/fs/',
	// Vue.prototype.baseurl = 'http://192.168.10.198:8080/bjsy-jdc/fs/',
	// Vue.prototype.baseurl = 'http://192.168.3.209:8080/bjsy-jdc/fs/',
	axios.defaults.withCredentials = true,
	Vue.config.productionTip = false,
	// let changel = process.env.NODE_ENV ==='development'?'dev':process.env.channel || 'pro',
	// let apiUrl = {
	// 	dev:'http://192.168.4.20:8080/bjsy-jdc/fs/',
	// 	pro:'http://124.42.41.43:9001/bjsy-jdc/fs/',
	// }
    // let baseURL = process.env.NODE === 'production'?apiUrl[changel]:apiUrl.dev,
	//     Vue.prototype.changeData = function () { //changeData是函数名
	//         let select = document.querySelectorAll('.input-group select');
	//         select.addEventListener("focus", function () {
	//             this.parentNode.className = "input-group dropup";
	//         });
	// 		select.addEventListener("blur", function () {
	// 			this.parentNode.className = "input-group";
	// 		});
	//     }
	Vue.filter('time', function(value) {
		return value.slice(0, 10);
	});
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
