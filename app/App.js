"use strict";
(function () {
    // Register Angular module
    var maQueue = angular.module('maQueue', ['chenExternalUIComponents', 'ngRoute']);

    maQueue.config([
        '$sceDelegateProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($sceDelegateProvider, $routeProvider, $locationProvider, $httpProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',

                //Note: There is a difference between * and **. Docs: https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
                'http://localhost:3000/**',
                'http://ux-components.chenmed.local/**',
                'https://ux-components-qa.chenmed.local/**',
                'https://localhost:3000/**',
                'https://ux-components.chenmed.local/**',
                'https://ux-components-qa.chenmed.local/**'
            ]);

            $routeProvider
                .when('/index', { controller: 'indexCtrl', templateUrl: '/landing.html' })
                .when('/maqueue', { template: "<maqueue-component></maqueue-component>" })
                .otherwise({ redirectTo: "/maqueue" })
            
            $locationProvider.html5Mode(true);
            //  $httpProvider.defaults.withCredentials = true;
        }
    ])

})();