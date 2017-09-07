//import * as youtubeApp from '..\..\Js-Training-Epam\YouTube WebApp\App.js'
var tasks = require(['App']);


//hello
//This is test suite
describe("Test Suite", function() {
    it("test spec", function() {
        expect( true ).toEqual(tasks.hello());
    });
}); 