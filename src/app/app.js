"use strict";
(function () {
    // Register Angular module
    var carePro = angular.module('carepro', ['chenExternalUIComponents']);

    carePro.config(function($stateProvider, $locationProvider, $sceDelegateProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',

            //Note: There is a difference between * and **. Docs: https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
            'http://localhost:3000/**',
            'https://localhost:3000/**',
            'https://ux-components-int.chenmed.local/**',
            'https://ux-components-qa.chenmed.local/**',
            'https://ux-components.chenmed.com/**'
        ]);

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('carepro', {
		name: "carepro",
		url: "/carepro",
		template:	'<carepro-component></carepro-component>'
	}).state('depression-screening', {
		name: "depression-screening",
		url: "/depression-screening",
		resolve: { myData: function(){
				return { value: 'simple'}; 
			}
		},
		template:	'<depressionscreening-component></depressionscreening-component>'
    	});
    });
})();
