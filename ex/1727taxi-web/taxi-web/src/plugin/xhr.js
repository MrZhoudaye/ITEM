import axios from 'axios';
// 添加请求拦截器
// 6a81e48305dc4e4c8d999586b1703277
var needToken = 'e75decbecf67414fbbac89fd40de738c';
axios.interceptors.request.use(function(config){
  config.headers['token'] = needToken || '';
  return config;
}, function (err) {
  return Promise.reject(error);
});
// 172.19.24.116:8088
export default axios;