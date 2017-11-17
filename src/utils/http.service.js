import axios from 'axios';
import 'babel-polyfill';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const at = cookies.get('at');

export function init() {

  function get(url) {
    return axios.get(url,{
      headers:{
        'Authorization': "Bearer " + at
      }
    });
  }

  function post(url, postData) {
    return axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      postBody: postData
    });
  }

  return {
    get: get,
    post: post
  };
}
