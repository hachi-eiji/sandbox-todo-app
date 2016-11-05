import 'whatwg-fetch';
import Promise from 'promise/lib/es6-extensions';
import Config from '../config';
import tokenStorage from './TokenStorage';

function binds(obj, ...methods) {
  methods.forEach((method) => {
    obj[method] = obj[method].bind(obj);
  });
}

function binds_starts_with(obj, methodNamePrefix) {
  const methodName = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    .filter(name => {
      return name.startsWith(methodNamePrefix);
    });
  binds(obj, ...methodName);
}

/**
 * post data.
 *
 * @param {string} endPoint API end point
 * @param {Object} [data] post data
 * @param {Object} [option] http option
 * @return {Promise} Promise object
 */
function postJSON(endPoint, data, option) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const token = tokenStorage.get();
    if (token) headers['X-CSRF-Token'] = token;
    const body = data ? JSON.stringify(data) : '';
    let _option = {
      method: 'POST',
      model: 'cors',
      credentials: 'include',
      headers: headers,
      body: body
    };
    Object.assign(_option, option);
    fetch(Config.api.url + endPoint, _option).then(res => {
      const p = res.json();
      return p.then(d => {
        if (d.token) tokenStorage.save(d.token);
        if (res.ok) {
          // 300番台は想定しない
          return p
        } else {
          // JSONなげて終わる
          return p.then(d => {
            const e = new Error(res.body ? res.body.message : res.statusText);
            e.status = res.status;
            e.body = d;
            e.response = res;
            throw e;
          });
        }
      });
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

/**
 * get
 * @param {string} endPoint
 * @param {Object} [data]
 */
function get(endPoint, data) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const token = tokenStorage.get();
    if (token) headers['X-CSRF-Token'] = token;

    let params = [];
    if (data) {
      Object.keys(data).forEach(k => {
        const v = encodeURIComponent(data[k]);
        params.push(`${k}=${v}`);
      });
    }
    const query = params.length ? '?' + params.join('&') : '';
    fetch(Config.api.url + endPoint + query, {
      model: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: headers,
    }).then(res => {
      const p = res.json();
      return p.then(d => {
        if (d.token) tokenStorage.save(d.token);
        if (res.ok) {
          // 300番台は想定しない
          return p
        } else {
          // JSONなげて終わる
          return p.then(d => {
            const e = new Error(res.body ? res.body.message : res.statusText);
            e.status = res.status;
            e.body = d;
            e.response = res;
            throw e;
          });
        }
      });
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

module.exports = {
  binds: binds,
  binds_starts_with: binds_starts_with,
  postJSON: postJSON,
  get: get
};
