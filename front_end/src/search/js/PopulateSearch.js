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

var neighbor_move = function(bump_dir, column, element){


}

var TheatreMode = function(){
    var Parent = this.parentNode;
    var PageResults = document.getElementById("PageResults");
    var Col1 = document.getElementById("Col1");
    var Col2 = document.getElementById("Col2");
    var Col3 = document.getElementById("Col3");
    if(this.innerHTML === 'fullscreen'){
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
        Parent.style.zIndex = 10;
        setTimeout(() => {
            if((Parent.offsetWidth * 9 / 16) <= (document.querySelector(".AfterEnter").offsetHeight - 90)){
                Parent.getElementsByClassName("graph")[0].style.aspectRatio = "16/9";
            }else{
                Parent.getElementsByClassName("graph")[0].style.aspectRatio = (Parent.offsetWidth + " / " + (document.querySelector(".AfterEnter").offsetHeight - 100));
            }
        }, 300); 
    }else if(this.innerHTML === 'fullscreen_exit'){
        this.innerHTML = "fullscreen";
        Parent.style.left = "0px";
        Parent.style.width = "100%";
        Parent.getElementsByClassName("graph")[0].style.aspectRatio = "16 / 9";
        Parent.style.zIndex = 1;
    }
}

var StackToggle = function(){
    var Parent = this.parentNode.parentNode;
    var Children = Parent.parentNode.getElementsByClassName("stackbody")[0];
    const numberOfChildren = Children.childElementCount;
    if(this.innerHTML === 'keyboard_arrow_down'){
        this.innerHTML = 'keyboard_arrow_up';
        Parent.style.borderRadius = "10px";
        sum = 0;
            for(var i = 0; i < numberOfChildren; i++){
                sum += 10 + Children.children[i].offsetHeight;
                Children.children[i].classList.remove("hidden");
                Children.children[i].classList.add("shown");
            }

        Parent.parentNode.getElementsByClassName("stackbody")[0].classList.remove("hidden");
        Parent.parentNode.getElementsByClassName("stackbody")[0].classList.add("shown");
        Parent.parentNode.getElementsByClassName("stackbody")[0].style.height = sum;
    }else if(this.innerHTML === 'keyboard_arrow_up'){
        this.innerHTML = 'keyboard_arrow_down';
        this.parentNode.parentNode.parentNode.setAttribute('preview', 0);
        Parent.style.borderRadius = "20px";
        for(var i = 0; i < numberOfChildren; i++){
                Children.children[i].classList.remove("shown");
                Children.children[i].classList.add("hidden");
            }
        Parent.parentNode.getElementsByClassName("stackbody")[0].style.height = "20px";
        Parent.parentNode.getElementsByClassName("stackbody")[0].classList.remove("shown");
        Parent.parentNode.getElementsByClassName("stackbody")[0].classList.add("hidden");
    }
}
function temp_func(element){
    element.classList.remove("hidden");
    element.classList.add("shown");
}
function temp_func2(element){
    element.classList.remove("shown");
    element.classList.add("hidden");
}
var ScrollKill = function(element){

    const Parent = element.parentNode.parentNode.parentNode.children[1];
    var current = parseInt(element.parentNode.parentNode.parentNode.getAttribute('preview'));
    temp_func2(Parent.children[current]);
    Parent.style.marginBottom = "10px";
    console.log("reverted");

    element.removeEventListener("mouseleave", ScrollKill(element));
}

var smart_scroll = 0;
var ScrollInit = function(element){
    element.addEventListener('wheel', (e) => {
        e.preventDefault();
        element.parentNode.children[1].innerHTML = "keyboard_arrow_up";
        var direction = e.deltaY < 0 ? direction = -1: direction = 1;
        smart_scroll += e.deltaY;

        if(Math.abs(smart_scroll) > 50){
            //TimeDifferential = Date.now();
            smart_scroll -= 50 * direction;
            const Parent = element.parentNode.parentNode.parentNode.children[1];
            element.parentNode.parentNode.parentNode.children[0].style.borderRadius = "10px";
            var Length = Parent.childElementCount;

            Parent.classList.remove("hidden");
            Parent.classList.add("shown");
            var current = parseInt(element.parentNode.parentNode.parentNode.getAttribute('preview'));
            var next = ((current + direction) % Length + Length) % Length;

            element.parentNode.parentNode.parentNode.setAttribute('preview', next);
            Parent.style.height = Parent.children[next].offsetHeight + 10;
            temp_func2(Parent.children[current]);
            temp_func(Parent.children[next]);
        }
    });
}

