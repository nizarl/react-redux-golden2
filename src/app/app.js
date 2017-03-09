"use strict";
(function () {
    // Register Angular module
    var carePro = angular.module('carepro', ['chenExternalUIComponents', 'ngComponentRouter']);

    carePro.config([
        '$sceDelegateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($sceDelegateProvider, $routeProvider, $locationProvider, $httpProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',

                //Note: There is a difference between * and **. Docs: https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
                'http://localhost:3000/**',
                'https://localhost:3000/**',
                'https://ux-components-int.chenmed.local/**',
                'https://ux-components-qa.chenmed.local/**',
                'https://ux-components.chenmed.com/**'
            ]);

            carePro.value("$routerRootComponent", "careproComponent") 
            $locationProvider.html5Mode(true);
        }
    ])
})();