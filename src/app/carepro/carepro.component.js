angular.module('carePro')

	.component("careproComponent", {
		template: ['$templateCache', function ($templateCache) {
			return $templateCache.get('carepro.component.html')
		}],
		controllerAs: "careProModel",
		controller: ['$location', '$cookieStore', '$timeout', 'EventService', careProCtrl]

	});

function careProCtrl($location, $cookieStore, $timeout, EventService) {
	"use strict";
	var paramValue = $location.search();
	var careProModel = this;
	careProModel.title = "Patient Layout";
	careProModel.showAction = 0;
	careProModel.primaryComponentAvailable = true;

	careProModel.$onInit = function () {

		var patientInfoFailedToLoad = function (e) {
			careProModel.primaryComponentAvailable = false;
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