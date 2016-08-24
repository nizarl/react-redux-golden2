'use strict';

var MainModule = angular.module('MainModule', ['ngRoute', 'ngSanitize', 'chenExternalUIComponents']);

MainModule.factory('InterceptorFactory', ['$q', '$location', function ($q, $location) {
    return {
        response: function (response) {
            if (response.status === 401) {
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                $location.path('/');
            }
            return $q.reject(rejection);
        }
    }
}
]);

MainModule.config([
        '$routeProvider', '$httpProvider', '$sceDelegateProvider', function ($routeProvider, $httpProvider, $sceDelegateProvider) {
            $routeProvider
                .when('/index', { controller: '', templateUrl: 'views/index.html' })
                .when('/', { controller: 'LoginCtrl', templateUrl: 'views/login.html' })
                .when('/landing', { controller: 'landingCtrl', templateUrl: 'views/landing.html' })
                .otherwise('/', { controller: 'LoginCtrl', templateUrl: 'views/login.html' });

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                ////Note: There is a difference between * and **. Docs: https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
                'http://localhost:3000/**'
            ]);

            $httpProvider.interceptors.push('InterceptorFactory');
            $httpProvider.defaults.withCredentials = false;
        }
]);

