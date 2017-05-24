angular.module('patientSummary')

	.component("patsumComponent", {
		template: ['$templateCache', function ($templateCache) {
			return $templateCache.get('patientsummary.component.html')
		}],
		controllerAs: "patSumModel",
		controller: ['$location', '$cookieStore', '$timeout', 'EventService', patSumCtrl]

	});

function patSumCtrl($location, $cookieStore, $timeout, EventService) {
	"use strict";
	var paramValue = $location.search();
	var patSumModel = this;
	patSumModel.title = "Patient Layout";
	patSumModel.showAction = 0;
	patSumModel.primaryComponentAvailable = true;

	patSumModel.$onInit = function () {

		var patientInfoFailedToLoad = function (e) {
			patSumModel.primaryComponentAvailable = false;
			console.error(e.detail.reason);
		}

		EventService.subscribe('patientinfo-failed', patientInfoFailedToLoad);
		
		//Example: remove listener
		//EventService.unsubscribe('patientinfo-failed', patientInfoFailedToLoad);

		//patient ID used by SF:
		//todo: handle invalid ID or null ID to display UI error message;
		//todo: this will use JWT in cookie in final version;
		if (Object.keys(paramValue).length === 0) {
			$cookieStore.put('patientId', '26669');
		} else {
			$cookieStore.put('patientId', paramValue.patientId);
		}
	}
}