import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

var env = process.env.NODE_ENV;
var config = {
  format: 'umd',
  moduleName: 'ResourcefulXhr',
  external: ['resourceful-redux', 'xhr'],
  globals: {
    'resourceful-redux': 'ResourcefulRedux',
    xhr: 'xhr'
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: ['node_modules/resourceful-redux/**'],
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
        warnings: false
      }
    })
  );
}

export default config;
