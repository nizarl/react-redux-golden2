var gulp = require('gulp');
var conf = require('../gulp.config.js')();

gulp.task('copy-htaccess-file', function () {
  gulp.src([conf.path.src + '.htaccess'])
    .pipe(gulp.dest('build/'))
});

gulp.task('copy-css-file', function () {
  gulp.src([conf.path.src + '/css/carepro.css'])
    .pipe(gulp.dest('build/'))
});

gulp.task('copy-html-templates', function () {
  gulp.src([conf.path.src + '/landing.html'])
    .pipe(gulp.dest(conf.path.build_dir + conf.path.htmlTemplatesCarePro))
  gulp.src([conf.path.app + '/navmenu/navmenu.component.html'])
    .pipe(gulp.dest(conf.path.build_dir + conf.path.htmlTemplatesCarePro))
  gulp.src([conf.path.app + '/carepro/carepro.component.html'])
    .pipe(gulp.dest(conf.path.build_dir + conf.path.htmlTemplatesCarePro))
});

gulp.task('copy-images', function () {
  gulp.src([conf.path.app + '/images/**'])
    .pipe(gulp.dest('build/images'))
});
