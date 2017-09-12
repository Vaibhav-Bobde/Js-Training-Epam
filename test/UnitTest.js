describe("Test Suite", function () {
    var service;
    beforeEach(function () {
        service = new Service();
    });
    it("Get API Data as Not Null", function () {
        var searchText = 'javascript';
        var promise = service.getAPIData(searchText);
        promise.then(function(){
            expect(service.SearchObj).toEqual(hello());
        });        
    });
});