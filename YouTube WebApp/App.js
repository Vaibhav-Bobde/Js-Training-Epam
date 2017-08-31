   var YoutubeApp = {
        Elements : {
            searchInput: null,
            btn: null,
            tmpVideo: null,
            divVideoLst:null

        },
        VideoNums : {
            Desktop: 5,
            Mobile: 3
        },
        SearchObj: null,
        PageNum : 1
    }

    window.onload = function () {
        initializeSelectors();
        initializeEvents();
    }

    function initializeSelectors() {
        YoutubeApp.Elements.searchInput = document.getElementById('searchInput');
        YoutubeApp.Elements.btn = document.getElementById('btn');
        YoutubeApp.Elements.tmpVideo = document.getElementById('tempVideo');
        YoutubeApp.Elements.divVideoLst = document.getElementById('videoLst');
    }

    function initializeEvents() {
        YoutubeApp.Elements.btn.onclick = btnEvent;
        window.onresize = resizeEvent;
    }

    function btnEvent(e) {
        var apiKey = 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText));
                YoutubeApp.SearchObj = JSON.parse(this.responseText);
                renderVideoLst(YoutubeApp.SearchObj);
            }
        };
        xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + apiKey +
            "&type=video&part=snippet&maxResults=15&q=" + YoutubeApp.Elements.searchInput.value, true);
        xhttp.send();
    }

    function renderVideoLst(searchResp) {        
        for (let item of searchResp.items) {
            let divVideoEle = YoutubeApp.Elements.tmpVideo.content.getElementById('divVideo');
            let divThumbnail = divVideoEle.getElementsByClassName('thumbnail')[0];
            divVideoEle.getElementsByClassName('title')[0].innerText = item.snippet.title;
            divVideoEle.getElementsByClassName('channel')[0].innerText = item.snippet.channelTitle;
            divVideoEle.getElementsByClassName('description')[0].innerText = item.snippet.description;
            divVideoEle.getElementsByClassName('publishDate')[0].innerText = item.snippet.publishedAt;
            divThumbnail.style.backgroundImage = 'url(' + item.snippet.thumbnails.high.url + ')'
            let cloneEle = document.importNode(divVideoEle, true);
            YoutubeApp.Elements.divVideoLst.appendChild(cloneEle);
        }
    }

    function resizeEvent(e, v) {
        adjustPaginationOnResize();
    }

    function checkResolutions() {
        if (window.innerWidth <= 800 && window.innerHeight <= 600) {
            return 3;
        } else {
            return 1;
        }
    }

    function adjustPaginationOnResize() {
        var videoPerPage;
        switch (checkResolutions()) {
            case 1:
                videoPerPage = YoutubeApp.VideoNums.Desktop;
                break;
            case 2:
                videoPerPage = YoutubeApp.VideoNums.Mobile;
                break;
        }
        debugger;
        var totPages = Math.ceil(YoutubeApp.SearchObj.items / videoPerPage),
            startIndex = (YoutubeApp.PageNum - 1) * videoPerPage,
            endIndex =  startIndex + videoPerPage,
            arr = YoutubeApp.SearchObj.items,
	        paginatedItems = arr.filter(function(elem, index, arr) {
                return index >= startIndex && index < endIndex;
            });
        // for (let index = 0; index <= pageNums && index < YoutubeApp.SearchObj.items; index++) {
        //     YoutubeApp.SearchObj.items
        // }
    }