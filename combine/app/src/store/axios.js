import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.headers.post['Content-Type'] = 'application/x-wwwf-form-urlencoded;charset=utf-8';

export default axios;