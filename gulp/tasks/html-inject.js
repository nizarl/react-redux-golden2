var gulp = require('gulp');
var conf = require('../gulp.config.js')();
var argv = require('optimist').argv;
var env = argv.env;
var theme = argv.theme;
var htmlreplace = require('gulp-html-replace');

gulp.task('replace-html-links', function () {
  replaceHTMLUrls(env);
});

function getEnvUrls() {
  var urlJSInternal = '';
  var urlJSExternal = '';
  var urlStyleInternal = '';
  var urlStyleExternal = '';
  var careProJSBundle = '';
  var urlTheme = '';

  careProJSBundle = conf.careProJSBundle.src;
  //internal/external urls for js/css
  switch (env) {

    case 'dev':
      urlJSInternal = conf.urlsJSInternal.dev;
      urlJSExternal = conf.urlsJSExternal.dev;
      urlStyleInternal = conf.urlsCssInternal.dev;
      urlStyleExternal = conf.urlsCssExternal.dev
      break;
    case 'int':
      urlJSInternal = conf.urlsJSInternal.int;
      urlJSExternal = conf.urlsJSExternal.int;
      urlStyleInternal = conf.urlsCssInternal.int;
      urlStyleExternal = conf.urlsCssExternal.int
      break;
    case 'qa':
      urlJSInternal = conf.urlsJSInternal.qa;
      urlJSExternal = conf.urlsJSExternal.qa;
      urlStyleInternal = conf.urlsCssInternal.qa;
      urlStyleExternal = conf.urlsCssExternal.qa
      break;
    case 'prod':
      urlJSInternal = conf.urlsJSInternal.prod;
      urlJSExternal = conf.urlsJSExternal.prod;
      urlStyleInternal = conf.urlsCssInternal.prod;
      urlStyleExternal = conf.urlsCssExternal.prod
      break;
  }

  //theme:
  switch (theme) {
    case "cure":
      urlTheme = conf.urlsTheme.cure;
      break;
    case "legacy":
      urlTheme = conf.urlsTheme.legacy;
      break;
    default:
       urlTheme = conf.urlsTheme.legacy; 
  }

  return {
    careProJSBundle: careProJSBundle,
    urlJSInternal: urlJSInternal,
    urlJSExternal: urlJSExternal,
    urlStyleInternal: urlStyleInternal,
    urlStyleExternal: urlStyleExternal,
    urlTheme: urlTheme
  }
}

function transformURLs(urlcareProJsBundle, urlJavascriptInternal, urlJavascriptExternal, urlStyleInternal, urlStyleExternal, urlStyleTheme, env) {
  return gulp.src([conf.path.src + 'index.html'])
    .pipe(
      htmlreplace({
        careProJSBundle: {
          src: urlcareProJsBundle,
          tpl: '<!-- Care Pro APP JS INJECTED  -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        jsInternal: {
          src: urlJavascriptInternal,
          tpl: '<!-- CHEN CDN JS Internal INJECTED environment: ' + env + ' -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        jsExternal: {
          src: urlJavascriptExternal,
          tpl: '<!-- CHEN CDN JS External INJECTED environment: ' + env + ' -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        cssInternal: {
          src: urlStyleInternal,
          tpl: '<!-- CHEN CDN CSS INTERNAL INJECTED environment: ' + env + ' -->' +
            '\n' + '\t' +

            '<link rel="stylesheet" href="%s" />'
        },
        cssExternal: {
          src: urlStyleExternal,
          tpl: '<!-- CHEN CDN CSS External INJECTED environment: ' + env + ' -->' +
            '\n' + '\t' +

            '<link rel="stylesheet" href="%s" />'
        },
        cssTheme: {
          src: urlStyleTheme,
          tpl: '<!-- CHEN CDN Style Theme INJECTED environment: ' + env + ' -->' +
            '\n' + '\t' +

            '<link rel="stylesheet" href="%s" />'
        }
      })
    )
    .pipe(gulp.dest('build/'))
}

function replaceHTMLUrls(env) {
  var getEnvURL = getEnvUrls();
  transformURLs(getEnvURL.careProJSBundle, getEnvURL.urlJSInternal, getEnvURL.urlJSExternal, getEnvURL.urlStyleInternal, getEnvURL.urlStyleExternal, getEnvURL.urlTheme, env)
}