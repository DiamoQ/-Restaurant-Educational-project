const { src, dest, task, watch, series, parallel } = require('gulp');

const { reload } = require('browser-sync'),
  sass = require('gulp-sass')(require('node-sass')),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync').create(),
  sassGlob = require('gulp-sass-glob'),
  uglify = require('gulp-uglify-es').default,
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  clean = require('gulp-clean'),
  px2rem = require('gulp-smile-px2rem'),
  gcmq = require('gulp-group-css-media-queries'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  webpackConfig = require('./webpack.config');

task('clean', () => {
  return src('dist/**/*', { read: false })
    .pipe(clean());
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

// task('scripts', () => {
//   return src([
//     'node_modules/jquery/dist/jquery.js',
//     // 'src/js/*.js'
//   ])
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(dest('dist/js'))
//     .pipe(reload({ stream: true }))
// });

task('scripts', () => {
  src('src/js/*.js')
  .pipe(webpackStream(webpackConfig), webpack)
  // .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(reload({ stream: true }));
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
    .pipe(reload({stream: true}));
});

task('watching', () => {
  watch('src/js/modules/*.js', series('scripts')).on('change', browserSync.reload);
  watch('src/scss/**/*.scss', series('styles')).on('change', browserSync.reload);
  watch('src/*.html', series('copy:html')).on('change', browserSync.reload);
  watch('src/video/*.*', series('copy:video')).on('change', browserSync.reload);
  watch('src/img/*.*', series('image')).on('change', browserSync.reload);
});

task('copy:html', () => {
  return src('src/*.html')
    .pipe(dest('dist/'))
    .pipe(reload({ stream: true }))
});

// task('copy:dbjson', () => {
//   return src('src/db.json')
//   .pipe(dest('dist/'))
//   .pipe(reload({stream: true}))
// });


task('copy:video', () => {
  return src('src/video/*.*')
    .pipe(dest('dist/video'))
    .pipe(reload({ stream: true }))
});

task('image', () => {
  return src('src/img/*/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/img'))
    .pipe(reload({ stream: true }))
});

task('icons', () => {
  return src('src/icons/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/icons'))
    .pipe(reload({ stream: true }))
});

task('default',
  series(
    'clean',
    parallel('styles', 'copy:html', 'copy:video', 'image', 'icons'),
    parallel('scripts', 'watching', 'server')
  )
);