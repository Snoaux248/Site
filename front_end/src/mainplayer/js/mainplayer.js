const VolumeButton = document.getElementById("VideoVolume");
const ScreenSizeButton = document.getElementById("ScreenResize");
const QualityButton = document.getElementById("VideoQuality");
const SpeedButton = document.getElementById("VideoSpeed");
const VideoSettingsButton = document.getElementById("VideoSettingsButton");


var SettingsState = 0;

function SettingsB(){
    if(SettingsState == 0){
        VideoSettingsButton.style.transform = "rotate(30deg)";
        SettingsState = 1;
    }else{
        //if(QualityState == 1){

       // }else if(SpeedState == 1){
           
        //}else{
            VideoSettingsButton.style.transform = "rotate(0deg)";
       // }
        SettingsState = 0;
    }
}
/*

const QualityOptions = document.getElementById("QualityOptions");
const SpeedOptions = document.getElementById("SpeedOptions");
var SpeedState = 0;
var QualityState = 0;
function SpeedB(){
    if(SpeedState == 0){
        if(QualityState == 1){
            QualityB();
        }
        if(SettingsState == 1){
            SpeedOptions.style.width =  VideoFrame.offsetWidth - 150;
            SpeedButton.style.color = " #ec6a6a";
            SpeedState = 1;
        }
    }else{
        SpeedButton.style.color = "#fff";
        SpeedOptions.style.width = "0%";
        SpeedState = 0;
    }
}
function QualityB(){
    if(QualityState == 0){
        if(SpeedState == 1){
            SpeedB();
        }
        if(SettingsState == 1){
            QualityOptions.style.width = VideoFrame.offsetWidth - 150;
            QualityButton.style.color = " #ec6a6a";
            QualityState = 1;
        }
    }else{
        QualityOptions.style.width = "0%";
        QualityButton.style.color = " #fff";
        QualityState = 0;
    }
}
*/
var PlayPauseButton = document.querySelector('#PlayPause');

PlayPauseButton.addEventListener('click', (e) =>{
    e.preventDefault();
    PlayPause();
});
var PlayPauseControlTimeout;
function PlayPauseHide(){
    if(!Video.paused){
        PlayPauseButton.style.opacity = "0";
    }
}
function PlayPause(){
    if(PlayPauseButton.innerHTML == "pause" || PlayPauseButton.innerHTML == "replay"){
        Video.play();
        PlayPauseButton.innerHTML = "play_arrow";
    }else if(PlayPauseButton.innerHTML == "play_arrow"){
        Video.pause();
        PlayPauseButton.innerHTML = "pause";
    }
    PlayPauseButton.style.opacity = "1";
    clearTimeout(PlayPauseControlTimeout);
    PlayPauseControlTimeout = setTimeout(PlayPauseHide, 500);
    
}
var Video = document.querySelector('.video');
var VideoFrame = document.getElementById("VideoFrame");
var VideoFullScreenState = 0;

document.addEventListener("fullscreenchange", (event) => {
    if( !document.fullscreenElement){
        Video.style.transform =  "";
        ScreenSizeButton.src = "mainplayer/Enter_Fullscreen.png";
        VideoFullScreenState = 0;
    }
});

