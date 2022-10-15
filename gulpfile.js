const { src, dest, task, watch, series, parallel } = require('gulp');

const { reload }    = require('browser-sync');
const sass          = require('gulp-sass')(require('node-sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const sassGlob      = require('gulp-sass-glob');
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const clean         = require('gulp-clean');
const px2rem        = require('gulp-smile-px2rem');
const gcmq          = require('gulp-group-css-media-queries');

task('clean', () => {
  return src('dist/**/*', { read: false })
    .pipe(clean());
});

task('server', () => {
  browserSync.init({
    server: {
    baseDir: './dist'
    }
  })
});

task('scripts', () => {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'src/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(reload({stream: true}))
});

task('styles', () => {
  return src('src/scss/**.scss')
    .pipe(concat('main.min.css'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem({dpr: 1,  rem: 16, one: false}))
    .pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version']
		}))
    .pipe(px2rem())
    .pipe(gcmq())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('dist/css'))
    .pipe(reload({stream: true}))
});

task('watching', () => {
  watch('src/js/**/*.js', series('scripts')).on('change', browserSync.reload);;
  watch('src/scss/**/*.scss', series('styles')).on('change', browserSync.reload);;
  watch('src/*.html', series('copy:html')).on('change', browserSync.reload);
  watch('src/video/*.*', series('copy:video')).on('change', browserSync.reload);
  watch('src/img/*.*', series('image')).on('change', browserSync.reload);
});

task('copy:html', () => {
  return src('src/*.html')
  .pipe(dest('dist/'))
  .pipe(reload({stream: true}))
});

task('copy:video', () => {
  return src('src/video/*.*')
  .pipe(dest('dist/video'))
  .pipe(reload({stream: true}))
});

task('image', () => {
  return src('src/img/*/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('dist/img'))
    .pipe(reload({stream: true}))
});

task('icons', () => {
  return src('src/icons/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('dist/icons'))
    .pipe(reload({stream: true}))
});

task('default', 
series(
 'clean',
 parallel('scripts', 'styles', 'copy:html', 'copy:video', 'image', 'icons'),
 parallel('watching', 'server')
 )
);