var pageResultButtonH = document.getElementsByClassName("pageResultButtonH");
var iframeResultButtonK = document.getElementsByClassName("iframeResultButtonK");
var stackButton = document.getElementsByClassName("stackButton");
var stackScroll = document.getElementsByClassName("stackScroll");
Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
});
Array.from(iframeResultButtonK).forEach(function(element) {
    element.addEventListener('click', TheatreMode);
});
Array.from(stackButton).forEach(function(element) {
    element.addEventListener('click', StackToggle);
});
Array.from(stackScroll).forEach(function(element) {
    element.addEventListener("mouseover", ScrollInit(element));
});


var DynamicTheatre = function(child, direction){
    var columns = PageResultState;
    var parent = child.parentNode.parentNode.parentNode.parentNode;
    var nativeLeft = parseInt(parent.getAttribute("left"));
    var nativeRight = parseInt(parent.getAttribute("right"));
    var collisionParentColumn = (parseInt(parent.getAttribute('column')) -1) % columns + 1;
    switch(direction){
        case 1:
            parent.setAttribute('right', ((collisionParentColumn + nativeRight + 1) > columns ? nativeRight : nativeRight + 1));
        break;

        case 2:
            parent.setAttribute('right', (collisionParentColumn + nativeRight - 1) < collisionParentColumn ? nativeRight : nativeRight - 1);
        break;

        case 3:
            parent.setAttribute('left', (collisionParentColumn - (nativeLeft + 1)) > 0 ? nativeLeft + 1 : nativeLeft);
        break;

        case 4:
            parent.setAttribute('left', (collisionParentColumn - (nativeLeft - 1)) > collisionParentColumn ? nativeLeft : nativeLeft - 1);
        break;

        default:

        break;
    }
    console.log("Left "+ nativeLeft, "Right "+ nativeRight);
    readjust(parent);
}

var PushRight = document.getElementsByClassName("PushRight");
var PullRight = document.getElementsByClassName("PullRight");
var PushLeft = document.getElementsByClassName("PushLeft");
var PullLeft = document.getElementsByClassName("PullLeft");

Array.from(PushRight).forEach(function(element){
    element.addEventListener('click', function() {
        DynamicTheatre(this, 1);
    });
});
Array.from(PullRight).forEach(function(element){
    element.addEventListener('click', function() {
        DynamicTheatre(this, 2);
    });
});
Array.from(PushLeft).forEach(function(element){
    element.addEventListener('click', function() {
        DynamicTheatre(this, 3);
    });
});
Array.from(PullLeft).forEach(function(element){
    element.addEventListener('click', function() {
        DynamicTheatre(this, 4);
    });
});

function readjust(child){
    
    var columns = PageResultState;
    var columnWidth = document.getElementById("Col1").offsetWidth;

    var collisionParentColumn = (parseInt(child.getAttribute('column')) -1) % columns + 1;
    var collisionRight = Math.min(columns - collisionParentColumn, parseInt(child.getAttribute('right')));
    var collisionLeft = Math.min(collisionParentColumn - 1, parseInt(child.getAttribute('left')));
    var span = 1 + collisionRight + collisionLeft;
    var percentWidth = ((columnWidth * span) + (20 * (span - 1)))/(columnWidth)  * 100;
    var percentLeftOffset = (-((columnWidth + 20) * collisionLeft)/columnWidth) * 100;
    
    //child.style.left = percentLeftOffset + "%";
    //child.style.width = percentWidth + "%";
    setTimeout(() =>{
        child.style.width = "calc("+span*100+"% + "+ (20* (span-1)) +"px)";
        //console.log("calc("+span*100+"% + "+ (20* (span-1)) +"px)");
        child.style.left = "calc(-"+collisionLeft*100+"% - "+ (20*(collisionLeft)) +"px)";
        //console.log("calc(-"+collisionLeft*100+"% - "+ (20*(collisionLeft)) +"px)");
    }, 0);
}

