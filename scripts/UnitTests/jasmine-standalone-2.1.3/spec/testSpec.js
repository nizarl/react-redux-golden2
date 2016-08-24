"use strict";

describe("Unit tests for $Scope functions in medCtlr", function () {

    //Assemble 
    var ctrl, scope;
    
    beforeEach(module('MainModule'));


    beforeEach(inject(function ($rootScope,$controller) {
        scope = $rootScope.$new();
        ctrl = $controller('medsCtlr', { $scope: scope });
    }));


    //Quick example
    it("Variable $scope.testMedEx should return true", function () {
        

        //Act
        var testAct = scope.testMedEx(false);
        //Assert 
        expect(testAct).toEqual(true);

    });

});