document.addEventListener("webkitfullscreenchange", (event) => {
    if( !document.webkitFullscreenElement){
        Video.style.WebkitTransform = "";
        ScreenSizeButton.src = "mainplayer/Enter_Fullscreen.png";
        //VideoFullScreenState = 0;
    }
});
function openFullscreen() {
    if(VideoFullScreenState == 0){

        ScreenSizeButton.src = "mainplayer/Exit_Fullscreen.png";
        if (VideoFrame.requestFullscreen) {
            VideoFrame.requestFullscreen();
        } else if (VideoFrame.webkitRequestFullscreen) { /* Safari */
            VideoFrame.webkitRequestFullscreen();
        } else if (VideoFrame.msRequestFullscreen) { /* IE11 */
            VideoFrame.msRequestFullscreen();
        }
        Video.style.transform =  "translateY(-50%)";
        VideoFullScreenState = 1;

    }else if(VideoFullScreenState == 1){
         ScreenSizeButton.src = "mainplayer/Enter_Fullscreen.png";
        
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
           document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        VideoFullScreenState = 0;
    }
    
}
var VS = 0;
var FrameRate = 60;
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37) {//left
      Video.currentTime -= 10;
      ShowTimeline();
  }else if(event.keyCode === 39){ //right
      Video.currentTime += 10;
      ShowTimeline();
  }else if(event.keyCode === 188){ //comma
      Video.currentTime -= (1/FrameRate);
      ShowTimeline();
  }else if(event.keyCode === 190){ //period
      Video.currentTime += (1/FrameRate);
      ShowTimeline();
  }else if(event.keyCode === 38){ //up
        event.preventDefault();
        VolumePercentageCalculation(+10);

  }else if(event.keyCode === 40){ //down
        event.preventDefault();

        VolumePercentageCalculation(-10);

  }else if(event.keyCode === 32){ //space
       PlayPause();

  }else if(event.keyCode === 27){ //escape
    event.preventDefault();
    
  }
});


document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    });
});

/*
var previous = "SO6";
function PlaySpeed(x, y){
    Video.playbackRate = x;
    document.getElementById(previous).style.color = "white";
    document.getElementById(previous).style.border = "2px solid white";
  
    document.getElementById("SO" + y).style.color = " #ec6a6a";
    document.getElementById("SO" + y).style.border = "2px solid #ec6a6a";
    previous = "SO" + y;
}
*/
//Volume Functions
const VolumeScrubber = document.getElementById("VolumeScrubber");
const VolumeTimeLine = document.getElementById("VolumeTimeLine");
const VolumePercentage = document.getElementById("VolumePercentage");

var VolumeState = 0;
var PlayerVol = 20;
setVolume();
function VolumeB(){
    if(VolumeState == 0){
        Video.volume = 0;
        VolumeTimeLine.style.height = "0px";
        Volume.src = "mainplayer/Volume_M.png";
        VolumePercentage.innerHTML = "Mute";
        VolumeState = 1;
    }else if(VolumeState == 1){
        setVolume();
        SetVolumePicture();
        VolumePercentage.innerHTML = PlayerVol;
        VolumeTimeLine.style.height = PlayerVol + "px";
        VolumeState = 0;
    }
}

var VolumePercentageTimeout;
function HideVolumePercent(){
    if(!(VolumeDiv.style.bottom == "0px")){
        VD.style.height = "0px";
        VolumePercentage.style.margin = "0px auto 5px auto";
    }else{
        VD.style.height = "0px";
        VolumePercentage.style.margin = "0px auto 5px auto";
    }
    VolumePercentage.style.opacity = 0;
}

function setVolume(){
    Video.volume = PlayerVol/100;
}

function SetVolumePicture(){
    if(VolumeTimeLine.offsetHeight > 75){
        Volume.src = "mainplayer/Volume_4.png";
    }else if(VolumeTimeLine.offsetHeight > 50){
        Volume.src = "mainplayer/Volume_3.png";
    }else if(VolumeTimeLine.offsetHeight > 25){
        Volume.src = "mainplayer/Volume_2.png";
    }else{
        Volume.src = "mainplayer/Volume_1.png";
    }
}

function VolumePercentageCalculation(x){

    if(VolumeState == 0){
        if(PlayerVol + x <= 0){
            PlayerVol = 0;
        }else if((PlayerVol + x) <= 100){
            PlayerVol = PlayerVol + x;
        }else if(PlayerVol + x > 100){
            PlayerVol = 100;
        }
        setVolume();

        VolumeTimeLine.style.height = PlayerVol + "px";
        VolumePercentage.innerHTML = PlayerVol;
        SetVolumePicture();
    }

    if(!(VolumeDiv.style.bottom == "0px")){
        ShowTimeline();
    }else if(VolumeDiv.style.bottom == "0px" && (VD.offsetHeight == 0)){
        VD.style.height = "30px";
        VolumePercentage.style.margin = "0px auto 30px auto";
        VolumePercentage.style.opacity = 1;
        clearTimeout(VolumePercentageTimeout);
        VolumePercentageTimeout = setTimeout(HideVolumePercent, 1000);
    }else{
        VolumePercentage.style.opacity = 1;
        clearTimeout(VolumePercentageTimeout);
        VolumePercentageTimeout = setTimeout(HideVolumePercent, 1000);
    }

}
//End Volume Functions


