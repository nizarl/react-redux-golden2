var gulp = require('gulp');
var config = require('../gulp.config.js')();
var fs = require('fs');
var compass = require('gulp-compass');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css'); //minify for CSS
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

function onError(err) {
    gutil.beep();
    console.log(err.toString())
    this.emit('end')
};

gulp.task('compass', function () {
    return gulp.src(config.app + '**/**/*.scss')
        .pipe(plumber(({
            errorHandler: onError
        })))
        .pipe(compass({
            css: config.app + config.aggregatorName + '/',
            sass: config.app + config.aggregatorName + '/',
            config_file: './config.rb',
        }))
});

gulp.task('copy-component-css', function () {
    return gulp.src(config.app + config.aggregatorName + '/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(renameFile(config.bundleCssMin()))
        .pipe(gulp.dest(config.build_dir + 'css/'))
        .pipe(cleanCSS())
        .pipe(renameFile(config.bundleCss()))
        .pipe(gulp.dest(config.build_dir + 'css/'));
});

gulp.task('deleteSourceCss', function () {
    return gulp.src(config.app + config.aggregatorName + '/' + config.aggregatorName + '.component.css', {
            read: false
        })
        .pipe(clean());
});

gulp.task('sequence-styles', function (callback) {
    return runSequence('compass', 'copy-component-css', 'deleteSourceCss', callback)
})

function renameFile(newFileName) {
    var stream = rename(newFileName);
    return stream;
}