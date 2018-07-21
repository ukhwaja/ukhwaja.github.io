let gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  scss = require('gulp-sass'),
  concat = require('gulp-concat'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify-es').default,
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'),
  sequence = require('gulp-sequence'),
  environments = require('gulp-environments'),
  development = environments.development,
  production = environments.production,
  browserSync = require('browser-sync').create();

var destination = production() ? './dist/' : './temp/';

gulp.task('scss', () => {
  gulp.src('./src/assets/scss/styles.scss')
    .pipe(plumber())
    .pipe(concat('styles.min.css'))
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
    .pipe(development(sourcemaps.write('.')))
    .pipe(gulp.dest(destination + 'assets/css/'))
    .pipe(development(browserSync.stream()));
  // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', () => {
  gulp.src('./src/assets/js/main.js')
    .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(development(sourcemaps.init()))
    .pipe(production(uglify()))
    .pipe(development(sourcemaps.write('.')))
    .pipe(gulp.dest(destination + 'assets/js/'));
  development() ? browserSync.reload() : '';
});

gulp.task('index', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest(destination));
  development() ? browserSync.reload() : '';
});

gulp.task('clean', () => {
  gulp.src(['./dist', './temp'], {
    read: false
  })
    .pipe(clean());
});

gulp.task('copy', () => {
  gulp.src(['./src/assets/img/*', './src/assets/pdf/*'], {
    base: 'src'
  })
    .pipe(gulp.dest(destination));
});

gulp.task('watch', ['build'], () => {

  browserSync.init({
    server: './temp',
    browser: 'C:/Program Files/Opera/launcher.exe'
    // browser: 'C:/Program Files/Mozilla Firefox/firefox.exe'
    // browser: 'microsoft-edge:http://localhost:3000'
  });

  gulp.watch('./src/assets/scss/styles.scss', ['scss']);
  gulp.watch('./src/assets/js/main.js', ['js']);
  gulp.watch('./src/index.html', ['index']);
});

gulp.task('build', (done) => {
  sequence('clean', ['copy', 'js', 'scss', 'index'])(done);
});