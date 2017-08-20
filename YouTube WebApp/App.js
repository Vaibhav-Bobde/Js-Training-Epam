    var YoutubeAppElements = {
        searchInput: null,
        btn: null
    };
    window.onload = function () {
        initializeSelectors();
        initializeEvents();
    }
    function initializeSelectors() {
        YoutubeAppElements.searchInput = document.getElementById('searchInput');
        YoutubeAppElements.btn = document.getElementById('btn');
        YoutubeAppElements.tmpVideo = document.getElementById('tempVideo');
        YoutubeAppElements.divVideoLst = document.getElementById('videoLst');
    }
    function initializeEvents() {
        YoutubeAppElements.btn.onclick = btnEvent;
    }
    function btnEvent(e) {
        var apiKey = 'AIzaSyAMeGPYFUvoJxhIoXvHnrK_mQHK26b2_6w'
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {            
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText));
                renderVideoLst(JSON.parse(this.responseText));        
            }
        };
        xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + apiKey +
            "&type=video&part=snippet&maxResults=15&q=" + YoutubeAppElements.searchInput.value, true);
        xhttp.send();
    }
    function renderVideoLst(searchResp){
        for(let item of searchResp.items){
            let divVideoEle = YoutubeAppElements.tmpVideo.content.getElementById('divVideo');
            divVideoEle.getElementsByClassName('title')[0].innerText = item.snippet.title;
            divVideoEle.getElementsByClassName('channel')[0].innerText = item.snippet.channelTitle;
            divVideoEle.getElementsByClassName('description')[0].innerText = item.snippet.description;
            divVideoEle.getElementsByClassName('publishDate')[0].innerText = item.snippet.publishedAt;
            divVideoEle.style.backgroundImage = 'url(' + item.snippet.thumbnails.high.url + ')'
            let cloneEle = document.importNode(divVideoEle, true);
            YoutubeAppElements.divVideoLst.appendChild(cloneEle);
            debugger;            
        }
    }