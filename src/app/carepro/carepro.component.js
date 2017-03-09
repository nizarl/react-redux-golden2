"use strict";
angular.module('carepro')

.component("careproComponent", {
	template: ['$templateCache', function ($templateCache) {
		return $templateCache.get('carepro/carepro.component.html')
	}],
	controllerAs: "careProModel",
	controller: ['$rootScope', '$location', careProCtrl]

});

function careProCtrl($rootScope, $location) {
	var paramValue = $location.search();
	var careProModel = this;

	careProModel.title = "Patient Layout";
	careProModel.showAction = 0;
	careProModel.$onInit = function () {
		//patient ID used by SF:
		//todo: handle invalid ID or null ID to display UI error message;
		if (Object.keys(paramValue).length === 0) {
			$rootScope.sfPatientId = '26669'; // alternate 812098
		} else {
			$rootScope.sfPatientId = paramValue.patientId;
		}
	}

	//////////////////////////////////////////////////////
	// Manual Order of Panels from 0 to Size-1 for Swiper
	// Order maters in swipe
	/////////////////////////////////////////////////////
	careProModel.Panels = {};
	careProModel.Panels.Size = 5; // Number of Panels
	careProModel.Panels.Medications = 0;
	careProModel.Panels.Problems = 1;
	careProModel.Panels.Vitals = 2;
	careProModel.Panels.AdditionalNotes = 3;
	careProModel.Panels.PhysicalExam = 4;



	function ShowContent() {

		careProModel.MedContent = 'display-none';
		careProModel.VitalsContent = 'display-none';
		careProModel.ProblemsContent = 'display-none';
		careProModel.AdditionalNotesContent = 'display-none';
		careProModel.PhysicalExamContent = 'display-none';
		if (careProModel.showAction == careProModel.Panels.Medications) {
			careProModel.MedContent = 'display-block';
		} else if (careProModel.showAction == careProModel.Panels.Vitals) {
			careProModel.VitalsContent = 'display-block';
		} else if (careProModel.showAction == careProModel.Panels.AdditionalNotes) {
			careProModel.AdditionalNotesContent = 'display-block';
		} else if (careProModel.showAction == careProModel.Panels.PhysicalExam) {
			careProModel.PhysicalExamContent = 'display-block';
		} else if (careProModel.showAction == careProModel.Panels.Problems) {
			careProModel.ProblemsContent = 'display-block';
		}
	}

	careProModel.SwipeRight = function () {
		if (careProModel.showAction < careProModel.Panels.Size - 1) {
			careProModel.showAction = careProModel.showAction + 1;
		}
		ShowContent();
	}

	careProModel.SwipeLeft = function () {
		if (careProModel.showAction > 0) {
			careProModel.showAction = careProModel.showAction - 1;
		}
		ShowContent();
	}
}