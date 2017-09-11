   var YoutubeApp = {
       APIKey: 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w',
       Elements: {
           searchInput: null,
           btn: null,
           tmpVideo: null,
           divVideoLst: null

       },
       VideoNums: {
           Desktop: 4,
           Tablet: 2,
           Mobile: 1
       },
       SearchObj: null,
       PageNum: 1,
       TotPages: null
   }
    
   var swipeFunc = {
       touches: {
           "touchstart": {
               "x": -1,
               "y": -1
           },
           "touchmove": {
               "x": -1,
               "y": -1
           },
           "touchend": false,
           "direction": "undetermined"
       },
       touchHandler: function (event) {
           var touch;
           if (typeof event !== 'undefined') {
               event.preventDefault();
               if (typeof event.touches !== 'undefined') {
                   touch = event.touches[0];
                   switch (event.type) {
                       case 'touchstart':
                       case 'touchmove':
                           swipeFunc.touches[event.type].x = touch.pageX;
                           swipeFunc.touches[event.type].y = touch.pageY;
                           break;
                       case 'touchend':
                           swipeFunc.touches[event.type] = true;
                           if (swipeFunc.touches.touchstart.x > -1 && swipeFunc.touches.touchmove.x > -1) {
                               swipeFunc.touches.direction = swipeFunc.touches.touchstart.x < swipeFunc.touches.touchmove.x ? "right" : "left";
                               setPageNumOnSwipe(swipeFunc.touches.direction);
                               adjustPaginationOnResize();
                           }
                       default:
                           break;
                   }
               }
           }
       },
       init: function (ele) {
           ele.addEventListener('touchstart', swipeFunc.touchHandler, false);
           ele.addEventListener('touchmove', swipeFunc.touchHandler, false);
           ele.addEventListener('touchend', swipeFunc.touchHandler, false);
       }
   };

   window.onload = function () {
       initializeSelectors();
       initializeEvents();
   }

   function setPageNumOnSwipe(direction) {
       switch (direction) {
           case 'right':
               YoutubeApp.PageNum = YoutubeApp.PageNum > 1 ? YoutubeApp.PageNum - 1 : YoutubeApp.PageNum;
               break;
           case 'left':
               YoutubeApp.PageNum = YoutubeApp.PageNum === YoutubeApp.TotPages ? YoutubeApp.PageNum : YoutubeApp.PageNum + 1;
               break;
       }       
   }

   function initializeSelectors() {
       YoutubeApp.Elements.searchInput = document.getElementById('searchInput');
       YoutubeApp.Elements.btn = document.getElementById('btn');
       YoutubeApp.Elements.tmpVideo = document.getElementById('tempVideo');
       YoutubeApp.Elements.divVideoLst = document.getElementById('videoLst');
       YoutubeApp.Elements.divPages = document.getElementById('divPages');
   }

   function initializeEvents() {
       if (YoutubeApp.Elements.btn) {
           YoutubeApp.Elements.btn.onclick = btnEvent;
       }
       swipeFunc.init(YoutubeApp.Elements.divVideoLst);
       window.onresize = resizeEvent;
   }

   function btnEvent(e) {
       getAPIData();
   }

   function getAPIData() {
       var apiKey = 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w',
           promise = new Promise(function (fulfill, reject) {
               xhttp = new XMLHttpRequest(),
                   xhttp.onreadystatechange = function () {
                       if (this.readyState == 4 && this.status == 200) {
                           YoutubeApp.SearchObj = JSON.parse(this.responseText);
                           fulfill();
                       }
                   }
               xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + YoutubeApp.APIKey +
                   "&type=video&part=snippet&maxResults=15&q=" + YoutubeApp.Elements.searchInput.value, true);
               xhttp.send();
           });
       promise.then(function () {
           var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function () {
               if (this.readyState == 4 && this.status == 200) {
                   attachStatistics(JSON.parse(this.responseText));
                   adjustPaginationOnResize();
               }
           }
           xhttp.open("GET", "https://www.googleapis.com/youtube/v3/videos?key=" + YoutubeApp.APIKey +
               "&id=" + getConcatinatedVideoIds() + '&part=snippet,statistics', true);
           xhttp.send();
       });
   }

   function getConcatinatedVideoIds() {
       var videoStr = [];
       for (let index = 0; index < YoutubeApp.SearchObj.items.length; ++index) {
           videoStr.push(YoutubeApp.SearchObj.items[index].id.videoId);
       }
       return videoStr.toString();
   }

   function attachStatistics(statsObj) {
       for (let index = 0; index < statsObj.items.length; ++index) {
           YoutubeApp.SearchObj.items[index].statistics = statsObj.items[index].statistics;
       }
   }

   function setPaginationEvent(event) {
       event.stopPropagation();
       YoutubeApp.PageNum = parseInt(this.innerText);
       adjustPaginationOnResize();
   }

   function renderVideoLst(searchResp) {
       YoutubeApp.Elements.divVideoLst.innerHTML = '';
       for (let item of searchResp) {
           let divVideoEle = YoutubeApp.Elements.tmpVideo.content.getElementById('divVideo');
           let divThumbnail = divVideoEle.getElementsByClassName('thumbnail')[0];
           divVideoEle.getElementsByClassName('title')[0].innerText = item.snippet.title;
           divVideoEle.getElementsByClassName('channel')[0].innerText = item.snippet.channelTitle;
           divVideoEle.getElementsByClassName('description')[0].innerText = item.snippet.description;
           divVideoEle.getElementsByClassName('publishDate')[0].innerText = item.snippet.publishedAt;
           divVideoEle.getElementsByClassName('viewCount')[0].innerText = item.statistics.viewCount;
           divVideoEle.getElementsByClassName('link')[0].href = 'https://www.youtube.com/watch?v=' + item.id.videoId;
           divThumbnail.style.backgroundImage = 'url(' + item.snippet.thumbnails.high.url + ')'
           let cloneEle = document.importNode(divVideoEle, true);
           YoutubeApp.Elements.divVideoLst.appendChild(cloneEle);
       }
   }

   function resizeEvent(e, v) {
       if (YoutubeApp.SearchObj != null) {
           adjustPaginationOnResize();
       }
   }

   function checkResolutions(wnd) {
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

   function adjustPaginationOnResize() {
       var videoPerPage;
       switch (checkResolutions(window)) {
           case 'desktop':
               videoPerPage = YoutubeApp.VideoNums.Desktop;
               break;
           case 'tablet':
               videoPerPage = YoutubeApp.VideoNums.Tablet;
               break;
           case 'mobile':
               videoPerPage = YoutubeApp.VideoNums.Mobile;
               break;
       }
       var totPages = Math.ceil(YoutubeApp.SearchObj.items.length / videoPerPage),
           startIndex = (YoutubeApp.PageNum - 1) * videoPerPage,
           endIndex = startIndex + videoPerPage,
           arr = YoutubeApp.SearchObj.items,
           paginatedItems = arr.filter(function (elem, index, arr) {
               return index >= startIndex && index < endIndex;
           });
       YoutubeApp.TotPages = totPages;
       renderVideoLst(paginatedItems);
       renderPageNums(totPages);
   }

   function renderPageNums(totPages) {
       YoutubeApp.Elements.divPages.innerHTML = '';
       for (let index = 0; index < totPages; index++) {
           let anchorEle = document.createElement('a');
           anchorEle.href = '#';
           anchorEle.innerText = index + 1;
           anchorEle.onclick = setPaginationEvent;
           if (parseInt(anchorEle.innerText) === YoutubeApp.PageNum) {
               anchorEle.className += 'active';
           }
           YoutubeApp.Elements.divPages.appendChild(anchorEle);
       }
   }