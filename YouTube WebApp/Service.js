   var Service = function () {
       this.APIKey = 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w';
       this.VideoNums = {
           Desktop: 4,
           Tablet: 2,
           Mobile: 1
       };
       this.SearchObj = null;
   }
   Service.prototype = {
       getAPIData: function (searchText, callback) {
           var _this = this;
           var apiKey = 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w',
               promise = new Promise(function (fulfill, reject) {
                   xhttp = new XMLHttpRequest(),
                       xhttp.onreadystatechange = function () {
                           if (this.readyState == 4 && this.status == 200) {
                               _this.SearchObj = JSON.parse(this.responseText);
                               fulfill();
                           }
                       }
                   xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + _this.APIKey +
                       "&type=video&part=snippet&maxResults=15&q=" + searchText, true);
                   xhttp.send();
               });
           return promise.then(function () {
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function () {
                   if (this.readyState == 4 && this.status == 200) {
                       _this.attachStatistics(JSON.parse(this.responseText));
                       //callback();
                       return;
                   }
               }
               xhttp.open("GET", "https://www.googleapis.com/youtube/v3/videos?key=" + _this.APIKey +
                   "&id=" + _this.getConcatinatedVideoIds() + '&part=snippet,statistics', true);
               xhttp.send();
           });
       },
       getConcatinatedVideoIds: function () {
           var videoStr = [];
           for (let index = 0; index < this.SearchObj.items.length; ++index) {
               videoStr.push(this.SearchObj.items[index].id.videoId);
           }
           return videoStr.toString();
       },
       attachStatistics: function (statsObj) {
           for (let index = 0; index < statsObj.items.length; ++index) {
               this.SearchObj.items[index].statistics = statsObj.items[index].statistics;
           }
       },
       checkResolutions: function (wnd) {
           var pagenum;
           if (wnd.screen.availWidth <= 414 && wnd.screen.availHeight <= 736) {
               pagenum = 'mobile';
           } else if (wnd.screen.availWidth < 1366 && wnd.screen.availHeight <= 768) {
               pagenum = 'tablet';
           } else {
               pagenum = 'desktop';
           }
           return pagenum;
       }
   }