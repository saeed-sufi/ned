var gulp = require('gulp'),
  watch = require('gulp-watch'),
  browsersync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  cssImport = require('postcss-import'),
  autoprefixer = require('autoprefixer'),
  mixins = require('postcss-mixins'),
  cssVars = require('postcss-simple-vars'),
  nested = require('postcss-nested');

gulp.task('html', function() {
  browsersync.reload();
})

gulp.task('styles', function() {

  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssVars, autoprefixer, nested]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles/'))
    .pipe(browsersync.stream());
})

gulp.task('watch',['styles'], function() {

  browsersync.init({
    notify: false,
    server: {
      baseDir: "./app"
    }
  }) 

  watch('./app/index.html', function() {
    gulp.start('html');
  })

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  })

})