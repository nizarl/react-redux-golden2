var gulp = require('gulp');
var config = require('../gulp.config.js')();
var fs = require('fs');
var argv = require('optimist').argv;
var buildEnv = config.buildEnv;
var htmlreplace = require('gulp-html-replace');
var settings = JSON.parse(fs.readFileSync('./project.properties.json'));
var sharedComponentLib = settings.sharedComponentJs;
var requiredComponents = settings.requiredComponents;

gulp.task('replace-html-links', function () {
  replaceHTMLUrls(buildEnv);
});

function getRequiredComponentUrls(requiredComponents) {
  var requiredComponentsJsName = requiredComponents.map(function (item) {
    var componentName = item.componentName;
    var componentDirectory = item.componentName + "-" + item.componentVersion;
    var componentNameAndVersion = item.componentName + ".component-" + item.componentVersion;
    return config.urlsJSRequiredComponent(componentName, componentDirectory, componentNameAndVersion);
  })
  var requiredComponentsCSSName = requiredComponents.map(function (item) {
    var componentName = item.componentName;
    var componentDirectory = item.componentName + "-" + item.componentVersion;
    var componentNameAndVersion = item.componentName + ".component-" + item.componentVersion;
    return config.urlsCssRequiredComponent(componentName, componentDirectory, componentNameAndVersion);
  })

  return {
    Js: requiredComponentsJsName,
    Css: requiredComponentsCSSName
  }
}

function getSharedComponentJsUrl(jsShared) {
  return config.urlsJSSharedComponentLib();
}

function getSharedComponentCssUrl(jsShared) {
  return config.urlsCssSharedComponentLib();
}

function getEnvUrls() {
  var urlJSExternal = '';
  var urlStyleInternal = '';
  var urlStyleExternal = '';

  var aggregatorJSBundle = config.aggregatorJSBundle();
  var aggregatorCSSBundle = config.aggregatorCSSBundle();
  urlJSExternal = config.urlsJSExternal();
  urlStyleInternal = config.urlsCssInternal();
  urlStyleExternal = config.urlsCssExternal();

  return {
    aggJSBundle: aggregatorJSBundle,
    aggregatorCSSBundle: aggregatorCSSBundle,
    urlJSExternal: urlJSExternal,
    urlStyleInternal: urlStyleInternal,
    urlStyleExternal: urlStyleExternal
  }
}

function transformURLs(inject) {
  return gulp.src([config.src_dir + 'index.html'])
    .pipe(
      htmlreplace({
        aggJSBundle: {
          src: inject.aggJSBundle,
          tpl: '<!-- AGGREGATOR APP JS INJECTED -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        aggregatorCSSBundle: {
          src: inject.aggregatorCSSBundle,
          tpl: '<!-- AGGREGATOR APP CSS INJECTED -->' +
            '\n' + '\t' +
            '<link rel="stylesheet" href="%s" />'
        },
        jsThirdParty: {
          src: inject.urlJSExternal,
          tpl: '<!-- CHEN Hosted JS Third-Party INJECTED -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        cssInternal: {
          src: inject.urlStyleInternal,
          tpl: '<!-- CHEN Hosted CSS Internal INJECTED -->' +
            '\n' + '\t' +
            '<link rel="stylesheet" href="%s" />'
        },
        cssExternal: {
          src: inject.urlStyleExternal,
          tpl: '<!-- CHEN Hosted CSS Third-Party INJECTED -->' +
            '\n' + '\t' +

            '<link rel="stylesheet" href="%s" />'
        },
        jsSharedComponentLib: {
          src: inject.sharedJsUrl,
          tpl: '<!-- CHEN Hosted JS Component\'s Shared Library INJECTED -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>'
        },
        jsRequiredComponents: {
          src: inject.requiredComponentUrls.Js,
          tpl: '<!-- CHEN Hosted JS Required Components INJECTED -->' +
            '\n' + '\t' +
            '<script src="%s" type="text/javascript" charset="utf-8"></script>' +
            '\n' + '\t'
        },
        cssRequiredComponents: {
          src: inject.requiredComponentUrls.Css,
          tpl: '<!-- CHEN Hosted Assets CSS Required Components INJECTED -->' +
            '\n' + '\t' +
            '<link rel="stylesheet" href="%s" />'
        },
      })
    )
    .pipe(gulp.dest(config.build_dir))
}


function replaceHTMLUrls(env) {
  var envUrls = getEnvUrls();
  var sharedComponentJsUrl = getSharedComponentJsUrl(sharedComponentLib);
  var requiredComponentUrls = getRequiredComponentUrls(requiredComponents);


  var transformUrls = {
    aggJSBundle: envUrls.aggJSBundle,
    aggregatorCSSBundle: envUrls.aggregatorCSSBundle,
    urlJSExternal: envUrls.urlJSExternal,
    urlStyleInternal: envUrls.urlStyleInternal,
    urlStyleExternal: envUrls.urlStyleExternal,
    sharedJsUrl: sharedComponentJsUrl,
    requiredComponentUrls: requiredComponentUrls
  }

  transformURLs(transformUrls)
}