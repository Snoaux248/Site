var DisplayFlag = function(){
    var Parent = this.parentNode;
    if(this.innerHTML === "description"){
        this.innerHTML = "close";
        Parent.querySelector(".pageResultDisclaimer").style.right = "0%";
        Parent.querySelector(".pageResultInformation").style.opacity = "0";
        Parent.style.borderRadius = "10px";
        this.style.top = "5px";
        this.style.right = "5px";

        if(Parent.querySelector(".iframeResultButtonK")){
            Parent.querySelector(".iframeResultButtonK").style.top = "5px";
            Parent.querySelector(".iframeResultButtonK").style.right = "35px";
        }
    }else if(this.innerHTML === "close"){
        this.innerHTML = "description";
        Parent.querySelector(".pageResultDisclaimer").style.right = "-100%";
        Parent.querySelector(".pageResultInformation").style.opacity = "1";
        Parent.style.borderRadius = "20px";
        this.style.top = "10px";
        this.style.right = "10px";

        if(Parent.querySelector(".iframeResultButtonK")){
            Parent.querySelector(".iframeResultButtonK").style.top = "10px";
            Parent.querySelector(".iframeResultButtonK").style.right = "40px";
        } 
    }
}

var TheatreMode = function(){
    var Parent = this.parentNode;
    var PageResults = document.getElementById("PageResults");
    var Col1 = document.getElementById("Col1");
    var Col2 = document.getElementById("Col2");
    var Col3 = document.getElementById("Col3");
    if(this.innerHTML == 'fullscreen'){
        this.innerHTML = "fullscreen_exit";
        if(Parent.parentNode == document.getElementById("Col1")){
            Parent.style.width = 100 * ((Col2.offsetWidth + Col1.offsetWidth + 20)/ Parent.offsetWidth) + "%";
        }else if(Parent.parentNode == document.getElementById("Col2")){
            Parent.style.left = - ((Col1.offsetWidth + Col2.offsetWidth + 20) - Parent.offsetWidth) + "px";
            console.log(Col1.offsetWidth, Col2.offsetWidth, Col3.offsetWidth, 40, Parent.offsetWidth);
            console.log(Col1.offsetWidth + Col2.offsetWidth + Col3.offsetWidth + 40);
            Parent.style.width = 100 * (PageResults.offsetWidth / Parent.offsetWidth) + "%";
        }else if(Parent.parentNode == document.getElementById("Col3")){
            Parent.style.left = - ((Col2.offsetWidth + Col3.offsetWidth + 20) - Parent.offsetWidth) + "px";
            Parent.style.width = 100 * ((Col2.offsetWidth + Col3.offsetWidth + 20)/ Parent.offsetWidth) + "%";
        }
        Parent.getElementsByClassName("graph")[0].style.aspectRatio = PageResults.offsetWidth + " / " + (document.getElementById("AfterEnter").offsetHeight - 100);
    }else if(this.innerHTML == 'fullscreen_exit'){
        this.innerHTML = "fullscreen";
        Parent.style.left = "0px";
        Parent.style.width = "100%";
        Parent.getElementsByClassName("graph")[0].style.aspectRatio = "16 / 9";
    }
}

var pageResultButtonH = document.getElementsByClassName("pageResultButtonH");
var iframeResultButtonK = document.getElementsByClassName("iframeResultButtonK");


Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});
Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});
Array.from(iframeResultButtonK).forEach(function(element) {
    console.log(iframeResultButtonK);
    element.addEventListener('click', TheatreMode);
});

window.addEventListener("resize", (e) =>{

    if(UIState == 0 && window.innerWidth >= 830){
        ResizeSubUI();
    }else if(UIState == 1 && window.innerWidth < 830){
        ResizeSubUI();
    }
    CheckHyperlinkArrangment();
    if(PageState == 2){
        if(document.getElementById("LinksDiv").style.height == '0px'){
            if(window.innerWidth < 1110){
                document.getElementById('AfterEnter').style.height = window.innerHeight - (122) + 'px';
            }else if(window.innerWidth >= 1110){
                document.getElementById("AfterEnter").style.height = window.innerHeight - (68) + 'px';
            }
        }else{
            if(window.innerWidth < 1110){
                document.getElementById('AfterEnter').style.height = window.innerHeight - (244) + 'px';
            }else if(window.innerWidth >= 1110){
                document.getElementById("AfterEnter").style.height = window.innerHeight - (188) + 'px';
            }
        }
    }
});

function ResizeSubUI(){
    Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
    });
}
ResizeSubUI();

/*
var WindowResizeTimeout;
var v1 = document.getElementById("Col1").innerHTML;
var v2 = document.getElementById("Col2").innerHTML;

window.addEventListener("resize", (e) =>{
    clearTimeout(WindowResizeTimeout);
    WindowResizeTimeout = setTimeout(UIAbsolute, 200);

    document.getElementById("Col1").style.transition = "0s";
    document.getElementById("Col2").style.transition = "0s";
    if(CurrentUIState == 0){
        document.getElementById("Col1").style.width = (window.innerWidth - 60)/2 + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 60)/2 + "px";
        document.getElementById("Col1").style.top = "10px";
    }else if(CurrentUIState == 1){
        document.getElementById("Col1").style.width = (window.innerWidth - 40) + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 40) + "px";
        document.getElementById("Col1").style.top = document.getElementById("Col2").offsetHeight + 10;
    }
    
});
setTimeout(() => {
    if(window.innerWidth >= 1110){
        CurrentUIState = 0;
        document.getElementById("Col1").style.width = (window.innerWidth - 60)/2 + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 60)/2 + "px";
        document.getElementById("Col1").style.top = "10px";
    }else{
        CurrentUIState = 1;
        document.getElementById("Col1").style.width = (window.innerWidth - 40) + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 40) + "px";
        document.getElementById("Col1").style.top = document.getElementById("Col2").offsetHeight + 10;
    }
}, 200);
var CurrentUIState = 0;
function UIAbsolute(){
    
    if(window.innerWidth >= 1110){
        document.getElementById("Col1").style.width = (window.innerWidth - 60)/2 + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 60)/2 + "px";
        if(CurrentUIState == 1){
            document.getElementById("Col1").style.transition = ".5s";
            document.getElementById("Col2").style.transition = ".5s";
            setTimeout(() => {
                document.getElementById("Col1").style.top = "10px";
                setTimeout(() => {
                    document.getElementById("Col1").style.transition = "0s";
                    document.getElementById("Col2").style.transition = "0s";
                }, 500);
            }, 500);
            CurrentUIState = 0;
        }
        
        
    }else if(window.innerWidth < 1110){
        document.getElementById("Col1").style.width = (window.innerWidth - 40) + "px";
        document.getElementById("Col2").style.width = (window.innerWidth - 40) + "px";
        if(CurrentUIState == 0){
            document.getElementById("Col1").style.transition = ".5s";
            document.getElementById("Col2").style.transition = ".5s";
            document.getElementById("Col1").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("Col1").style.top = document.getElementById("Col2").offsetHeight + 10;
                document.getElementById("Col1").style.opacity = "1";
                setTimeout(() => {
                    document.getElementById("Col1").style.width = (window.innerWidth - 40) + "px";
                    setTimeout(() => {
                        document.getElementById("Col1").style.transition = "0s";
                        document.getElementById("Col2").style.transition = "0s";
                    }, 500);
                }, 500);
            }, 500);
            CurrentUIState = 1;
        }
    }
    
}
*/
