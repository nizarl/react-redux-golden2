"use strict";

angular.module('maQueue')

    .component("navComponent", {

        templateUrl: function ($attrs, $element) {
            return '/app/NavMenu/NavMenu.component.html';
        },
        controllerAs: "navModel",
        controller: [navCtrl]
    });

function navCtrl() {

    var navModel = this;
    navModel.PatientImage = '/app/images/patient-profile-icon.png';
};
