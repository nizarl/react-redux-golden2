import axios from 'axios';
import 'babel-polyfill';

export function init() {
  function get (url){
   return axios.get(url);
 }
 
  function post (url,postData){
    return axios.post(url, {
      headers:{
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
