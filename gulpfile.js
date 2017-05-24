// debug: sudo node-debug $(which gulp) build --env=dev

var gulp = require('gulp');
var exec = require('child_process').exec;
var config = require('./gulp/gulp.config.js')();
var opn = require('opn');
var isWindows = /^win/.test(require('os').platform());
var ifElse = require('gulp-if-else');
var argv = require('optimist').argv;
var runSequence = require('run-sequence');
var streamqueue = require('streamqueue');
var concat = require('gulp-concat'); //bundle
var uglify = require('gulp-uglify'); //minify
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var fail = require('gulp-fail');
var exitCode = 0 //failure;
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var git = require('git-rev-sync');
var requireDir = require('require-dir');
var ngConstant = require('gulp-ng-constant-fork');
var sourcemaps = require('gulp-sourcemaps');

requireDir('./gulp/tasks', {
  recurse: true
});


gulp.task('clean-build-dir', function () {
  return gulp.src(config.build_dir, {
      read: false
    })
    .pipe(clean())
});

gulp.task('start-agg-server', function (cb) {
  gutil.log(gutil.colors.green('patient summary web server started at http://localhost:9000'));
  exec('ws -p 9000 --compress -d ./dist --spa index.html', function (err, stdout, stderr) {
    console.log(err);
  })
  
});

gulp.task('openbrowser', function () {
  setTimeout(function () {
    ifElse(isWindows,
      function () {
        opn(config.openLocalUrl, {
          app: ['chrome', '--incognito']
        })
      },
      function () {
        opn(config.openLocalUrl, {
          app: ['/Applications/Google\ Chrome.app', '--incognito']
        })
      })
  }, 500)
});

gulp.task('bundle-min-js-aggregator', function () {
  var stream = streamqueue({
    objectMode: true
  });
  stream.queue(createModuleDefinition())
  stream.queue(gulp.src(config.app + '/app.js')),
    stream.queue(gulp.src(config.app + config.aggregatorName + '/' + config.aggregatorName + '.component.js')),
    stream.queue(createComponentTemplateCache(config))
  return stream.done()
    .pipe(concat(config.bundleJS()))
    .pipe(gulp.dest(config.build_dir + config.jsDest))
});

gulp.task('build', function (callback) {
  var testEnv = ((typeof config.buildEnv == 'string')) && (!(config.envOptions.indexOf(config.buildEnv) == -1));

  if (testEnv) {
    gutil.log(gutil.colors.green('Environment is set to: ' + config.buildEnv));
    return runSequence('clean-build-dir', 'replace-html-links', 'bundle-min-js-aggregator', 'copy-htaccess-file', 'copy-images', 'sequence-styles', function () {
      gutil.log(gutil.colors.green('Build succeeded for: ' + config.buildEnv));
      callback();
    })
  }
  if (!testEnv) {
    switchNotSet("--env", config.envOptions, "\'sudo gulp build --env=dev\'");
  }
});

gulp.task('default', ['start-watchers','start-agg-server', 'openbrowser']);

function switchNotSet(switchName, validOptions, validBuildCommand) {
  gutil.log(gutil.colors.red('ERROR!!!!!! gulp build error: ' + switchName + ' switch was either not supplied or not set correctly.'));
  gutil.log(gutil.colors.red('ERROR!!!!!! valid options: ' + validOptions));
  gutil.log(gutil.colors.red('ERROR!!!!!! example build command: ' + validBuildCommand));
  process.exit(exitCode);
}

function createModuleDefinition() {
  return gulp.src(config.aggregatorConstants)
    .pipe(ngConstant({
      name: config.aggregatorModuleName
    }))
}

function createComponentTemplateCache(config) {
  return gulp
    .src(config.app + config.aggregatorName + '/*.html')
    .pipe(templateCache(
      config.templateCache.fileName,
      config.templateCache.options
    ))
}