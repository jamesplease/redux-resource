import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

var env = process.env.NODE_ENV;
var config = {
  format: 'umd',
  moduleName: 'ReduxResourceActionCreators',
  external: ['redux-resource'],
  globals: {
    'redux-resource': 'ReduxResource'
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      }
    })
  );
}

export default config;
