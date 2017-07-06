const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const webpackStream = require('webpack-stream');

function cleanDist(done) {
  del(['packages/*/dist']).then(() => done());
}

function cleanTmp(done) {
  del(['tmp']).then(() => done());
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintSrc() {
  return lint('packages/*/[^node_modules]/**/*.js');
}

function lintTest() {
  return lint('./packages/*/test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.js');
}

function buildFile({src, dest, destFilename, library, externals}) {
  const inProduction = process.env.NODE_ENV === 'production';
  const plugins = [
    // In production set the 'NODE_ENV' value to 'production'.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(inProduction ? 'production' : 'development')
    }),

    // Minify the source code during production.
    inProduction && new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  ].filter(Boolean);

  const min = inProduction ? '.min' : '';

  const webpackConfig = {
    output: {
      filename: `${destFilename}${min}.js`,
      libraryTarget: 'umd',
      library
    },
    plugins,
    externals,
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    devtool: 'source-map'
  };

  return gulp.src(src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(dest));
}

function buildResourceful() {
  return buildFile({
    src: 'packages/resourceful-redux/src/index.js',
    dest: 'packages/resourceful-redux/dist',
    destFilename: 'resourceful-redux',
    library: 'resourcefulRedux'
  });
}

function buildPropTypes() {
  return buildFile({
    src: 'packages/resourceful-prop-types/src/index.js',
    dest: 'packages/resourceful-prop-types/dist',
    destFilename: 'index',
    library: 'resourcefulPropTypes',
    externals: {
      'prop-types': true
    }
  });
}

function buildActionCreators() {
  return buildFile({
    src: 'packages/resourceful-action-creators/src/index.js',
    dest: 'packages/resourceful-action-creators/dist',
    destFilename: 'index',
    library: 'resourcefulActionCreators',
    externals: {
      'resourceful-redux': true,
      xhr: true,
      querystringify: true
    }
  });
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Build the libs
gulp.task('buildResourceful', buildResourceful);
gulp.task('buildPropTypes', buildPropTypes);
gulp.task('buildActionCreators', buildActionCreators);
gulp.task('build', callback => {
  runSequence(
    'lint',
    ['buildResourceful', 'buildPropTypes', 'buildActionCreators'],
  callback);
});
