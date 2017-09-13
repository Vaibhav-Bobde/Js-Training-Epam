   var View = function (service) {
       var _this = this;
       this.Elements = {
           searchInput: null,
           btn: null,
           tmpVideo: null,
           divVideoLst: null
       };
       this.PageNum = 1;
       this.TotPages = null;
       this.Service = service;
       window.onload = function () {
           _this.setupHtmlPage();
           _this.initializeSelectors();
           _this.initializeEvents(window);
       }
   }
   View.prototype = {
       setupHtmlPage: function () {
           var divParent = document.getElementById('divParent'),
               divInner = document.createElement('div'),
               divPages = document.createElement('div'),
               divVideoLst = document.createElement('div'),
               searchInput = document.createElement('input'),
               searchBtn = document.createElement('button');
           searchInput.style.width = '500px';
           searchInput.style.height = '25px';
           searchInput.id = 'searchInput';
           searchBtn.id = 'btn';
           searchBtn.style.width = '75px';
           searchBtn.style.height = '25px';
           searchBtn.style.color = 'red';
           searchBtn.innerText = 'Search';
           divPages.id = 'divPages';
           divPages.className = 'pagination';
           divVideoLst.id = 'videoLst';
           divInner.innerHTML = '<strong style="color:red"><span>Youtube Web App</span></strong><p/>';
           divInner.appendChild(searchInput);
           divInner.appendChild(searchBtn);
           divParent.appendChild(divInner);
           divParent.appendChild(divPages);
           divParent.appendChild(divVideoLst);
       },
       initializeSelectors: function () {
           this.Elements.searchInput = document.getElementById('searchInput');
           this.Elements.btn = document.getElementById('btn');
           this.Elements.tmpVideo = document.getElementById('tempVideo');
           this.Elements.divVideoLst = document.getElementById('videoLst');
           this.Elements.divPages = document.getElementById('divPages');
       },
       initializeEvents: function (wnd) {
           var _this = this;
           if (this.Elements.btn) {
               this.Elements.btn.onclick = function () {
                   _this.btnEvent(_this);
               }
           }
           this.initSwipeEvents(this.Elements.divVideoLst);
           wnd.onresize = function () {
               _this.resizeEvent(_this);
           };
       },
       btnEvent: function (_this) {
           var promise = _this.Service.getAPIData(_this.Elements.searchInput.value);
           promise.then(function () {
               _this.adjustPaginationOnResize();
           });
       },
       setPaginationEvent: function (pageNum) {
           this.PageNum = parseInt(pageNum);
           this.adjustPaginationOnResize();
       },
       renderVideoLst: function (searchResp) {
           this.Elements.divVideoLst.innerHTML = '';
           for (let item of searchResp) {
               let divVideoEle = this.Elements.tmpVideo.content.getElementById('divVideo');
               let divThumbnail = divVideoEle.getElementsByClassName('thumbnail')[0];
               divVideoEle.getElementsByClassName('title')[0].innerText = item.snippet.title;
               divVideoEle.getElementsByClassName('channel')[0].innerText = item.snippet.channelTitle;
               divVideoEle.getElementsByClassName('description')[0].innerText = item.snippet.description;
               divVideoEle.getElementsByClassName('publishDate')[0].innerText = item.snippet.publishedAt;
               divVideoEle.getElementsByClassName('viewCount')[0].innerText = item.statistics.viewCount;
               divVideoEle.getElementsByClassName('link')[0].href = 'https://www.youtube.com/watch?v=' + item.id.videoId;
               divThumbnail.style.backgroundImage = 'url(' + item.snippet.thumbnails.high.url + ')'
               let cloneEle = document.importNode(divVideoEle, true);
               this.Elements.divVideoLst.appendChild(cloneEle);
           }
       },
       resizeEvent: function (_this) {
           if (_this.Service.SearchObj != null) {
               _this.adjustPaginationOnResize();
           }
       },
       adjustPaginationOnResize: function () {
           var videoPerPage;
           switch (this.Service.checkResolutions(window)) {
               case 'desktop':
                   videoPerPage = this.Service.VideoNums.Desktop;
                   break;
               case 'tablet':
                   videoPerPage = this.Service.VideoNums.Tablet;
                   break;
               case 'mobile':
                   videoPerPage = this.Service.VideoNums.Mobile;
                   break;
           }
           var totPages = Math.ceil(this.Service.SearchObj.items.length / videoPerPage),
               startIndex = (this.PageNum - 1) * videoPerPage,
               endIndex = startIndex + videoPerPage,
               arr = this.Service.SearchObj.items,
               paginatedItems = arr.filter(function (elem, index, arr) {
                   return index >= startIndex && index < endIndex;
               });
           this.TotPages = totPages;
           this.renderVideoLst(paginatedItems);
           this.renderPageNums(totPages);
       },
       renderPageNums: function (totPages) {
           var _this = this;
           this.Elements.divPages.innerHTML = '';
           for (let index = 0; index < totPages; index++) {
               let anchorEle = document.createElement('a');
               anchorEle.href = '#';
               anchorEle.innerText = index + 1;
               anchorEle.onclick = function () {
                   _this.setPaginationEvent(this.innerText);
               }
               if (parseInt(anchorEle.innerText) === this.PageNum) {
                   anchorEle.className += 'active';
               }
               this.Elements.divPages.appendChild(anchorEle);
           }
       },
       setPageNumOnSwipe: function (direction) {
           switch (direction) {
               case 'right':
                   this.PageNum = this.PageNum > 1 ? this.PageNum - 1 : this.PageNum;
                   break;
               case 'left':
                   this.PageNum = this.PageNum === this.TotPages ? this.PageNum : this.PageNum + 1;
                   break;
           }
       },
       swipeFunc: {
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
           }
       },
       initSwipeEvents: function (ele) {
           var _this = this;
           ele.addEventListener('touchstart', function (event) {
               _this.touchHandler(event, _this);
           }, false);
           ele.addEventListener('touchmove', function (event) {
               _this.touchHandler(event, _this);
           }, false);
           ele.addEventListener('touchend', function (event) {
               _this.touchHandler(event, _this);
           }, false);
       },
       touchHandler: function (event, _this) {
           var touch;
           if (typeof event !== 'undefined') {
               event.preventDefault();
               if (typeof event.touches !== 'undefined') {
                   touch = event.touches[0];
                   switch (event.type) {
                       case 'touchstart':
                       case 'touchmove':
                           _this.swipeFunc.touches[event.type].x = touch.pageX;
                           _this.swipeFunc.touches[event.type].y = touch.pageY;
                           break;
                       case 'touchend':
                           _this.swipeFunc.touches[event.type] = true;
                           if (_this.swipeFunc.touches.touchstart.x > -1 && _this.swipeFunc.touches.touchmove.x > -1) {
                               _this.swipeFunc.touches.direction = _this.swipeFunc.touches.touchstart.x < _this.swipeFunc.touches.touchmove.x ? "right" : "left";
                               _this.setPageNumOnSwipe(_this.swipeFunc.touches.direction);
                               _this.adjustPaginationOnResize();
                           }
                       default:
                           break;
                   }
               }
           }
       }
   }
   var viewObj = new View(new Service());