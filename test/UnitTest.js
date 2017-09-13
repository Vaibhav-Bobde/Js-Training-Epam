describe("Test Suite", function () {    
    beforeEach(function () {
        service = new service.Service();
    });
    it("Get API Data as Not Null", function () {
        var searchText = 'javascript';
        var promise = service.getAPIData(searchText);
        promise.then(function(){ 
            expect(service.SearchObj).not.toBe(null);
            done();
        });
    });
    it("Check resolution", function () {
        var wnd = {
            screen:{
                availWidth : 414,
                availHeight : 736
            }
        }
        var res = service.checkResolutions(wnd);
        expect(res).toBe('mobile')
    });
});