//Video Functions
const VideoTimeLine = document.getElementById("VideoTimeLine");
const VideoScrubber = document.getElementById("VideoScrubber");
var FullFormatedTime;
var CTime;
function NumberPadding(d){
    var x = Math.floor(d);
    //console.log(x);
    if(x < 10){x = "0" + x.toString();}
    return x;
}
function getFullFormatedTime(){
    if(Math.floor((Video.duration / 3600)) > 0){
        console.log("VideoTimeFormat = HH: MM: SS");
        let FS = (Video.duration % 60);
        let FM = (Video.duration / 60);
        let FH = (Video.duration / 3600);
        FS = NumberPadding(FS);
        FM = NumberPadding(FM);
        FH = NumberPadding(FH);
        return FH + ":" + FM + ":" + FS + "";
    }else if(Math.floor((Video.duration / 3600)) < 1 || Math.floor((Video.duration / 60)) > 0){
        console.log("VideoTimeFormat = MM: SS");
        let FS = (Video.duration % 60);
        let FM = (Video.duration / 60);
        FS = NumberPadding(FS);
        FM = NumberPadding(FM);
        return FM + ":" + FS + "";
    }else{
        console.log(" VideoTimeFormat = SS");
        let FS = (Video.duration % 60);
        FS = NumberPadding(FS);
        return FS + "";
    }
}
function getCurrentTime(){
    if(Math.floor((Video.duration / 3600)) > 0){
        let CS = (Video.currentTime % 60);
        let CM = (Video.currentTime / 60);
        let CH = (Video.currentTime / 3600);
        CS = NumberPadding(CS);
        CM = NumberPadding(CM);
        CH = NumberPadding(CH);
        return CH + ":" + CM + ":" + CS;
    }else if(Math.floor((Video.duration / 3600)) < 1 || Math.floor((Video.duration / 60)) > 0){
        let CS = (Video.currentTime % 60);
        let CM = (Video.currentTime / 60);
        CS = NumberPadding(CS);
        CM = NumberPadding(CM);
        return CM + ":" + CS;
    }else{
        let CS = (Video.currentTime % 60);
        CS = NumberPadding(CS);
        return CS;

    }
}
//calculate video time


//Video Scrubber
var loop = 0;
const FramePreview = document.getElementById("FramePreview");
Video.addEventListener('timeupdate', function(){
    if(CurrentlyScrubbingVideo == 0){
        VideoTimeLine.style.width = (VideoFrame.offsetWidth - 20) * (Video.currentTime/ Video.duration) * 1 + "px";
    }
    if(Video.ended){
        PlayPauseButton.innerHTML = "replay";
        PlayPauseButton.style.opacity = ".8";
    }
    
    //console.log(FullFormatedTime);
    //console.log(CTime);
    if(loop == 0){
        FullFormatedTime = getFullFormatedTime();
        loop = 1;
    }
    CTime = getCurrentTime();
    document.getElementById("CTime").innerHTML = CTime + " / " + FullFormatedTime;

});



//video volume and timeline scrubbers
const VideoTimeLineHolder = document.getElementById("VideoTimeLineHolder");
const VideoTimeLineHover = document.getElementById("VideoTimeLineHover");

var CurrentlyScrubbingVideo = 0;
function VideoOnDrag({pageX}){
    let mouseX;
    if(VideoFullScreenState == 0){
        mouseX = parseInt(pageX) -10 -25;
    }else if(VideoFullScreenState == 1){
        mouseX = parseInt(pageX) -10;
    }
    console.log(pageX);
    VideoTimeLine.style.width = mouseX + "px";
    VideoTimeLineHover.style.width = mouseX + "px";
    FramePreview.currentTime = (mouseX) * (Video.duration / (VideoFrame.offsetWidth - 20));
}

