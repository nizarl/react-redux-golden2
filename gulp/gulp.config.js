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
var defaultEnv = "dev";
var env = argv.env || defaultEnv;

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
    bundleCssMin: function(){
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
    //aggregator
    aggregatorJSBundle: function () {
      return '/js/' + this.bundleJS() + '?v=' + gitHash + '-' + newGuid
    },
    aggregatorCSSBundle: function () {
      return '/css/' + this.bundleCss() + '?v=' + gitHash + '-' + newGuid
    },
    //todo: point dev to localhost; (i.e.: gulp build)
    // componentUrl: function(){
    //   return componentUrls[env];
    // },

    //shared internal js
    urlsJSSharedComponentLib: function () {
      //use minified on QA and PROD
      var min = (env === 'qa' || env === 'prod') ? ".min" : '';
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/js/uic-core/' + sharedJS.sharedLibName + min + '.js?v=' + gitHash + '-' + newGuid
    },
    //shared vendor js
    urlsJSExternal: function () {
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/js/uic-thirdparty/' + thirdPartyJS.name + '.js?v=' + gitHash + '-' + newGuid
    },
    //shared internal css
    urlsCssInternal: function () {
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/css/uic-core/' + sharedCss.sharedLibName + '.css?v=' + gitHash + '-' + newGuid
    },
    //shared vendor css
    urlsCssExternal: function () {
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + sharedTopLevel.sharedLibName + '/' + sharedTopLevel.sharedLibName + '-' + sharedTopLevel.sharedLibVersion + '/css/uic-thirdparty/' + thirdPartyCss.thirdPartyCssLibName + '.css?v=' + gitHash + '-' + newGuid
    },

    //required components
    urlsJSRequiredComponent: function (componentName, componentDirectory, componentNameAndVersion) {
      //use minified on QA and PROD
      var min = (env === 'qa' || env === 'prod') ? ".min" : '';
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + 'components/' + componentName + '/' + componentDirectory + '/' + componentNameAndVersion + min + '.js?v=' + gitHash + '-' + newGuid
    },
    urlsCssRequiredComponent: function (componentName, componentDirectory, componentNameAndVersion) {
      //use minified on QA and PROD
      var min = (env === 'qa' || env === 'prod') ? ".min" : '';
      var compUrl = (env == 'dev') ? componentUrls["int"] : componentUrls[env];
      return compUrl + 'components/' + componentName + '/' + componentDirectory + '/' + componentNameAndVersion + min + '.css?v=' + gitHash + '-' + newGuid
    }
  }
  return config;
}