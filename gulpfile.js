//todo: cli switch componentVersion works need to enable
// debug: sudo node-debug $(which gulp) build --env=dev

var gulp = require('gulp');
var exec = require('child_process').exec;
var conf = require('./gulp/gulp.config.js')();
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
var env = argv.env;
var theme = argv.theme;
var componentVersion = conf.componentVersion; //todo use this for versioning uxcomponents. needs cli arg
var envOptions = ['dev', 'int', 'qa', 'prod'];
var themeOptions = ['legacy', 'cure'];
var fail = require('gulp-fail');
var exitCode = 0 //failure;
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var git = require('git-rev-sync');
var requireDir = require('require-dir');

requireDir('./gulp/tasks', {
  recurse: true
});

function envNotSetForBuild() {
  gutil.log(gutil.colors.red('ERROR!!!!!! gulp build error: --env switch was either not supplied or not set correctly.'));
  gutil.log(gutil.colors.red('ERROR!!!!!! valid options are: dev, int, qa, prod'));
  gutil.log(gutil.colors.red('ERROR!!!!!! example build command: \'sudo gulp build --env=dev\''));
  process.exit(exitCode);
}

function themeNotSet() {
  gutil.log(gutil.colors.red('ERROR!!!!!! gulp build error: --theme switch was either not supplied or not set correctly.'));
  gutil.log(gutil.colors.red('ERROR!!!!!! valid options are: legacy, cure'));
  gutil.log(gutil.colors.red('ERROR!!!!!! example build command: \'sudo gulp build --theme=cure\''));
  process.exit(exitCode);
}

gulp.task('clean-build-dir', function () {
  return gulp.src(conf.path.build_dir, {
      read: false
    })
    .pipe(clean())
});

gulp.task('start-carepro-server', function (cb) {
  gutil.log(gutil.colors.green('carepro web server started at http://localhost:9000'));
  exec('ws -p 9000 --compress -d ./build --spa index.html', function (err, stdout, stderr) {
    console.log(err);
  })
});

gulp.task('openbrowser', function () {
  setTimeout(function () {
    ifElse(isWindows,
      function () {
        opn(conf.path.openLocalUrl, {
          app: ['chrome', '--incognito']
        })
      },
      function () {
        opn(conf.path.openLocalUrl, {
          app: ['google chrome', '--incognito']
        })
      })
  }, 500)
});

gulp.task('bundle-min-js-carepro', function () {
  //todo: minify (uglify() this code)
  return streamqueue({
        objectMode: true
      },
      gulp.src(conf.path.app + '/app.js'),
      gulp.src(conf.path.app + '/carepro/carepro.component.js'),
      gulp.src(conf.path.app + '/templatescombined/carepro.tpls.min.js')

    )
    .pipe(concat(conf.path.bundleJS))
    .pipe(gulp.dest(conf.path.build_dir + conf.path.jsDest))
});

gulp.task('templatecache', function () {
  return gulp
    .src('./src/app/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(templateCache(
      conf.templateCache.fileName,
      conf.templateCache.options
    ))
    .pipe(gulp.dest(conf.path.app + conf.templateCache.dest))

});

gulp.task('build', function (callback) {
  var testEnv = (typeof env === "string" && !(envOptions.indexOf(env.toLowerCase()) === -1))
  var testTheme = (typeof theme === "string" && !(themeOptions.indexOf(theme.toLowerCase()) === -1))
  theme = (theme === undefined) ? "legacy" : theme;
  if (testEnv || (themeOptions.indexOf(theme.toLowerCase()) === -1)) {
    env = env.toLowerCase()
    gutil.log(gutil.colors.green('Environment is set to: ' + env));
    runSequence('clean-build-dir', 'replace-html-links', 'templatecache', 'bundle-min-js-carepro', 'copy-html-templates', 'copy-htaccess-file', 'copy-images', function () {
      gutil.log(gutil.colors.green('Build succeeded for: ' + env));
      gutil.log(gutil.colors.green('Theme is set to: ' + theme));
    })
  }
  if (!testEnv) {
    envNotSetForBuild();
  }
  if ((themeOptions.indexOf(theme.toLowerCase()) === -1)) {
    themeNotSet()
  }
});

gulp.task('default', ['start-carepro-server', 'openbrowser']);