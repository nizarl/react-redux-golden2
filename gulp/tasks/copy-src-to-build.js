var gulp = require('gulp');
var config = require('../gulp.config.js')();

gulp.task('copy-htaccess-file', function () {
  return gulp.src([config.src_dir + '.htaccess'])
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-css-file', function () {
  return gulp.src([config.src_dir + '/css/' + config.aggregatorName + '.css'])
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-images', function () {
  return gulp.src([config.app + '/images/**'])
    .pipe(gulp.dest(config.build_dir + 'images'))
});