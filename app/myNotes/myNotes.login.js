'use strict'

var login_factory = angular.module('maQueue');

login_factory.factory('loginFactory',['$http', '$rootScope', function ($http, $rootScope) {
    var self = this;
    
    function signIn(userName, passWord) {
        var jsonData = { username: 'MD_TrainingEight', password: 'Training1' };
        $http.defaults.useXDomain = true;
        var loginUrl = 'http://localhost:28556' + '/authentication';
        return $http.post(loginUrl, jsonData, { withCredentials: true }).success(function (data, status) {

            return {
                data: data,
                status: status
            };

        }).catch(function (data, status, headers, config) {
          
            return {
                data: data,
                status: status,
                headers: headers,
                config: config
            };
        });
    }

    return {
        signIn: signIn
    };
}]);

