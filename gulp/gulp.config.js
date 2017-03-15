var git = require('git-rev-sync');
var argv = require('optimist').argv;
var env = argv.env;
var theme = argv.theme || "legacy";
var componentVersion = argv.componentVersion;
var environments = {
  dev: 'http://localhost:3000/',
  int: 'https://ux-components-int.chenmed.local/',
  qa: 'https://ux-components-qa.chenmed.local/',
  prod: 'https://ux-components.chenmed.local/'
};

module.exports = function () {
  var guid = require('guid');
  var newGuid = guid.create();
  var gitHash = git.short();
  var config = {
    componentVersion: componentVersion,
    templateCache: {
      fileName: 'carepro.tpls.min.js',
      options: {
        module: 'carepro',
        standAlone: false
      },
      dest: '/templatescombined/'
    },
    path: {
      src: './src/',
      app: './src/app/',
      appSource: 'src/app/**/*',
      appCssSource: 'src/css/*',
      build_dir: './build/',
      jsDest: 'js/',
      bundleJS: 'bundle.min.js',
      htmlTemplatesCarePro: '/careprotemplates/',
      openLocalUrl: 'http://localhost:9000/carepro'
    },
    careProJSBundle: {
      src: '/js/bundle.min.js?v=' + gitHash + '-' + newGuid
    },
    urlsJSInternal: {
      dev: environments[env] + 'js/ux-components-0.1.js?v=' + gitHash + '-' + newGuid,
      int: environments[env] + 'js/ux-components-0.1.js?v=' + gitHash + '-' + newGuid,
      qa: environments[env] + 'js/ux-components-0.1.js?v=' + gitHash + '-' + newGuid,
      prod: environments[env] + 'js/ux-components-0.1.js?v=' + gitHash + '-' + newGuid
    },
    urlsJSExternal: {
      dev: environments[env] + 'js/external-js-libraries.js?v=' + gitHash + '-' + newGuid,
      int: environments[env] + 'js/external-js-libraries.js?v=' + gitHash + '-' + newGuid,
      qa: environments[env] + 'js/external-js-libraries.js?v=' + gitHash + '-' + newGuid,
      prod: environments[env] + 'js/external-js-libraries.js?v=' + gitHash + '-' + newGuid
    },
    urlsCssInternal: {
      dev: environments[env] + 'css/internal/ux-internal.css?v=' + gitHash + '-' + newGuid,
      int: environments[env] + 'css/internal/ux-internal.css?v=' + gitHash + '-' + newGuid,
      qa: environments[env] + 'css/internal/ux-internal.css?v=' + gitHash + '-' + newGuid,
      prod: environments[env] + 'css/internal/ux-internal.css?v=' + gitHash + '-' + newGuid
    },
    urlsCssExternal: {
      dev: environments[env] + 'css/thirdparty/ux-thirdparty.css?v=' + gitHash + '-' + newGuid,
      int: environments[env] + 'css/thirdparty/ux-thirdparty.css?v=' + gitHash + '-' + newGuid,
      qa: environments[env] + 'css/thirdparty/ux-thirdparty.css?v=' + gitHash + '-' + newGuid,
      prod: environments[env] + 'css/thirdparty/ux-thirdparty.css?v=' + gitHash + '-' + newGuid
    },
    urlsTheme: {
      cure: environments[env] + 'css/themes/' + theme + '/' + theme + '-theme.css?v=' + gitHash + '-' + newGuid,
      legacy: environments[env] + 'css/themes/' + theme + '/' + theme + '-theme.css?v=' + gitHash + '-' + newGuid
    }
  }
  return config;
}