var DisplayFlag = function(){
    var Parent = this.parentNode;
    if(this.innerHTML == "description"){
        Parent.querySelector(".pageResultDisclaimer").style.right = "0%";
        Parent.querySelector(".pageResultInformation").style.opacity = "0";
        Parent.style.borderRadius = "10px";
        this.innerHTML = "close";
        this.style.top = "5px";
        this.style.right = "5px";
    }else if(this.innerHTML == "close"){
        Parent.querySelector(".pageResultDisclaimer").style.right = "-100%";
        Parent.querySelector(".pageResultInformation").style.opacity = "1";
        this.innerHTML = "description";
        this.style.top = "10px";
        this.style.right = "10px";

        
        if(Parent.querySelector('#previewPlayPauseButton')){
            if(Parent.querySelector('#previewPlayPauseButton').innerHTML == "pause"){
                Parent.style.borderRadius = "10px 10px 20px 20px";
            }
        }else{
            Parent.style.borderRadius = "20px";
        }
    }
}
var pageResultButtonH = document.getElementsByClassName("pageResultButton");
var RECVideoPreview = document.getElementsByClassName("RECVideoPreview");

var previewVideoHolder = document.getElementsByClassName("previewVideoHolder");

Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});



var DisplayChannelName = function(){
    var Parent = this.parentNode;
    Parent.querySelector(".previewChannelName").style.opacity = "1";
    Parent.querySelector(".previewTitle").style.opacity = "0";
}

var HideChannelName = function(){
    var Parent = this.parentNode;
    Parent.querySelector(".previewChannelName").style.opacity = "0";
    Parent.querySelector(".previewTitle").style.opacity = "1";
}

var previewChannelIcon = document.getElementsByClassName("previewChannelIcon");
Array.from(previewChannelIcon).forEach(function(element) {
      element.addEventListener('mouseover', DisplayChannelName);
});
Array.from(previewChannelIcon).forEach(function(element) {
      element.addEventListener('mouseout', HideChannelName);
});









function createNewElement(ElementType, Identification, Classification){
    var node = document.createElement(ElementType);
    if(!(Identification === null)){
        node.id = Identification;
    }
    if(!(Classification === null)){
        node.className = Classification;
    }
    return node;
}




var currentlyScrubbing = 0;

var videoTimeUpdate = function(){
    let parent = this.parentNode;
    if(currentlyScrubbing == 0){
        parent.querySelector("#previewTimeline").style.width = parent.querySelector("#previewTimelineHolder").offsetWidth * (this.currentTime/ this.duration);
    }
}

var correction;
function PageOffset(pageX){
    if(window.innerWidth < 650){
        correction = 25;
    }else if(window.innerWidth < 975){
        if(pageX > window.innerWidth/2){
            correction = (window.innerWidth/2 + 15);
        }else{
            correction = 25;
        }
    }else if(window.innerWidth < 1300){
        
        if(pageX > (window.innerWidth/3 * 2)){
            correction = (window.innerWidth/3 * 2 + 13);
        }else if(pageX > (window.innerWidth/3)){
            correction = (window.innerWidth/3 + 18);
        }else{
            correction = 25;
        }
        
    }else if(window.innerWidth < 1625){
        if(pageX > (window.innerWidth/4 * 3)){
            correction = (window.innerWidth/4 * 3 + 10);
        }else if(pageX > (window.innerWidth/4 * 2)){
            correction = (window.innerWidth/4 * 2 + 15);
        }else if(pageX > (window.innerWidth/4)){
            correction = (window.innerWidth/4 + 20);
        }else{
            correction = 25;
        }
    }else if(window.innerWidth < 1950){
        
        if(pageX > (window.innerWidth/5 * 4)){
            correction = (window.innerWidth/5 * 4 + 9);
        }else if(pageX > (window.innerWidth/5 * 3)){
            correction = (window.innerWidth/5 * 3 + 13);
        }else if(pageX > (window.innerWidth/5 * 2)){
            correction = (window.innerWidth/5 * 2 + 17);
        }else if(pageX > (window.innerWidth/5)){
            correction = (window.innerWidth/5 + 21);
        }else{
            correction = 25;
        }
    }
    return correction;
}
var TimelineHover = function({pageX}){
    let mouseX = parseInt(pageX);
    let parent = this.parentNode;
    this.querySelector('#previewTimelineHover').style.width = mouseX - correction;
    //console.log(pageX);
    
    let v = parent.querySelector(".RECvideoPreview");
    let vp = parent.querySelector("#previewPlayerFramePreview");
    vp.style.opacity = 1;
    let TLH = parent.querySelector("#previewTimelineHolder").offsetWidth;
    let TL = parent.querySelector("#previewTimelineHover").offsetWidth;
    vp.currentTime =  v.duration / TLH * TL;
}

