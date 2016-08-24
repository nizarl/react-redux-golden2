

//"use strict";

MainModule.controller('LoginCtrl', [
    '$scope', '$rootScope', '$location', '$http', 'moduleService', function ($scope, $rootScope, $location, $http, moduleService) {

        var loginUrl = moduleService.baseUrl + '/authentication';

        $scope.username = '';
        $scope.password = '';

        $scope.SignIn = function (userName, passWord) {
            var jsonData = { username: userName, password: passWord };
            $http.defaults.useXDomain = true;
            $http.defaults.withCredentials = true;
            return $http.post(loginUrl, jsonData).success(function (data, status) {
                $location.path('/landing');
                return {
                    data: data,
                    status: status
                };

            }).error(function (data, status, headers, config) {
                $rootScope.login_status = { "status": status, "data": data };
                return {

                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                };
            });
        }
    }
]);
