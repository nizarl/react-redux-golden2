var fs = require('fs');
var git = require('git-rev-sync');
var argv = require('optimist').argv;
var settings = JSON.parse(fs.readFileSync('./project.properties.json'));
var componentUrls = settings.componentUrls;
var envOptions = settings.envOptions;
var sharedTopLevel = settings.sharedLibTopLevel;
var sharedJS = settings.sharedComponentJs;
var thirdPartyJS = settings.thirdPartyJS;
var sharedCss = settings.sharedComponentCss;
var thirdPartyCss = settings.thirdPartyCss;
var aggregatorModuleName = settings.aggregatorModuleName;
var aggregatorName = settings.aggregatorName;
var defaultEnv = "cdn";
var env = argv.env || defaultEnv;
var defaultUseMin = "false";
var useMin = argv.usemin || defaultUseMin;
var min = (useMin === "true") ? ".min" : ''; //use minified files for CDN hosted

module.exports = function () {
  var guid = require('guid');
  var newGuid = guid.create();
  var gitHash = git.short();
  var config = {
    envOptions: envOptions,
    aggregatorConstants: './project.properties.json',
    aggregatorModuleName: aggregatorModuleName,
    aggregatorName: aggregatorName,
    buildEnv: env,
    src_dir: "./src/",
    app: './src/app/',
    appSource: 'src/app/**/*',
    appCssSource: 'src/css/*',
    build_dir: './dist/',
    jsDest: 'js/',
    bundleJS: function () {
      return this.aggregatorName + '.bundle.js'
    },
    bundleCss: function () {
      return this.aggregatorName + '.css'
    },
    bundleCssMin: function () {
      return this.aggregatorName + '.min.css'
    },

    openLocalUrl: 'http://localhost:9000/',
    templateCache: {
      fileName: 'aggregator.tpls.min.js',
      options: {
        module: aggregatorModuleName,
        standAlone: false
      },
      dest: '/templatescombined/'
    },

    getComponentUrl: function () {
      return componentUrls[env];
    },
    //aggregator js
    aggregatorJSBundle: function () {
      return '/js/' + this.bundleJS() + '?v=' + gitHash + '-' + newGuid
    },
    //aggregator css
    aggregatorCSSBundle: function () {
      return '/css/' + this.bundleCss() + '?v=' + gitHash + '-' + newGuid
    },
    //shared VENDOR JS
    urlsJSExternal: function () {
      return this.getComponentUrl() + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/js/uic-thirdparty/' + thirdPartyJS.name + '.js?v=' + gitHash + '-' + newGuid
    },
    //shared VENDOR CSS
    urlsCssExternal: function () {
      return this.getComponentUrl() + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/css/uic-thirdparty/' + thirdPartyCss.thirdPartyCssLibName + '.css?v=' + gitHash + '-' + newGuid
    },
    //shared INTERNAL JS
    urlsJSSharedComponentLib: function () {
      return this.getComponentUrl() + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/js/uic-core/' + sharedJS.sharedLibName + min + '.js?v=' + gitHash + '-' + newGuid
    },
    //shared INTERNAL CSS
    urlsCssInternal: function () {
      return this.getComponentUrl() + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/css/uic-core/' + sharedCss.sharedLibName + min + '.css?v=' + gitHash + '-' + newGuid
    },
    //required components JS
    urlsJSRequiredComponent: function (componentName, componentDirectory, componentNameAndVersion) {
      return this.getComponentUrl() + 'components/' + componentName + '/' + componentDirectory + '/' + componentNameAndVersion + min + '.js?v=' + gitHash + '-' + newGuid
    },
    //required components CSS
    urlsCssRequiredComponent: function (componentName, componentDirectory, componentNameAndVersion) {
      return this.getComponentUrl() + 'components/' + componentName + '/' + componentDirectory + '/' + componentNameAndVersion + min + '.css?v=' + gitHash + '-' + newGuid
    }
  }
  return config;
}