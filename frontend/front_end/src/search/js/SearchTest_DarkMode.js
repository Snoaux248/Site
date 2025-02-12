let DarkmodeOutlineColor = 0;
let darkmode = false;
function Dark_Mode_Toggle(){
    console.log("Toggleing Darkmode");
    document.body.style.transition = ".3s";
    
    if(darkmode == true){
        document.querySelector('#StyleSheetControl1').href = "/css/SearchLinks-Light.css";
        document.querySelector('#StyleSheetControl2').href = "/css/PopulateSearch-Light.css";
        document.querySelector('#DarkmodeToggle').innerHTML = "Dark Mode";
        darkmode = false;


        SetVariables("Light");
        
    }else{
        document.querySelector('#StyleSheetControl1').href = "/css/SearchLinks-Dark.css";
        document.querySelector('#StyleSheetControl2').href = "/css/PopulateSearch-Dark.css";
        document.querySelector('#DarkmodeToggle').innerHTML = "Light Mode";
        darkmode = true;


        SetVariables("Dark");
    }

}
document.querySelector('#DarkmodeToggle').addEventListener('click', (e) =>{
    Dark_Mode_Toggle();
});

/*Stored Variables for Js*/

var BorderColor = "#ececec"; // also secondary background color
var DropShadowColor = "rgb(0, 0, 0, .25)";
var SecondaryBorderColor = "#fff"; // also tertiary background color

function SetVariables(string){

    if(string == "Light"){
            BorderColor = "#ececec";
            DropShadowColor = "rgb(0, 0, 0, .25)";
            SecondaryBorderColor = "#fff";

        console.log("BorderColor set to #ececec");
        
    }
    if(string == "Dark"){
            BorderColor = "#373737";
            DropShadowColor = "rgb(190, 190, 190, 0.25)";
            SecondaryBorderColor = "#232323";

        console.log("BorderColor set to #232323");
    }

    if(document.querySelector('#SearchBar').style.border != "1px solid transparent" && document.querySelector('#SearchBar').style.border != "0px solid transparent"){
        document.querySelector('#SearchBar').style.border = "1px solid" + BorderColor;

        document.getElementById("SearchIcon2").style.width = "44px";
        document.getElementById("SearchIcon2").style.padding = "7px 10px 7px 12px";
        document.getElementById("SearchIcon2").style.borderRight = " 1px solid" + BorderColor;
    }

    if(document.querySelector('#searchIcon2').style.borderRight != "1px solid transparent"){
        document.querySelector('#searchIcon2').style.borderRight = "1px solid" + BorderColor;
    }

    if(document.getElementById("LinkTitle").innerHTML != "inactive"){
        console.log("height:", document.getElementById("LinkTitle").innerHTML)
        document.querySelector('#SearchAndLinks').style.border = "1px solid" + BorderColor;
    }   
}






const runColorMode = (fn) => {
    if (!window.matchMedia) {
      return;
    }
    
    const query = window.matchMedia('(prefers-color-scheme: dark)');
  
    fn(query.matches);
  
    query.addEventListener('change', (event) => fn(event.matches));
}

  runColorMode((isDarkMode) => {
    if (isDarkMode) {

        document.querySelector('#StyleSheetControl1').href = "/css/SearchLinks-Dark.css";
        document.querySelector('#StyleSheetControl2').href = "/css/PopulateSearch-Dark.css";
        document.querySelector('#DarkmodeToggle').innerHTML = "Light Mode";
        darkmode = true;


        SetVariables("Dark");
    } else {
        document.querySelector('#StyleSheetControl1').href = "/css/SearchLinks-Light.css";
        document.querySelector('#StyleSheetControl2').href = "/css/PopulateSearch-Light.css";
        document.querySelector('#DarkmodeToggle').innerHTML = "Dark Mode";
        darkmode = false;


        SetVariables("Light");
    }
  })