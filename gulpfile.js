const {watch, series, src, dest, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const environments = require('gulp-environments');
const minisite = require('gulp-minisite');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


let development = environments.development;
let production = environments.production;

var destination = production() ? './dist/' : './temp/';

function css() {
    return src('./src/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(development(sourcemaps.init()))
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .on('error', function (err) {
      notify().write(err);
      this.emit('end');
    })
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(concat('styles.min.css'))
    .pipe(development(sourcemaps.write('.')))
    .pipe(dest(destination + 'assets/css/'))
    .pipe(development(browserSync.stream()));
  }

  function js() {
    return src('./src/assets/js/*.js')
    .pipe(plumber())
    .pipe(development(sourcemaps.init()))
    .pipe(production(uglify()))
    .pipe(concat('main.min.js'))
    .pipe(development(sourcemaps.write('.')))
    .pipe(dest(destination + 'assets/js/'));
  }

  function index() {
    return src(['./src/**/*.yml', './src/**/*.md'])
    .pipe(minisite())
    .pipe(dest(destination));
  }

  function copy() {
    return src(['./src/assets/img/*', './src/assets/pdf/*'], {base: 'src/'})
      .pipe(dest(destination));
  }

  function browsersyncServe(cb){
    browserSync.init({
      server: {
        baseDir: './temp'
      }    
    });
    cb();
  }

  function browsersyncReload(cb){
    browserSync.reload();
    cb();
  }
  
  function watchTask() {
    watch('./src/assets/scss/styles.scss', css);
    watch('./src/assets/js/main.js', series(js, browsersyncReload));
    watch(['./template/**/*.html', './src/**/*.yml', './src/**/*.md'], series(index, browsersyncReload));
  };

  exports.build = series(
    copy,
    css,
    js,
    index,
  );

  exports.default = parallel(
    copy,
    css,
    js,
    index,
    browsersyncServe,
    watchTask
  );