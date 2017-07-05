import xhr from 'xhr';
import qs from 'querystringify';

/* eslint no-param-reassign: 'off' */

// This is a small wrapper around `xhr`.
// It has two improvements:
//   1. Omit the `cb`, and a Promise will be returned instead
//   2. Pass a `qs` option for query string support

function buildUrl(uri, options) {
  if (options.qs) {
    uri += qs.stringify(options.qs, true);
  }
  return uri;
}

export default function request(uri, options, cb) {
  let params = {};
  // This handles the `xhr(options, cb)` syntax
  if (typeof uri === 'object') {
    params = uri;
  }
  // This handles the `xhr(uri, options, cb)` syntax
  else if (typeof uri === 'string' && typeof options === 'object') {
    params = options;
    params.uri = uri;
  }
  // This handles the `xhr(uri, cb)` syntax
  else {
    params.uri = uri;
  }

  // This adds support for the `qs` option
  const urlString = params.uri ? params.uri : params.url;
  params.uri = buildUrl(urlString, params);

  let callback;
  if (typeof options === 'function') {
    callback = options;
  } else if (typeof cb === 'function') {
    callback = cb;
  }

  // Return the `xhr` if a callback was passed. Otherwise, a Promise is returned
  if (callback) {
    return xhr(params, callback);
  } else {
    return new Promise((resolve, reject) => {
      xhr(params, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

// Also grabbed from xhr's source. This adds the convenience APIs;
// `xhr.get()`, for instance.
(['get', 'put', 'post', 'patch', 'head', 'delete']).forEach((method) => {
  request[method === 'delete' ? 'del' : method] = function(uri, options = {}, callback) {
    const opts = typeof uri === 'string' ? options : uri;
    opts.method = method.toUpperCase();
    return request(uri, opts, callback);
  };
});
