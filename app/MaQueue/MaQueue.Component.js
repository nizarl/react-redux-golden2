"use strict";

angular.module('maQueue')

    .component("maqueueComponent", {

        templateUrl: function ($attrs, $element) {
            return '/app/maqueue/MaQueue.component.html';
        },
        controllerAs: "maQueueModel",
        controller: ['$rootScope', 'loginFactory', 'myNotesPendingNotes', maQueueCtrl]

    });

function maQueueCtrl($rootScope, loginFactory, myNotesPendingNotes) {

	var maQueueModel = this;

	//patient ID used by SF:
	$rootScope.sfPatientId = '26669';
	maQueueModel.title = "Patient Layout";
	maQueueModel.showAction = 0;


	maQueueModel.$onInit = function () {

		// var login = loginFactory.signIn().then(function (resp) {

		// 	myNotesPendingNotes.getPendingNotes(
		// 		function (data) {

		// 			$rootScope.myNotesNoteId = data[0].Id;
		// 			$rootScope.myNotePatientId = data[0].PatientId;
		// 			$rootScope.$emit('myNotesReady', 'Emit!');
		// 		},
		// 		function () { } //error handler..empty for now
		// 	);
		// })
	}

	//////////////////////////////////////////////////////
	// Manual Order of Panels from 0 to Size-1 for Swiper
	// Order maters in swipe
	/////////////////////////////////////////////////////
	maQueueModel.Panels = {};
	maQueueModel.Panels.Size = 5;	// Number of Panels
	maQueueModel.Panels.Medications = 0;
	maQueueModel.Panels.Problems = 1;
	maQueueModel.Panels.Vitals = 2;
	maQueueModel.Panels.AdditionalNotes = 3;
	maQueueModel.Panels.PhysicalExam = 4;



	function ShowContent() {

		maQueueModel.MedContent = 'display-none';
		maQueueModel.VitalsContent = 'display-none';
		maQueueModel.ProblemsContent = 'display-none';
		maQueueModel.AdditionalNotesContent = 'display-none';
		maQueueModel.PhysicalExamContent = 'display-none';
		if (maQueueModel.showAction == maQueueModel.Panels.Medications) {
			maQueueModel.MedContent = 'display-block';
		} else if (maQueueModel.showAction == maQueueModel.Panels.Vitals) {
			maQueueModel.VitalsContent = 'display-block';
		} else if (maQueueModel.showAction == maQueueModel.Panels.AdditionalNotes) {
			maQueueModel.AdditionalNotesContent = 'display-block';
		} else if (maQueueModel.showAction == maQueueModel.Panels.PhysicalExam) {
			maQueueModel.PhysicalExamContent = 'display-block';
		} else if (maQueueModel.showAction == maQueueModel.Panels.Problems) {
			maQueueModel.ProblemsContent = 'display-block';
		}
	}

	maQueueModel.SwipeRight = function () {
		if (maQueueModel.showAction < maQueueModel.Panels.Size - 1) {
			maQueueModel.showAction = maQueueModel.showAction + 1;
		}
		ShowContent();
	}

	maQueueModel.SwipeLeft = function () {
		if (maQueueModel.showAction > 0) {
			maQueueModel.showAction = maQueueModel.showAction - 1;
		}
		ShowContent();
	}
}

