import 'whatwg-fetch';
import Promise from 'promise/lib/es6-extensions';
import Config from '../config';

function binds(obj, ...methods) {
  methods.forEach((method) => {
    obj[method] = obj[method].bind(obj);
  });
}

/**
 * post data.
 *
 * @param {string} endPoint API end point
 * @param {Object} [data] post data
 * @return {Promise} Promise object
 */
function postJSON(endPoint, data) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = data ? JSON.stringify(data) : '';
    fetch(Config.api.url + endPoint, {
      model: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: body
    }).then(res => {
      if (res.status < 300) {
        return res.json();
      }
      if (res.status >= 300 && res.status < 400) {
        return res;
      }
      const e = new Error(res.statusText);
      e.status = res.status;
      e.body = res.body.json();
      e.response = res;
      throw e;
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

module.exports = {
  binds: binds,
  postJSON: postJSON,
};
