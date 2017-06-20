var gulp = require('gulp');
var config = require('../gulp.config.js')();
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');


function watch() {
    const watchers = [{
            name: 'HTML',
            path: [config.src_dir + '**/*.html'],
            tasks: ['build', 'refresh']
        },
        {
            name: 'JS',
            path: [config.src_dir + '**/*.js'],
            tasks: ['build', 'refresh']
        },
        {
            name: 'SASS',
            path: [config.src_dir + '**/*.scss'],
            tasks: ['sequence-styles', 'refresh']
        },
    ];

    return watchers.forEach(watcher => {
        gutil.log(gutil.colors.green("watching: " + watcher.name));
        livereload.listen();
        gulp.watch(watcher.path, watcher.tasks);
    });
}

gulp.task('start-watchers', function () {
    watch();
});

gulp.task("refresh", function () {
    setTimeout(function () {
        console.log('LiveReload is triggered');
        livereload.reload();
    }, 1000)

});