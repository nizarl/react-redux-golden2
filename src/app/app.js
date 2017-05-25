    // Register Angular module
    angular.module('carePro')
        .value('$routerRootComponent', 'careproComponent')
        .config(['whiteListCORSUrls', '$sceDelegateProvider', '$locationProvider', '$httpProvider',
            function (whiteListCORSUrls, $sceDelegateProvider, $locationProvider, $httpProvider) {
                $sceDelegateProvider.resourceUrlWhitelist(whiteListCORSUrls);
                $locationProvider.html5Mode(true);
            }
        ])
        .run(['$cookieStore', 'aggregatorUrlMatchString', 'aggregatorVersion', function ($cookieStore, aggregatorUrlMatchString, aggregatorVersion) {
            //$cookieStore is temporary until contextual data is solved (i.e. JWT)
            //components use cookies to map urls to business services
            $cookieStore.put('appName', aggregatorUrlMatchString);
            $cookieStore.put('appVersion', aggregatorVersion);
        }]);