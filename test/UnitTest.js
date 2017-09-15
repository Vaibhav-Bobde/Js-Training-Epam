describe("Test Suite", function () {
    var service;
    var youTube;
    beforeEach(function () {
        service = new Service();
        service.SearchObj = {
            items: [{
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "-HjpL-Ns6_A"
                    },

                },
                {
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "nfs8NYg7yQM"
                    },
                }
            ]
        };
        youTube = new View(service);
    });
    it("Get API Data as Not Null", function () {
        var searchText = 'javascript';
        var promise = service.getAPIData(searchText);
        promise.then(function () {
            expect(service.SearchObj).not.toBe(null);
            done();
        });
    });
    it("Check resolution", function () {
        var wnd = {
            screen: {
                availWidth: 414,
                availHeight: 736
            }
        }
        var res = service.checkResolutions(wnd);
        expect(res).toBe('mobile')
    });
    it("Get concatinated videoIds", function () {
        expect(service.getConcatinatedVideoIds()).toBe('-HjpL-Ns6_A,nfs8NYg7yQM');
    });
    it("Check total pages based on resolution", function () {
        service.checkResolutions = jasmine.createSpy("checkResolutions() spy").and.returnValue('tablet');
        youTube.renderVideoLst = jasmine.createSpy("renderVideoLst() spy");
        youTube.renderPageNums = jasmine.createSpy("renderPageNums() spy");
        youTube.adjustPaginationOnResize();
        expect(youTube.TotPages).toBe(1);
        expect(service.checkResolutions).toHaveBeenCalled();
        expect(youTube.renderVideoLst).toHaveBeenCalled();
        expect(youTube.renderPageNums).toHaveBeenCalled();
    });
});