var Timeline = function({PageX}){
    
    let parent = this.parentNode;
    let parent2 = parent.parentNode;
    
    let v = parent.querySelector(".RECvideoPreview");
    let TLH = parent.querySelector("#previewTimelineHolder").offsetWidth;
    let TL = parent.querySelector("#previewTimelineHover").offsetWidth;
    parent.querySelector("#previewTimeline").style.width = parent.querySelector("#previewTimelineHover").offsetWidth;
    
    v.currentTime =  v.duration / TLH * TL;
    
    parent2.querySelector('.previewVideoHolder').addEventListener('mousemove', TimelineDrag);
}
var PlayStateWhileScrubbing;
var TimelineDrag = function({pageX}){
    currentlyScrubbing = 1;
    let parent = this.parentNode;
    let mouseX = parseInt(pageX);

    this.querySelector('#previewTimeline').style.width = mouseX - correction;
    let v = parent.querySelector(".RECvideoPreview");
    
    /*
    let TLH = parent.querySelector("#previewTimelineHolder").offsetWidth;
    let TL = parent.querySelector("#previewTimeline").offsetWidth;
    
    v.currentTime =  v.duration / TLH * TL;*/
    if(v.pause){
        //v.pause();
    }

    let vp = parent.querySelector("#previewPlayerFramePreview");
    vp.style.height = v.offsetHeight * .8;
    vp.style.bottom = (v.offsetHeight - v.offsetHeight * .8) * .5 - 5;
    vp.style.left = (v.offsetWidth - v.offsetWidth * .8) * .5 - 5;
    vp.style.borderRadius = "10px";
    vp.style.border = "5px solid #fff";
    v.style.opacity = .5;
}

var RemoveMML = function(){
    let parent = this.parentNode;
    let parent2 = parent.parentNode;

    
    let v = parent.querySelector(".RECvideoPreview");
    let TLH = parent.querySelector("#previewTimelineHolder").offsetWidth;
    let TL = parent.querySelector("#previewTimeline").offsetWidth;

    if(currentlyScrubbing == 1){
        v.currentTime =  v.duration / TLH * TL;
    }
    parent2.querySelector('.previewVideoHolder').removeEventListener('mousemove', TimelineDrag);
    
    let vp = parent.querySelector("#previewPlayerFramePreview");
    vp.style.height = "30%";
    vp.style.bottom = "10px";
    vp.style.left = "4px";
    v.style.opacity = 1;
    vp.style.borderRadius = "5px";
    vp.style.border = "0px solid #fff";
    currentlyScrubbing = 0;
}

var ClearTH = function(){
    let parent = this.parentNode;
    parent.querySelector("#previewTimelineHover").style.width = "0px";
    
    let vp = parent.querySelector("#previewPlayerFramePreview");
    vp.style.opacity = 0;
}

var previewVolume = function(){
    let parent = this.parentNode;
    if(parent.querySelector('#previewVolumeButton').innerHTML == "volume_off"){
        parent.querySelector('#previewVolumeButton').innerHTML = "volume_up";
        parent.querySelector('.RECVideoPreview').volume = .4;
    }else{
        parent.querySelector('#previewVolumeButton').innerHTML = "volume_off";
        parent.querySelector('.RECVideoPreview').volume = 0;
        
    }
}

var previewContinuePlaying = function(){
    let parent = this.parentNode;
    if(parent.querySelector('#previewPlayPauseButton').innerHTML == "play_arrow"){
        parent.querySelector('#previewPlayPauseButton').innerHTML = "pause";
    }else{
        parent.querySelector('#previewPlayPauseButton').innerHTML = "play_arrow";
        
    }
}