TimelineSelectionArea.addEventListener("mousedown", (e) =>{
    CurrentlyScrubbingVideo = 1;
    VideoOnDrag(e);
    FramePreview.style.opacity = 1;
    document.addEventListener("mousemove", VideoOnDrag);
    document.addEventListener("mousemove", DisplayFramePreview);
});

function DisplayFramePreview({pageX}){
    let mouseX;
    if(VideoFullScreenState == 0){
        mouseX = parseInt(pageX) -10 -25;
    }else if(VideoFullScreenState == 1){
        mouseX = parseInt(pageX) -10;
    }

    //console.log(pageX);
        if((mouseX - 70) < 10){
            FramePreview.style.left = "10px";
        }else if((mouseX - 70 - 25) >= (VideoFrame.offsetWidth - 170-25)){
            FramePreview.style.left = (VideoFrame.offsetWidth - 170);
        }else{
            FramePreview.style.left = mouseX - 70+ "px";
        }
        VideoTimeLineHover.style.width = mouseX + "px";
        FramePreview.currentTime = (mouseX) * (Video.duration / (VideoFrame.offsetWidth - 20));
}
TimelineSelectionArea.addEventListener("mouseover", (e) =>{
    FramePreview.style.opacity = 1;
    DisplayFramePreview(e);
    TimelineSelectionArea.addEventListener("mousemove", DisplayFramePreview);
});

TimelineSelectionArea.addEventListener("mouseout", (e) =>{
    FramePreview.style.left = VideoTimeLine.offsetWidth - 10 + "px";
    if(CurrentlyScrubbingVideo == 0){
        FramePreview.style.opacity = 0;
    }
    VideoTimeLineHover.style.width = VideoTimeLine.offsetWidth + "px";
    TimelineSelectionArea.removeEventListener("mousemove", DisplayFramePreview);
});

document.addEventListener("mouseup", () =>{
    if(CurrentlyScrubbingVideo == 1){
        Video.currentTime = (VideoTimeLine.offsetWidth) * (Video.duration/ (VideoFrame.offsetWidth - 20));
        CurrentlyScrubbingVideo = 0;
        FramePreview.style.opacity = 0;
        document.removeEventListener("mousemove", VideoOnDrag);
    }
    if(CurrentlyScrubbingAudio == 1){
        CurrentlyScrubbingAudio = 0;
        
        document.removeEventListener("mousemove", VolumeOnDrag);
    }
    document.removeEventListener("mousemove", DisplayFramePreview);
});

///Volume Drag
const VolumeTimeLineHolder = document.getElementById("VolumeTimeLineHolder");
var CurrentlyScrubbingAudio = 0;
function VolumeOnDrag({pageY}){
    var mouseY;
    if(VideoFullScreenState == 0){
        mouseY = parseInt(pageY) - (VideoFrame.offsetHeight - 149);
    }else if(VideoFullScreenState == 1){
        mouseY = parseInt(pageY) - (VideoFrame.offsetHeight - 149);
    }
    //console.log(pageY);
    //console.log(mouseY);
    if(VolumeState == 0){
        VolumeTimeLine.style.height = 100 - mouseY + "px";
        PlayerVol = VolumeTimeLine.offsetHeight;
        VolumePercentageCalculation(0);
    }
}   
VolumeTimeLineHolder.addEventListener("mousedown", (e) =>{
    CurrentlyScrubbingAudio = 1;
    
    VolumeOnDrag(e);
    document.addEventListener("mousemove", VolumeOnDrag);
});




