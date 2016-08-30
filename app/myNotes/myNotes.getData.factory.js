var module_factory = angular.module('maQueue');

module_factory.factory('myNotesPendingNotes', [
        '$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
            var baseUrl = 'http://localhost:28556';
            //self.myNotesAPI = 'https://mynotes-api.dev.chenmed.local/ehr/GxZ7-qtvPxzs5FD-75-F-g__/note/GDt8M2qmfkHNTqy6r05hBg__/medications'

            $http.defaults.useXDomain = true;

                return {
                    getPendingNotes: function (callback, errorCallback) {
                        $http.get(baseUrl + '/doctor/notes/pending',{withCredentials: true})
                        .success(callback)
                        .error(errorCallback);
                    },                    
                    baseUrl:baseUrl
                }
            }
   ])