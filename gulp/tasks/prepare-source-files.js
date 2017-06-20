var gulp = require('gulp');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var fs = require('fs');
var dirPath = 'src/app/';
var settings = JSON.parse(fs.readFileSync('./project.properties.json'));
var templateAggregatorDirName = 'aggregatorDirectory';
var aggregatorName = settings.aggregatorName;
var gutil = require('gulp-util');

var filesToRename = {
    html: {
        oldName: 'aggregator.component.html',
        newName: aggregatorName + '.component.html'
    },
    js: {
        oldName: 'aggregator.component.js',
        newName: aggregatorName + '.component.js'
    },
    scss: {
        oldName: 'aggregator.component.scss',
        newName: aggregatorName + '.component.scss'
    }
}
gulp.task('prepare-source-files', function () {
    renameSrcDirFiles(filesToRename, renameFiles)
})

function renameSrcDirFiles(files, renFiles) {
    if (fs.existsSync(dirPath + aggregatorName)) {
        return gutil.log(gutil.colors.red(aggregatorName + " directory already exists"));
    }
    return fs.rename(dirPath + templateAggregatorDirName, dirPath + aggregatorName, function (err) {
        if (err) {
            throw err;
        }
        if(typeof renFiles === 'function'){ renFiles(files);}
       
    });
}

function renameFiles(files) {
    Object.keys(files).forEach(function (key) {
        var file = files[key];
        createNewFile(file.newName, file.oldName, removeOldFile)
    });
}

function createNewFile(newFile, oldFile, deleteOldFile) {
    gulp.src(dirPath + aggregatorName + '/' + oldFile)
        .pipe(rename(newFile))
        .pipe(gulp.dest(dirPath + aggregatorName + '/'));
    if (typeof deleteOldFile === 'function') {
        deleteOldFile(oldFile);
    }
}

function removeOldFile(oldFile) {
    return gulp.src(dirPath + aggregatorName + '/' + oldFile, {
            read: false
        })
        .pipe(clean());
}