import axios from 'axios';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

let baseUrl = "http://localhost:3000/v1/";
if(process.env.REACT_APP_ENV === "Production"){
   baseUrl = "http://15.185.57.60:3000/v1/";
}

const instance = axios.create({
   baseURL: baseUrl,
   validateStatus: function (status) {
      return status >= 200 && status < 300 || status === 302;
   },
});

instance.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.get('accessToken');

export default instance;