var previewPlayPause = function(){
    let parent = this.parentNode;
    let v = parent.querySelector(".RECvideoPreview");
    
    if(v.paused){
        v.play();
    }else{
        v.pause();
    }
}

var PreviewHover = function({pageX}){
    PageOffset(parseInt(pageX));
    var Parent = this.parentNode;
    
    if(!Parent.querySelector('#random')){
        let v = Parent.querySelector(".RECVideoPreview");
        this.parentNode.parentNode.parentNode.style.borderRadius = "10px 10px 20px 20px";
        this.parentNode.parentNode.querySelector(".previewChannelIcon").style.borderRadius = "0px 10px 10px 10px";
        this.style.borderRadius = "5px 5px 0px 0px";
        v.style.borderRadius = "5px 5px 0px 0px";
        v.volume = 0;
        v.play();
        
        this.appendChild(createNewElement('div','random', null));
        this.children[1].appendChild(createNewElement('div','previewTimelineHolder', null));
        this.appendChild(createNewElement('button', 'previewVolumeButton', null));
        Parent.querySelector('#previewVolumeButton').innerHTML = "volume_off";
        
        this.appendChild(createNewElement('button', 'previewPlayPauseButton', null));
        Parent.querySelector('#previewPlayPauseButton').innerHTML = "play_arrow";
        
        this.appendChild(createNewElement('video', 'previewPlayerFramePreview', null));
        Parent.querySelector('#previewPlayerFramePreview').src = v.src;
        
        this.children[1].children[0].appendChild(createNewElement('div', 'previewTimelineDownloaded',  null));
        this.children[1].children[0].appendChild(createNewElement('div', 'previewTimelineHover',  null));
        this.children[1].children[0].appendChild(createNewElement('div', 'previewTimeline',  null));
        
        
        Parent.querySelector('#previewVolumeButton').addEventListener('click', previewVolume);
        Parent.querySelector('#previewPlayPauseButton').addEventListener('click', previewContinuePlaying);
        
        Parent.querySelector('.previewVideoHolder').addEventListener('wheel', ScrubbScroll);
        
        Parent.querySelector('#random').addEventListener('mousemove', TimelineHover);
        Parent.querySelector('#random').addEventListener('mouseleave', ClearTH);
        Parent.querySelector('#random').addEventListener('mousedown', Timeline);
        //Parent.querySelector('#random').addEventListener('mouseup', RemoveMML);
        Parent.querySelector('.previewVideoHolder').addEventListener('mouseup', RemoveMML);
        v.addEventListener('timeupdate', videoTimeUpdate);
    }
    
    //this.parentNode.innerHTML += '<div id="previewTimelineHolder"><div id="previewTimeline"> </div> </div>';
    //this.play();
}
document.querySelector('.mainplayer').children[0].addEventListener('wheel', (e) =>{
    e.preventDefault();
});

var PreviewExit = function(){
    
    var Parent = this.parentNode;
    
    if(Parent.querySelector('#previewPlayPauseButton').innerHTML == "play_arrow"){
        let v = Parent.querySelector(".RECVideoPreview");
        this.parentNode.parentNode.parentNode.style.borderRadius = "20px";
        this.parentNode.parentNode.querySelector(".previewChannelIcon").style.borderRadius = "20px";
        this.style.borderRadius = "15px";
        v.style.borderRadius = "15px";
        v.pause();
        v.currentTime = 0;
        
        Parent.querySelector('#previewVolumeButton').removeEventListener('click', previewVolume);
        Parent.querySelector('#previewPlayPauseButton').removeEventListener('click', previewContinuePlaying);

        Parent.querySelector('.previewVideoHolder').removeEventListener('wheel', ScrubbScroll);
        
        Parent.querySelector('#random').removeEventListener('mousemove', TimelineHover);
        Parent.querySelector('#random').removeEventListener('mouseleave', ClearTH);
        Parent.querySelector('#random').removeEventListener('mousedown', Timeline);
        //Parent.querySelector('#random').removeEventListener('mouseup', RemoveMML);
        Parent.querySelector('.previewVideoHolder').removeEventListener('mouseup', RemoveMML);
        v.removeEventListener('timeupdate', videoTimeUpdate);
        
        
        if(Parent.querySelector('.previewVideoHolder').removeEventListener('mousemove', TimelineDrag)){
            Parent.querySelector('.previewVideoHolder').removeEventListener('mousemove', TimelineDrag);
        };
        
        
        let r = Parent.querySelector('#random');
        this.removeChild(r);
        r = Parent.querySelector('#previewVolumeButton');
        this.removeChild(r);
        r = Parent.querySelector('#previewPlayPauseButton');
        this.removeChild(r);
        r = Parent.querySelector('#previewPlayerFramePreview');
        this.removeChild(r);
    }
}

