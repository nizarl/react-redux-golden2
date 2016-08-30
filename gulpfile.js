var gulp = require('gulp');
var exec = require('child_process').exec;
var config = require('./gulp.config.js')();
var opn = require('opn');


gulp.task('start-patsum-server', function (cb) {
    console.log("patient summary web server started at http://localhost:9000")
    exec('ws -p 9000 --spa index.html', function (err, stdout, stderr) {
    });
})

gulp.task('openbrowser', function(){
    opn('http://localhost:9000',{app: ['chrome', '--incognito']});
})
gulp.task('default', ['start-patsum-server','openbrowser']);  