MainModule.factory('moduleService', [
        '$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
            var baseUrl = 'https://mynotes-api.dev.chenmed.local';
            //var noteId;
            //var patientId;
            $http.defaults.useXDomain = true;

                return {
                    getPendingNotes: function (callback, errorCallback) {
                        $http.get(baseUrl + '/doctor/notes/pending').success(callback).error(errorCallback);
                    },
                    baseUrl:baseUrl
                    //noteId:noteId,
                    //patientId:patientId

                }
            }
   ])