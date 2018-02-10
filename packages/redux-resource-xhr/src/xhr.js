import xhr from 'xhr';
import qs from 'querystringify';

/* eslint no-param-reassign: 'off' */

// This is a small wrapper around `xhr`.
// It has two improvements:
//   1. Omit the `cb`, and a Promise will be returned instead
//   2. Pass a `qs` option for query string support

function buildUrl(uri, options) {
  let qsStringify = options.qsStringify || qs.stringify;
  if (options.qs) {
    let stringified = qsStringify(options.qs, options.qsStringifyOptions);
    if (stringified[0] !== '?') {
      stringified = `?${stringified}`;
    }
    uri += stringified;
  }
  return uri;
}

export default function request(uri, options, cb) {
  let params = {};
  // This handles the `xhr(options, cb)` syntax
  if (typeof uri === 'object') {
    params = uri;
  } else if (typeof uri === 'string' && typeof options === 'object') {
    // This handles the `xhr(uri, options, cb)` syntax
    params = options;
    params.uri = uri;
  } else {
    // This handles the `xhr(uri, cb)` syntax
    params.uri = uri;
  }

  // This adds support for the `qs` option
  const urlString = params.uri ? params.uri : params.url;
  params.uri = buildUrl(urlString, params);

  if (params.url) {
    delete params.url;
  }

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
// Supported signatures:
//
// xhr[method](url, callback)
// xhr[method](url, options, callback)
// xhr[method](options, callback)
//
['get', 'put', 'post', 'patch', 'head', 'delete'].forEach(method => {
  request[method === 'delete' ? 'del' : method] = function(
    uri,
    options,
    callback
  ) {
    let opts, cb;
    if (typeof uri === 'object') {
      opts = uri;
      cb = options;
    } else if (typeof options === 'object') {
      opts = Object.assign({ uri }, options);
      cb = callback;
    } else if (typeof uri === 'string' && typeof options !== 'object') {
      opts = { uri };
      cb = options;
    }
    opts.method = method.toUpperCase();
    return request(opts, cb);
  };
});
