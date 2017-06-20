describe('aggregator: Patient Summary', function () {
    //ARRANGE
    var $componentController;
    beforeEach(module('chenExternalUIComponents'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$compile_) {
        $componentController = _$componentController_;
        scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));

    it('should compile aggregator template and find element by ID', function () {
        //ACT
        var element = $compile("<carepro-component></carepro-component")(scope);
        element = $compile(element)(scope);
        scope.$digest();
        var items = element.find('#patientSummary');
        //ASSERT
        expect(items.prevObject.length).toBe(1);
    });
    it('should use hosted(CDN) problems component element tag', function () {
        //ACT
        var element = $compile("<carepro-component></carepro-component")(scope);
        element = $compile(element)(scope);
        scope.$digest();
        var items = element.find('#problemsSection');
        //ASSERT
        expect(items.prevObject.length).toBe(1);
    });
});