/*
window.addEventListener("resize", (e) =>{

    if(UIState == 0 && window.innerWidth >= 830){
        ResizeSubUI();
    }else if(UIState == 1 && window.innerWidth < 830){
        ResizeSubUI();
    }
    CheckHyperlinkArrangment();
    if(PageState == 2){
        if(document.querySelector('.LinksDiv').style.height == '0px'){
            
        }else{
            
        }
    }
});
*/
function ResizeSubUI(){
    Array.from(pageResultButtonH).forEach(function(element) {
      element.addEventListener('click', DisplayFlag);
    });
}
ResizeSubUI();

var DisplayResizeControls = function(){
    var parent = this.parentNode;
    var doubleParent = parent.parentNode;
    doubleParent.children[0].classList.add('shown');
    doubleParent.children[1].children[2].classList.add('shown');
    doubleParent.addEventListener('mouseleave', parentLeave);
    doubleParent.children[0].addEventListener('mouseleave', HideResizeControls);
}
var parentLeave = function(){
    this.children[0].classList.remove('shown');
    this.children[1].children[2].classList.remove('shown');
    this.children[0].removeEventListener('mouseleave', HideResizeControls);
}
var HideResizeControls = function(){
    this.classList.remove('shown');
    this.parentNode.children[1].children[2].classList.remove('shown');
    this.removeEventListener('mouseleave', HideResizeControls);
}

var deletes = document.getElementsByClassName("delete");
var minimize = document.getElementsByClassName("resize");
var resize = document.getElementsByClassName("resize");


var DeleteChild = function(){
    console.log("removing child");
    console.log(this.parentNode.parentNode.parentNode.parentNode);
    console.log(this.parentNode.parentNode.parentNode);
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
}
var MinimizeChild = function(){
    
}
var ResizeChild = function(){

}

Array.from(deletes).forEach(function(element) {
    element.addEventListener('click', DeleteChild);
});
Array.from(minimize).forEach(function(element) {
    element.addEventListener('click', MinimizeChild);
});
Array.from(resize).forEach(function(element) {
    element.addEventListener('click', ResizeChild);
    element.addEventListener('mouseover', DisplayResizeControls);
});

var BumpRight = document.getElementsByClassName("BumpRight");
var BumpLeft = document.getElementsByClassName("BumpLeft");
var BumpUp = document.getElementsByClassName("BumpUp");
var BumpDown = document.getElementsByClassName("BumpDown");

Array.from(BumpRight).forEach(function(element){
    element.addEventListener('click', function() {
        Move(this, 1);
    });
});
Array.from(BumpLeft).forEach(function(element){
    element.addEventListener('click', function() {
        Move(this, 2);
    });
});
Array.from(BumpUp).forEach(function(element){
    element.addEventListener('click', function() {
        Move(this, 3);
    });
});
Array.from(BumpDown).forEach(function(element){
    element.addEventListener('click', function() {
        Move(this, 4);
    });
});
var Move = function(child, direction){
    var columns = PageResultState;
    var parent = child.parentNode.parentNode.parentNode.parentNode;
    const index = [...parent.parentNode.children].indexOf(parent);
    var parentColumn = (parseInt(parent.getAttribute('column')) -1) % columns + 1;
    switch(direction){
        case 1:
            parent.setAttribute("column", (parentColumn + 1) <= columns ? parentColumn + 1: parentColumn);
        break;

        case 2:
            parent.setAttribute("column", (parentColumn - 1) > 0 ? parentColumn - 1: parentColumn);
        break;

        case 3:
            if(!(index - 1 < 0)) parent.parentNode.insertBefore(parent, parent.parentNode.children[index-1]) ;
        break;

        case 4:
            if(index + 1 < parseInt(parent.parentNode.childElementCount)) parent.parentNode.insertBefore(parent.parentNode.children[index + 1], parent) ;
        break;

        default:

        break;
    }
    ResultMerge(columns);
}

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