var videoTitles = document.getElementsByClassName("previewTitle");
Array.from(videoTitles).forEach(function(element) {
    element.addEventListener('click', function(e){
        e.preventDefault();
        setMainPlayer(this);
        document.getElementsByClassName("AfterEnter")[0].scrollTop = 0;
    });
});

var setMainPlayer = function(child){
    let urlKey = child.parentNode.parentNode.children[0].children[0].getAttribute('src');

    document.getElementsByClassName("mainplayer")[0].children[0].children[0].children[0].children[0].children[0].src = child.parentNode.parentNode.children[0].children[0].url;
    document.getElementsByClassName("mainplayer")[0].children[0].children[0].children[0].children[0].children[0].setAttribute('urlcheck', urlKey);
    document.getElementById('PageResults').classList.add("showMainPlayer");

    if(document.getElementById("Search").value != ""){
        let searchKey = document.getElementById("Search").value;
        window.history.replaceState('data', '234', 'key?search='+ searchKey +'&url='+ urlKey);
    }else{
        window.history.replaceState('data', '234', 'key?url='+ urlKey);
    }
}

Array.from(previewVideoHolder).forEach(function(element) {
      element.addEventListener('mouseenter', PreviewHover);
});

Array.from(previewVideoHolder).forEach(function(element) {
      element.addEventListener('mouseleave', PreviewExit);
});

Array.from(RECVideoPreview).forEach(function(element) {
      element.addEventListener('click', previewPlayPause);
});

var WindowResizeTimeout;

window.addEventListener("resize", (e) =>{
    clearTimeout(WindowResizeTimeout);
    //WindowResizeTimeout = setTimeout(, 200);

});

var VideoScrollTimeout;
var ScrubbScroll = function(event){
    
    currentlyScrubbing = 1;
    var wasPlaying = 0;
    
    let parent = this.parentNode;
    let parent2 = parent.parentNode;
    console.log(" x" + event.deltaX +  " y" + event.deltaY);
    
    if(Math.abs(event.deltaY) < Math.abs(event.deltaX)){
        event.preventDefault();
        let v = parent.querySelector(".RECvideoPreview");
        if(event.deltaX > 0){

           v.currentTime = v.currentTime - 5;
           this.querySelector('#previewTimeline').style.width = this.querySelector("#previewTimelineHolder").offsetWidth * (v.currentTime/ v.duration);
        v.pause();
        }else{
            v.currentTime = v.currentTime + 5;
            this.querySelector('#previewTimeline').style.width = this.querySelector("#previewTimelineHolder").offsetWidth * (v.currentTime/ v.duration);
        }
        
        //let v = parent.querySelector(".RECvideoPreview");
        let vp = parent.querySelector("#previewPlayerFramePreview");
        let TLH = parent.querySelector("#previewTimelineHolder").offsetWidth;
        let TL = parent.querySelector("#previewTimeline").offsetWidth;

        v.currentTime =  v.duration / TLH * TL;
    
        //vp.currentTime =  v.duration / TLH * TL;
        //vp.style.opacity = 1;

        clearTimeout(VideoScrollTimeout);
        VideoScrollTimeout = setTimeout(function(){
    
            parent2.querySelector('.previewVideoHolder').removeEventListener('mousemove', TimelineDrag);

            vp.style.opacity = 0;
            currentlyScrubbing = 0;
            }, 200);
        
        }else{
            if(Math.abs(event.deltaY) > Math.abs(event.deltaX)){
                document.body.scrollTop += event.deltaY;
            }
        }
}

document.querySelector(".mainplayer").children[0].children[0].children[0].children[0].children[0].addEventListener('wheel', (e) => {
    if(e.deltaY > e.deltaX){
        e.preventDefault();
    }
});
//previewVideoHolder[0].addEventListener('wheelX', ScrubbScroll);
