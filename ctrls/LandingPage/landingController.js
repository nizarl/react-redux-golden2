MainModule.controller('landingCtrl', [
        '$scope', '$rootScope', '$window', 'moduleService','$http', function ($scope, $rootScope, $window, moduleService, $http) {

            $scope.PendingNotes = [];
            $scope.CompletedNotes = [];

            //For NoteType----------------------------------------------------
            $scope.selectedNoteType = '';

            //headService.getNoteTypes(function (data) {
            //    $scope.avaliableNoteTypes = data;
            //});

            //$scope.PostNoteType = function (_noteId, _patientId, selected) {
            //    headService.postNoteType(_noteId, _patientId, selected, function (response) {
            //    });
            //}
            //For NoteType----------------------------------------------------

            $scope.selectAllChanged = function () {
                $scope.PendingNotes.forEach(function (item) {
                    //Notes from today will not be checked
                    //Notes before today will be checked
                    var diff = moment().diff(item.VisitDate, "days");
                    if (diff > 0) {
                        item.checked = $scope.selectedAllStatus;
                    }
                });
            }

            $scope.useSeletedNote = function (noteId, patientId) {
                $rootScope.noteId = noteId;
                $rootScope.patientId = patientId;
                $window.location.href = '#/index'
                $http.defaults.withCredentials = false;
            }

            $http.defaults.withCredentials = true;
            moduleService.getPendingNotes(function (data) {
                $scope.PendingNotes = data;
                $scope.PendingNotescount = data.length;
                //$scope.PendingNotes.forEach(function (item) {
                //    item.VisitDate = moment(item.VisitDate).tz('America/New_York').format('YYYY-MM-DD');
                //});
            }, function () { });

            function refreshCompletedNotes() {
                var date = $scope.selectedCompletedDate ? $scope.selectedCompletedDate : new Date();

                //headService.getCompletedNotesForADate(date, function (data) {
                //    $scope.CompletedNotes = data;
                //    $scope.CompletedNotescount = data.length;
                //});
            }

            //partnerStatusService.getDoctorId(function (id) {
            //    window.partnerstatus.initialize('#partnerWidget', partnerStatusService.getBaseUrl(), partnerStatusService.getAppId(), id);
            //});


            $scope.changeNote = function (noteid) {
                if (noteid !== note.Id) {
                    window.location.href = noteid;
                }
            };

            $scope.selectedNotes = function () {
                var selected = $scope.PendingNotes.filter(function (item) {
                    return item.checked;
                });
                return selected;
            };

            $scope.cancelNotes = function () {
                var selected = $scope.selectedNotes();
                var idsToSend = [];
                if (!selected.length)
                    return;
                else {
                    for (var i = 0; i < selected.length; i++) {
                        idsToSend.push(selected[i].Id);
                    };
                    //cancel single note
                    if (idsToSend.length === 1) {
                        var patiendId = selected[0].PatientId;
                        headService.cancelNote(idsToSend[0], $scope.cancelReason, patiendId, function (data) {
                            $('#cancelSelected').modal('hide');
                            window.location.href = '/subjective';
                        });
                    //cancel multiple notes
                    } else {
                        headService.cancelAllNotes(idsToSend, $scope.cancelReason, function (data) {
                            $('#cancelSelected').modal('hide');
                            window.location.href = '/subjective';
                        });
                    }



                }
            }

            $scope.pdfContent = '';
            //$scope.showNotePdf = function (note) {
            //    documentsService.getDocumentById(note.DocumentId, function (data) {
            //        $scope.selectedNote = note;
            //        $scope.pdfContent = 'data:application/pdf;base64,' + data.Content;
            //        $('#showNotePdf').modal('show');
            //    });
            //}

            $scope.$watch('selectedCompletedDate', refreshCompletedNotes);
            $scope.selectedCompletedDate = new Date();
        }
    ]);
