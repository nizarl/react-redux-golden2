import axios from 'axios';
import 'babel-polyfill';

export function init() {
  async function get(url) {
    const json = await axios.get(url);
    return json;
  }

  async function post(url,postData) {
    const json = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
    },
      postBody: postData
    });
    return json;
  }

  return {
    get: get,
    post: post
  };
}
