
var GenNavState = 0;

CheckHyperlinkArrangment();
function NavBarUniversal(){

    var NavMenuHolder = document.getElementById("NavMenuHolder");
    var NavOptions = document.getElementById("NavOptions");
  
    if(AppsDivState == 1 || SettingsDivState == 1){

        NavMenuHolder.style.webkitBoxShadow = "0px 2px 2px rgb(0, 0, 0, .25)";
        NavOptions.style.webkitBoxShadow = "0px 2px 2px rgb(0, 0, 0, .5)";
    
        GenNavState = 1;
    }else if(AppsDivState == 0 && SettingsDivState == 0){

        NavMenuHolder.style.webkitBoxShadow = "";
        NavOptions.style.webkitBoxShadow = "";
        
        GenNavState = 0;
    }
}


function SmartClose(){
    if(AppsDivState == 1){
        NavSubPages.style.height = "0px";
        NavSubPages.style.margin = "0px 0px";
        NavSubPages.style.opacity = "0";

        PageButton.style.color = "#000";
        PageButton.style.backgroundColor = "#FFF";
    
        AppsDivState = 0;
    }else if(SettingsDivState == 1){
        NavSubSettings.style.height = "0px";
        NavSubSettings.style.margin = "0px 0px";
        NavSubSettings.style.opacity = "0";

        SettingsButton.style.color = "#000";
        SettingsButton.style.backgroundColor = "#FFF";
    
        SettingsDivState = 0;
    }
}
function Settings_Toggle(){
    if(SettingsDivState == 0){
        SmartClose();

        NavSubSettings.style.height = "146px";
        NavSubSettings.style.margin = "10px";
        NavSubSettings.style.opacity = "1";
    
        SettingsButton.style.color = "#A7DDEE";
        SettingsButton.style.backgroundColor = "#333";
    
        SettingsDivState = 1;
        NavBarUniversal();
    
    }else if(SettingsDivState == 1){
    
        SmartClose();
        NavBarUniversal();
    }
}

function Apps_Toggle(){
    
    if(AppsDivState == 0){
        SmartClose();
        NavSubPages.style.height = "194px";
        NavSubPages.style.margin = "10px";
        NavSubPages.style.opacity = "1";
    
        PageButton.style.color = "#A7DDEE";
        PageButton.style.backgroundColor = "#333";
    
        AppsDivState = 1;
        NavBarUniversal();
    
    }else if(AppsDivState == 1){
        SmartClose();
        NavBarUniversal();
    
    }
}





var AppsDivState = 0;
var NavSubPages = document.getElementById("NavSubPages");
var PageButton = document.getElementById("PageButton");

document.getElementById("PageButton").addEventListener("click", (e) =>{
    e.preventDefault();
    Apps_Toggle();
});

document.getElementById("PageButton").addEventListener("mouseover", (e) =>{
    e.preventDefault();
    
    if(AppsDivState == 0){
        PageButton.style.color = "#FFF";
        PageButton.style.backgroundColor = "#555";
    }else if(AppsDivState == 1){
        PageButton.style.backgroundColor = "#FFF";
    }
});
document.getElementById("PageButton").addEventListener("mouseleave", (e) =>{
    e.preventDefault();
    
    if(AppsDivState == 0){
        PageButton.style.color = "#000";
        PageButton.style.backgroundColor = "#FFF";
    }else if(AppsDivState == 1){
        PageButton.style.color = "#A7DDEE";
        PageButton.style.backgroundColor = "#333";
    }
});





var SettingsDivState = 0;
var NavSubSettings = document.getElementById("NavSubSettings");
var SettingsButton = document.getElementById("SettingsButton");

document.getElementById("SettingsButton").addEventListener("click", (e) =>{
    e.preventDefault();
    Settings_Toggle();
});

document.getElementById("SettingsButton").addEventListener("mouseover", (e) =>{
    e.preventDefault();
    
    if(SettingsDivState == 0){
        SettingsButton.style.color = "#FFF";
        SettingsButton.style.backgroundColor = "#555";
    }else if(SettingsDivState == 1){
        SettingsButton.style.backgroundColor = "#FFF";
    }
});
document.getElementById("SettingsButton").addEventListener("mouseleave", (e) =>{
    e.preventDefault();
    
    if(SettingsDivState == 0){
        SettingsButton.style.color = "#000";
        SettingsButton.style.backgroundColor = "#FFF";
    }else if(SettingsDivState == 1){
        SettingsButton.style.color = "#A7DDEE";
        SettingsButton.style.backgroundColor = "#333";
    }
});

function PageRedirect(x){
    window.location.assign( x );
}
//PageRedirect('//127.0.0.1:8000/Snow/Videos/Mainplayer/url?key=3ZEE-Final.mp4'
function DirectConnect(page){  
    let prefix = "//127.0.0.1:8000/"
    let url = document.getElementById("Search").value;
    if(page == 1){
        window.location.assign("Snow/Search/search?key=" + "url");
    }else if(page == 2){
        window.location.assign(prefix + "Snow/Videos/Mainplayer/url?key=" + url);
    }else{

    }
}

document.getElementById("LoginButton").addEventListener("click", (e) =>{
    e.preventDefault();
    window.location.assign('http://127.0.0.1:8000/Snow/Login');
});