/* Display and hide controlls*/
function HideVideoControls(){
    VideoDiv.style.bottom = "-50px";
    VolumeDiv.style.bottom = "-45px";
    FullscreenDiv.style.bottom = "-45px";
    VideoSettingsDiv.style.bottom = "-45px";
    document.getElementById("CTime").style.bottom = "-50px";
}
var VideoControlTimeout;
function ShowTimeline(){
    if(!(VideoDiv.style.bottom == "0px")){
        VideoDiv.style.bottom = "-35px";
        document.getElementById("CTime").style.bottom = "15px";
        if(ControlHoverState == 0){
            clearTimeout(VideoControlTimeout);
            VideoControlTimeout = setTimeout(HideVideoControls, 1000);
        }
    }
    if(VD.offsetHeight == 0){
        VD.style.height = "40px";
        VolumePercentage.style.margin = "0px auto 40px auto";
    }
    VolumePercentage.style.opacity = 1;
    clearTimeout(VolumePercentageTimeout);
    VolumePercentageTimeout = setTimeout(HideVolumePercent, 1000);
}
VideoFrame.addEventListener("mousemove", (e) =>{
    e.preventDefault();
    VideoDiv.style.bottom = "0px";
    VolumeDiv.style.bottom = "0px";
    FullscreenDiv.style.bottom = "0px";
    VideoSettingsDiv.style.bottom = "0px";
    VD.style.height = "0px";
    VolumePercentage.style.margin = "0px auto 5px auto";
    document.getElementById("CTime").style.bottom = "10px";
    
    if(ControlHoverState == 0){
        clearTimeout(VideoControlTimeout);
        VideoControlTimeout = setTimeout(HideVideoControls, 1000);
    }

});
VideoFrame.addEventListener("mouseout", (e) =>{
    if(ControlHoverState == 0){
        clearTimeout(VideoControlTimeout);
        VideoControlTimeout = setTimeout(HideVideoControls, 0);
    }
});
var ControlHoverState = 0;

VideoDiv.addEventListener("mouseover", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 1;
});
VideoDiv.addEventListener("mouseout", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 0;
});
VolumeDiv.addEventListener("mouseover", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 1;
    VideoDiv.style.left = "50px";
});
VolumeDiv.addEventListener("mouseout", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 0;
    VideoDiv.style.left = "10px";
});
FullscreenDiv.addEventListener("mouseover", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 1;
});
FullscreenDiv.addEventListener("mouseout", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 0;
});
VideoSettingsButton.addEventListener("mouseover", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 1;
});
VideoSettingsButton.addEventListener("mouseout", function(){ 
    clearTimeout(VideoControlTimeout);
    ControlHoverState = 0;
});

/*
VideoFrame.addEventListener('mouseover', function(){
        document.querySelector('#Video-Main').style.borderRadius = "13px 13px 23px 23px";
        console.log('mouseover');
        this.style.borderRadius = "8px 8px 0px 0px";
});

VideoFrame.addEventListener('mouseout', function(){
    if(Video.paused){
    document.querySelector('#Video-Main').style.borderRadius = "23px";
    console.log('mouse out');
    this.style.borderRadius = "18px";
    }
});*/


var ScrubbScroll = function(event){
    ShowTimeline();
    console.log(" x" + event.deltaX +  " y" + event.deltaY);
    
    if(Math.abs(event.deltaY) < Math.abs(event.deltaX)){
        event.preventDefault();
        let v = this.querySelector(".video");
        if(event.deltaX > 0){
            
           v.currentTime = v.currentTime - (1);
           this.querySelector('#VideoTimeLine').style.width = this.querySelector("#VideoTimeLineHolder").offsetWidth * (v.currentTime/ v.duration);
        v.pause();
        }else{
            v.currentTime = v.currentTime + (1);
            this.querySelector('#VideoTimeLine').style.width = this.querySelector("#VideoTimeLineHolder").offsetWidth * (v.currentTime/ v.duration);
        }
        if(this.querySelector("#FramePreview".style.opacity == 0)){
            this.querySelector("#VideoTimeLineHover").style.width = this.querySelector("#VideoTimeline").offsetWidth;
        }
        //let vp = this.querySelector("#FramePreview");
        let TLH = this.querySelector("#VideoTimeLineHolder").offsetWidth;
        //let TL = this.querySelector("VideoTimeline").offsetWidth;

        
        }else{
            if(Math.abs(event.deltaY) > Math.abs(event.deltaX)){
                document.body.scrollTop += event.deltaY;
            }
        }

}

document.querySelector("#VideoFrame").addEventListener('wheel', ScrubbScroll)