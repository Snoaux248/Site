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
        Parent.style.borderRadius = "20px";
        this.style.top = "10px";
        this.style.right = "10px";
    }
}

var pageResultButtonH = document.getElementsByClassName("pageResultButtonH");
var pageResultButtonK = document.getElementsByClassName("pageResultButtonK");

Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});
Array.from(pageResultButtonK).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});
window.addEventListener("resize", (e) =>{

    if(UIState == 0 && window.innerWidth >= 830){
        ResizeSubUI();
    }else if(UIState == 1 && window.innerWidth < 830){
        ResizeSubUI();
    }
    
    if(PageState == 2){
        if(document.getElementById("LinksDiv").style.height == '0px'){
            if(window.innerWidth < 1110){
                //document.getElementById('AfterEnter').style.height = window.innerHeight - (122) + 'px';
            }else if(window.innerWidth >= 1110){
                //document.getElementById("AfterEnter").style.height = window.innerHeight - (68) + 'px';
            }
        }else{
            if(window.innerWidth < 1110){
                //document.getElementById('AfterEnter').style.height = window.innerHeight - (244) + 'px';
            }else if(window.innerWidth >= 1110){
                //document.getElementById("AfterEnter").style.height = window.innerHeight - (188) + 'px';
            }
        }
    }
});
/*
if(window.innerWidth >= 830){
    var v1 = document.getElementById("Col1").innerHTML;
    var v2 = document.getElementById("Col2").innerHTML;
    document.getElementById("Col1").innerHTML = v2;
    document.getElementById("Col2").innerHTML = v1;
}else if(window.innerWidth < 630){
    var v2 = document.getElementById("Col1").innerHTML;
    var v1 = document.getElementById("Col2").innerHTML;
}*/

function ResizeSubUI(){

    Array.from(pageResultButtonK).forEach(function(element) {
        element.removeEventListener('click', DisplayFlag);
    });
    Array.from(pageResultButtonH).forEach(function(element) {
        element.removeEventListener('click', DisplayFlag);
    });
    /*
    if(window.innerWidth >= 830){
        v2 = document.getElementById("Col1").innerHTML;
        v1 = document.getElementById("Col2").innerHTML;
        //document.getElementById("PageResults").style.gridTemplateColumns = "1fr 20px 1fr 20px 1fr";
        document.getElementById("Col1").innerHTML = v1;
        document.getElementById("Col2").innerHTML = v2;
        UIState = 1;
    }else if(window.innerWidth < 830){
        v2 = document.getElementById("Col2").innerHTML;
        v1 = document.getElementById("Col1").innerHTML;
        //document.getElementById("PageResults").style.gridTemplateColumns = "auto";
        document.getElementById("Col1").innerHTML = v2;
        document.getElementById("Col2").innerHTML = v1;
        UIState = 0;
    }*/
    Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
    });
    Array.from(pageResultButtonK).forEach(function(element) {
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
