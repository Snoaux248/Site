var WindowWidth;
var WindowHeight;
var PageState;
PageState = 1;
var HyperLinksState = 0;
var SortSubMenuState = 0;

function Update(){
    WindowWidth = window.innerWidth;
    WindowHeight = window.innerHeight;
}

var QuickLinkEditButtons = document.getElementsByClassName("linkeditbutton");
var QuickLinkRemoveButtons = document.getElementsByClassName("linkdeletebutton");
var QuickLinkRedirectButtonParent = document.getElementsByClassName("HyperlinkStyle");


function zz(){
  Array.from(QuickLinkEditButtons).forEach(function(element) {
    element.addEventListener('click', QuickLinkEdit);
  });
  Array.from(QuickLinkRemoveButtons).forEach(function(element) {
    element.addEventListener('click', QuickLinkRemove);
  });
  Array.from(document.querySelectorAll('.HyperlinkStyle')).forEach(function(element) {
    element.addEventListener('mousedown', StartDrag);
  });
  for(let i = 1; i < QuickLinkRedirectButtonParent.length; i++){
    QuickLinkRedirectButtonParent[i].querySelector("#LinksRedirect").addEventListener('click', QuickLinkRedirect);
    QuickLinkRedirectButtonParent[i].querySelector("#LinksRedirect").addEventListener('mouseover', QuickLinkHover);
    QuickLinkRedirectButtonParent[i].querySelector("#LinksRedirect").addEventListener('mouseout', QuickLinkHoverOut);
  }
  document.getElementById("LinksAddButton").addEventListener('click', QuickLinkAdd);
}

var Quicklinks = [];
function NewBuildQuickLinks(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color){

  var newLink = new Quicklink(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color);
  Quicklinks.push(newLink);
}

NewBuildQuickLinks('Title', 'Url', 'T_Color', 'TH_Color', 'BG_Color', 'BGH_Color');
console.log(Quicklinks[0].title, Quicklinks[0].url, Quicklinks[0].title);
function Quicklink(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color){
  this.title = Title;
  this.url = Url;
  this.tc = T_Color;
  this.thc = TH_Color;
  this.bgc = BG_Color;
  this.bghc = BGH_Color;
  console.log(this.title, this.url, this.tc, this.thc, this.bgc, this.bghc);
}

var FileTarget = "../../static/search/userSavedLinks.txt";
Load_Users_HyperLinks(FileTarget);
var FileTarget2 = "./userWrittenLinks.txt";
Rewrite_User_HyperLinks(FileTarget2);
var Link_URL_Storage = new Array(30);
var Link_Title_Storage = new Array(30);

var Link_T_Color_Storage = new Array(30);
var Link_TH_Color_Storage = new Array(30);
var Link_BG_Color_Storage = new Array(30);
var Link_BGH_Color_Storage = new Array(30);

var Temp_Values = new Array(6);
async function Load_Users_HyperLinks(FileToRead){

    const inFS = new FileReader();
    inFS.addEventListener('load', (e) => {
      const file = e.target.result;
      const lines = file.split(/[\r\n]+/g);
      console.log(lines);
      console.log(lines.length);
      CurrentLink = lines.length -1;
      console.log(lines[0],lines[1],lines[2],lines[3],lines[4],lines[5]);
      for(let i = 0; i < lines.length; i++){
        var address1 = 0;
        var address2 = 0;
        let arrayLocation = 0;
        console.log(lines[i].length);
        for(let j = 0; j <= lines[i].length; j++){
          if(lines[i].at(j) == '|'){
            address2 = j;
            console.log(address1, address2, arrayLocation, lines[i].slice(address1, address2));
            Temp_Values[arrayLocation] = lines[i].slice(address1, address2);
            arrayLocation += 1;
            address1 = address2 +1;
          }
        }
        
        Link_URL_Storage[i] = Temp_Values[0];
        Link_Title_Storage[i] = Temp_Values[1];
        Link_BG_Color_Storage[i] = Temp_Values[2];
        Link_BGH_Color_Storage[i] = Temp_Values[3];
        Link_T_Color_Storage[i] = Temp_Values[4];
        Link_TH_Color_Storage[i] = Temp_Values[5];
        
        console.log(Temp_Values[0], Temp_Values[1], Temp_Values[2], Temp_Values[3], Temp_Values[4], Temp_Values[5]);
      }
      document.getElementById("LinksDiv").innerHTML = "";
      BuildQuickLinks(lines.length);
    });
    let response = await fetch(FileToRead);
    let data = await response.blob();
    inFS.readAsText(data);
    inFS.destroy;
}

async function Rewrite_User_HyperLinks(FileToWrite){
  /*
  const outFS = new FileSystemWritableFileStream();

    let response = await fetch(FileToWrite);
    let data = await response.blob();
    await response.body.pipeTo(FileToWrite);
    const idk1 = data.createWritable();
*/

  let line;
  let paragraph = '';

    for(let i = 0; i < CurrentLink - 1; i++){
      line = Link_URL_Storage[i] + "|" + Link_Title_Storage[i] + "|" + Link_BG_Color_Storage[i] + "|" + Link_BGH_Color_Storage[i] + "|" + Link_T_Color_Storage[i] + "|" + Link_TH_Color_Storage[i] + "|\n";
      paragraph += line;
    }
    console.log(paragraph);
    /*
    outFS.write(paragraph);
    outFS.destroy;*/
}

function BuildQuickLinks(NumberOfQuickLinks){ //on page load
    let p = document.getElementById("LinksDiv");
    //p.innerHTML = "";

    p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
    p.children[0].appendChild(createNewElement('div', 'LinksAddButton', null));
    p.children[0].children[0].innerHTML = '+';
    p.children[0].appendChild(createNewElement('div', null, 'hyperlinktitle'));
    p.children[0].children[1].innerHTML = 'add';

    document.getElementById("LinksAddButton").addEventListener('click', QuickLinkAdd);

    for(var i = 0; i < NumberOfQuickLinks; i++){
      let char = Link_Title_Storage[i].at(0);
      
      p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
      p.children[i+1].appendChild(createNewElement('div', null, null));
      p.children[i+1].children[0].style.display = "inline-flex";
      p.children[i+1].children[0].appendChild(createNewElement('button', null, 'LinkDeleteButton'));
      p.children[i+1].children[0].children[0].innerHTML = 'close';
      p.children[i+1].children[0].appendChild(createNewElement('button', null, 'LinkEditButton'));
      p.children[i+1].children[0].children[1].innerHTML = 'menu';

      let EV = p.children[i+1].getElementsByClassName("LinkDeleteButton");
      EV[0].addEventListener('click', QuickLinkRemove);
      EV = p.children[i+1].getElementsByClassName("LinkEditButton");
      EV[0].addEventListener('click', QuickLinkEdit);
      
      p.children[i+1].appendChild(createNewElement('p', 'LinksRedirect', null));
      p.children[i+1].children[1].innerHTML = char;
      p.children[i+1].children[1].style.color = Link_T_Color_Storage[i];
      p.children[i+1].children[1].style.backgroundColor = Link_BG_Color_Storage[i];
      EV = p.children[i+1].querySelector("#LinksRedirect");
      EV.addEventListener('click', QuickLinkRedirect);
      EV.addEventListener('mouseover', QuickLinkHover);
      EV.addEventListener('mouseout', QuickLinkHoverOut);
      p.children[i+1].addEventListener('mousedown', StartDrag);

      p.children[i+1].appendChild(createNewElement('p', null, 'hyperlinktitle'));
      p.children[i+1].children[2].innerHTML = Link_Title_Storage[i];
      }
      /*Array.from(document.querySelectorAll('.HyperlinkStyle')).forEach(function(element) {
        element.addEventListener('mousedown', StartDrag);
      });*/
}
var LinkDragLocation;
var StartDrag = function(){
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinkStyle'), this);
  if(location != 0){
    document.addEventListener('mousemove', QuickLinkReposition);
    document.addEventListener('mouseup', StopDrag);
    this.style.border = '1px solid ' + SecondaryBorderColor;
    this.style.boxShadow = ("0px 0px 4px 4px " + DropShadowColor);
    this.style.backgroundColor = BorderColor;
    this.style.zIndex = '2';
    LinkDragLocation = location;
    console.log(Link_BGH_Color_Storage[location], Link_BG_Color_Storage[location], Link_TH_Color_Storage[location], Link_T_Color_Storage[location]);
    this.style.transition = "0s";
  }
}
var StopDrag = function(){
  document.removeEventListener('mousemove', QuickLinkReposition);
  document.removeEventListener('mouseup', StopDrag);
  document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.border = '0px solid #ececec';

  document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.border = '0px solid #ffffff';
  document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.boxShadow = "none";
  document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.backgroundColor = "transparent";




  if((x2-x1) > 0){
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.transition = ".2s";
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.left = Math.floor((x2-x1)/102)* 102;
    
    var S1 = Link_URL_Storage[LinkDragLocation-1];
    var S2 = Link_Title_Storage[LinkDragLocation-1];
    var S3 = Link_T_Color_Storage[LinkDragLocation-1];
    var S4 = Link_TH_Color_Storage[LinkDragLocation-1];
    var S5 = Link_BG_Color_Storage[LinkDragLocation-1];
    var S6 = Link_BGH_Color_Storage[LinkDragLocation-1];

    let Index1 = Math.floor((x2-x1)/102) + LinkDragLocation;
    document.querySelector('.HyperlinkStyle').style.zIndex = '1';
    //let Index2 = LinkDragLocation - Math.floor((x1-x2)/102);
  setTimeout(() =>{
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.zIndex = 'auto';
  for(let i = LinkDragLocation; i < Index1; i++){
    console.log(Math.floor((x2-x1)/102, i));
    //document.querySelectorAll('.HyperlinkStyle')[i].style.backgroundColor = "red";
    
    Link_URL_Storage[i-1] = Link_URL_Storage[i];
    Link_Title_Storage[i-1] = Link_Title_Storage[i];
    Link_T_Color_Storage[i-1] = Link_T_Color_Storage[i];
    Link_TH_Color_Storage[i-1] = Link_TH_Color_Storage[i];
    Link_BG_Color_Storage[i-1] = Link_BG_Color_Storage[i];
    Link_BGH_Color_Storage[i-1] = Link_BGH_Color_Storage[i];

    document.querySelectorAll('.HyperlinkStyle')[i].style.transition = "0s";
    let Element = document.querySelectorAll('.HyperlinkStyle')[i];
    Element.querySelector('#LinksRedirect').style.backgroundColor = Link_BG_Color_Storage[i];
    Element.querySelector('#LinksRedirect').innerHTML = Link_Title_Storage[i].at(0).toUpperCase();
    Element.querySelector('#LinksRedirect').style.color = Link_T_Color_Storage[i];
    Element.querySelector('.hyperlinktitle').innerHTML = Link_Title_Storage[i];

  }

  Link_URL_Storage[Index1 - 1] = S1;
  Link_Title_Storage[Index1 - 1] = S2;
  Link_T_Color_Storage[Index1 - 1] = S3;
  Link_TH_Color_Storage[Index1 - 1] = S4;
  Link_BG_Color_Storage[Index1 - 1] = S5;
  Link_BGH_Color_Storage[Index1 - 1] = S6;

  document.querySelectorAll('.HyperlinkStyle')[Index1].style.transition = "0s";
  let Element = document.querySelectorAll('.HyperlinkStyle')[Index1];
  Element.querySelector('#LinksRedirect').style.backgroundColor = Link_BG_Color_Storage[Index1 - 1];
  Element.querySelector('#LinksRedirect').innerHTML = Link_Title_Storage[Index1 - 1].at(0).toUpperCase();
  Element.querySelector('#LinksRedirect').style.color = Link_T_Color_Storage[Index1 - 1];
  Element.querySelector('.hyperlinktitle').innerHTML = Link_Title_Storage[Index1 - 1];
}, 300);
  }else if((x2-x1) < 0){
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.transition = ".3s";
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.left = -Math.floor((x1-x2)/102) * 102;
  }
  setTimeout(() => {
    for(let i = 1; i <= CurrentLink +1; i++){
      //document.querySelectorAll('.HyperlinkSt1yle')[i].style.transition = "0s";
      document.querySelectorAll('.HyperlinkStyle')[i].style.left = "0px";
      h = false;
      x1 = 0;
      x2 = 0;
    }
  }, 300);
}

  var h = false;
  var x1;
  var x2;

var QuickLinkReposition = function({pageX}){

  if(h == false){
    x1 = parseInt(pageX);
    h = true;
  }else{
    x2 = parseInt(pageX);
    if((x2-x1) > 0){
      let LinkOffset = Math.floor((x2-x1)/102);
      console.log('z',LinkOffset)
      
      for(let i = (LinkDragLocation+1); i <= (LinkOffset+LinkDragLocation); i++){
        document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
        document.querySelectorAll('.HyperlinkStyle')[i].style.left = -102;
      }
      for(let i = LinkDragLocation+LinkOffset+1; i <= CurrentLink+1; i++){
        document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
        document.querySelectorAll('.HyperlinkStyle')[i].style.left = 0;
      }
      for(let i = 1; i < LinkDragLocation; i++){
        document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
        document.querySelectorAll('.HyperlinkStyle')[i].style.left = 0;
      }
    }else if(x2-x1 < 0){
      let LinkOffset = Math.floor((x1-x2)/102) + 1;
      console.log('z2',LinkOffset)
      for(let i = (LinkDragLocation-1); i > (LinkDragLocation-LinkOffset); i--){
        if(i != 0){
          document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
          document.querySelectorAll('.HyperlinkStyle')[i].style.left = 102;
        }
      }
      for(let i = LinkDragLocation-LinkOffset ; i > 0; i--){
        document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
        document.querySelectorAll('.HyperlinkStyle')[i].style.left = 0;
      }
      for(let i = LinkDragLocation+1; i <= CurrentLink+1; i++){
        document.querySelectorAll('.HyperlinkStyle')[i].style.transition = ".2s";
        document.querySelectorAll('.HyperlinkStyle')[i].style.left = 0;
      }
    }
    document.querySelectorAll('.HyperlinkStyle')[LinkDragLocation].style.left = x2 - x1;
  }
  console.log("x1", x1, x2);




}





var QuickLinkRedirect = function(){
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.querySelector(".hyperlinktitle"));
  location--;
  window.location.replace(Link_URL_Storage[location]);
}
var QuickLinkHover = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;
  p.querySelector("#LinksRedirect").style.color = Link_TH_Color_Storage[location];
  p.querySelector("#LinksRedirect").style.backgroundColor = Link_BGH_Color_Storage[location];
}

var QuickLinkHoverOut = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;
  p.querySelector("#LinksRedirect").style.color = Link_T_Color_Storage[location];
  p.querySelector("#LinksRedirect").style.backgroundColor = Link_BG_Color_Storage[location];
}
var QuickLinkRemove = function(){

  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.parentNode.querySelector(".hyperlinktitle"));
  location--;
  for(let i = location; i < CurrentLink; i++){
  
    Link_URL_Storage[i] = Link_URL_Storage[i+1];
    Link_Title_Storage[i] = Link_Title_Storage[i+1];
    Link_T_Color_Storage[i] = Link_T_Color_Storage[i+1];
    Link_TH_Color_Storage[i] = Link_TH_Color_Storage[i+1];
    Link_BG_Color_Storage[i] = Link_BG_Color_Storage[i+1];
    Link_BGH_Color_Storage[i] = Link_BGH_Color_Storage[i+1];
  }
    Link_URL_Storage[CurrentLink] = "";
    Link_Title_Storage[CurrentLink] = "";
    Link_T_Color_Storage[CurrentLink] = "";
    Link_TH_Color_Storage[CurrentLink] = "";
    Link_BG_Color_Storage[CurrentLink] = "";
    Link_BGH_Color_Storage[CurrentLink] = "";

  let p = document.getElementById("LinksDiv");

  parent2 = this.parentNode.parentNode;
  parent2.style.width = "0px";
  parent2.style.opacity = 0;
  parent2.style.margin = "0px 10px 0px 0px";
  parent2.style.padding = "0px";
  
  setTimeout(() => {
    document.getElementsByClassName("LinkEditButton")[location].removeEventListener('click', QuickLinkEdit);
    document.getElementsByClassName("LinkDeleteButton")[location].removeEventListener('click', QuickLinkRemove);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('click', QuickLinkRedirect);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('mouseover', QuickLinkHover);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('mouseout', QuickLinkHoverOut);
    p.removeChild(parent2);
   }, 200 );
  
  CurrentLink--;
  CheckHyperlinkArrangment();
  document.getElementById("LinksDiv").style.width = HyperlinkDivWidth;
  document.getElementById("LinksDiv").style.height = HyperlinkDivHeight;
}
var QuickLinkAdd = function(){
  document.getElementById("SearchBar").style.border = "0px solid transparent";
  LinksAddShow();
  if(PageState == 1){
    HyperLinksHide();
  }
  console.log(CurrentLink);
  SearchBarHide();
  document.getElementById("LinkTitle").innerHTML = "Add Link";
}
var CurrentLocation = 0;
var QuickLinkEdit = function(){
  document.getElementById("SearchBar").style.border = "0px solid transparent";
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.parentNode.querySelector(".hyperlinktitle"));
  location--;
  console.log(location)
  document.getElementById("LinkTitle").innerHTML = "Edit Link";

  document.getElementById("LinkAddTitle").value = Link_Title_Storage[location];
  document.getElementById("LinkAddURL").value = Link_URL_Storage[location];
  
  document.getElementById("LinkTColorPicker").value = Link_T_Color_Storage[location];
  document.getElementById("LinkTHColorPicker").value = Link_TH_Color_Storage[location];
  document.getElementById("LinkBGColorPicker").value = Link_BG_Color_Storage[location];
  document.getElementById("LinkBGHColorPicker").value = Link_BGH_Color_Storage[location];


  LinksAddShow();
  SearchBarHide();
  CurrentLocation = location;
}
//QuickLinksSave
document.getElementById("CreateLinkB").addEventListener("click", (e) => {
  e.preventDefault();

  var HyperLinkTitle = document.getElementById("LinkAddTitle");
  console.log(CurrentLink);
  var TitleError = false;
  var URLError = false;
    
  if(HyperLinkTitle.value == ""){
    TitleError = true;
    HyperLinkTitle.placeholder = "Error";
    setTimeout(() => {
      HyperLinkTitle.placeholder = "Snow";
    }, 1000 );

  }else{
    TitleError = false;
  }

  var HyperLinkURL = document.getElementById("LinkAddURL");
  var HyperLinkTitleColor = document.getElementById("LinkTColorPicker").value;
  var HyperLinkTitleHoverColor = document.getElementById("LinkTHColorPicker").value;
  var HyperLinkBackgroundColor = document.getElementById("LinkBGColorPicker").value;
  var HyperLinkBackgroundHoverColor = document.getElementById("LinkBGHColorPicker").value;
  var URLError;
  
  if(HyperLinkURL.value == ""){
    URLError = true;
    HyperLinkURL.placeholder = "Error";
    setTimeout(() => {
      HyperLinkURL.placeholder = "example.snow.com";
    }, 1000 );
  }else{
    URLError = false;
  }

  p = document.getElementById("LinksDiv");
  
  let CreatorTitle = document.getElementById("LinkTitle").innerHTML;
  if(TitleError == false && URLError == false){
    CurrentLink++;
    if(CreatorTitle == "Edit Link"){
      Link_URL_Storage[CurrentLocation] = HyperLinkURL.value;
      Link_Title_Storage[CurrentLocation] = HyperLinkTitle.value;
      Link_T_Color_Storage[CurrentLocation] = HyperLinkTitleColor;
      Link_TH_Color_Storage[CurrentLocation] = HyperLinkTitleHoverColor;
      Link_BG_Color_Storage[CurrentLocation] = HyperLinkBackgroundColor;
      Link_BGH_Color_Storage[CurrentLocation] = HyperLinkBackgroundHoverColor;

      let char = Link_Title_Storage[CurrentLocation].at(0);
      
      p.children[CurrentLocation + 1].children[1].style.color = Link_T_Color_Storage[CurrentLocation];
      p.children[CurrentLocation + 1].children[1].style.backgroundColor = Link_BG_Color_Storage[CurrentLocation];
      p.children[CurrentLocation + 1].children[1].innerHTML = char.toUpperCase();
      p.children[CurrentLocation + 1].children[2].innerHTML = Link_Title_Storage[CurrentLocation];
      
      
    }else if(CreatorTitle == "Add Link"){
      Link_URL_Storage[CurrentLink] = HyperLinkURL.value;
      Link_Title_Storage[CurrentLink] = HyperLinkTitle.value;
      Link_T_Color_Storage[CurrentLink] = HyperLinkTitleColor;
      Link_TH_Color_Storage[CurrentLink] = HyperLinkTitleHoverColor;
      Link_BG_Color_Storage[CurrentLink] = HyperLinkBackgroundColor;
      Link_BGH_Color_Storage[CurrentLink] = HyperLinkBackgroundHoverColor;

      let char = Link_Title_Storage[CurrentLink].at(0);
      
      p.appendChild(createNewElement('div', null, 'HyperLinkStyle'));
      p.children[CurrentLink+1].appendChild(createNewElement('div', null, null));
      p.children[CurrentLink+1].children[0].style.display = "inline-flex";
      p.children[CurrentLink+1].children[0].appendChild(createNewElement('button', null, 'LinkDeleteButton'));
      p.children[CurrentLink+1].children[0].children[0].innerHTML = 'close';
      p.children[CurrentLink+1].children[0].appendChild(createNewElement('button', null, 'LinkEditButton'));
      p.children[CurrentLink+1].children[0].children[1].innerHTML = 'menu';

      let EV = p.children[CurrentLink+1].getElementsByClassName("LinkDeleteButton");
      EV[0].addEventListener('click', QuickLinkRemove);
      EV = p.children[CurrentLink+1].getElementsByClassName("LinkEditButton");
      EV[0].addEventListener('click', QuickLinkEdit);
      
      p.children[CurrentLink + 1].appendChild(createNewElement('p', 'LinksRedirect', null));
      p.children[CurrentLink + 1].children[1].innerHTML = char.toUpperCase();
      p.children[CurrentLink + 1].children[1].style.color = Link_T_Color_Storage[CurrentLink];
      p.children[CurrentLink + 1].children[1].style.backgroundColor = Link_BG_Color_Storage[CurrentLink];
      EV = p.children[CurrentLink + 1].querySelector("#LinksRedirect");
      
      EV.addEventListener('click', QuickLinkRedirect);
      EV.addEventListener('mouseover', QuickLinkHover);
      EV.addEventListener('mouseout', QuickLinkHoverOut);
      p.children[CurrentLink + 1].addEventListener('mousedown', StartDrag);

      p.children[CurrentLink + 1].appendChild(createNewElement('p', null, 'hyperlinktitle'));
      p.children[CurrentLink + 1].children[2].innerHTML = Link_Title_Storage[CurrentLink];
    
    }
    LinksAddHide();
    HyperLinksShow();
    SearchBarShow();
    LinksClear();

    document.getElementById("LinkTitle").innerHTML = "inactive";
  }
})










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

document.getElementById("TitleSmall").addEventListener("click", (e) => {
  e.preventDefault();
  PageState = 1;
  document.getElementById("AfterEnter").scrollTop = 0;
  ResizeUI();
});

function SearchBarShow(){
    document.getElementById("SearchBar").style.height = "44px";
}
function SearchBarHide(){
    document.getElementById("SearchBar").style.height = "0px";
}

var WindowResizeTimeout;
window.addEventListener("resize", (e) =>{
    clearTimeout(WindowResizeTimeout);
    WindowResizeTimeout = setTimeout(ResizeUI, 200);

    if(window.innerWidth >= 830){
        ResizeUI();
    }else if(window.innerWidth >= 1050){
        ResizeUI();
    }else if(window.innerWidth < 1050){
      ResizeUI();
    }
    SetScroll();

});

function ResizeUI(){
    document.getElementById('SearchAndLinks').style.transition = ".3s";
    if(PageState == 2){ 
        //SearchBar Reposition and Resize
        document.getElementById("SearchAndLinks").style.top = "0px";
        document.getElementById("TitleBig").style.padding = "0px";
        document.getElementById("TitleBig").style.height = "0px";
        document.getElementById("TitleBig").style.opacity = "0";
        
        if(window.innerWidth < 830){
            document.getElementById("SearchAndLinks").style.margin = "66px auto 0px auto";
            document.getElementById("LinksDiv").style.margin = "112px auto 0px auto";
            document.getElementById("AfterEnter").style.height = window.innerHeight - (122);

            document.getElementById("AE").style.transition = ".3s";
            document.getElementById("AE").style.top = "122px";
            document.getElementById("AE2").style.transition = ".3s";
            document.getElementById("AE2").style.top = "122px";
            setTimeout(() => {
              document.getElementById("AE").style.transition = "0s";
              document.getElementById("AE2").style.transition = "0s";
            }, 400 );
        }else if(window.innerWidth > 830){
            document.getElementById("SearchAndLinks").style.margin = "10px auto 0px auto";
            document.getElementById("LinksDiv").style.margin = "57px auto 0px auto";
          
            document.getElementById("AfterEnter").style.height = window.innerHeight - (67);

            document.getElementById("AE").style.transition = ".3s";
            document.getElementById("AE").style.top = "67px";
            document.getElementById("AE2").style.transition = ".3s";
            document.getElementById("AE2").style.top = "67px";
            setTimeout(() => {
              document.getElementById("AE").style.transition = "0s";
              document.getElementById("AE2").style.transition = "0s";
            }, 400 );
        }
        /*Title Reposition and resize */
        document.querySelector('#TitleSmall').style.opacity = 1;
        if(window.innerWidth < 830){
            document.querySelector('#TitleSmall').style.left = "10px";
        }else  if(window.innerWidth > 830 && window.innerWidth <= 1050){
            document.querySelector('#TitleSmall').style.left = "-90px";
        }else if(window.innerWidth > 1050){
            document.querySelector('#TitleSmall').style.left = "10px";
        }
        document.querySelector('#LinksDiv').style.height = "0px";
        document.querySelector('#LinksCreater').style.height = "0px";
        document.querySelector('#LinksCreater').style.padding = "0px 0px";
        document.querySelector('#SearchBar').style.height = "44px";
        document.getElementById("LinksDiv").style.zIndex = "1";
        document.getElementById("SearchAndLinks").style.border = "0px solid transparent";
        
    }else if(PageState == 1){
        //document.querySelector('#TitleSmall').style.opacity = 0;
        document.getElementById("SearchAndLinks").style.top = "280px";
        document.getElementById("SearchAndLinks").style.margin = "10px auto 0px auto";
        document.getElementById("LinksDiv").style.margin = "65px auto 0px auto";
        document.getElementById('AfterEnter').style.height = "0px";

        document.getElementById("TitleBig").style.padding = "150px 0px 30px 0px";
        document.getElementById("TitleBig").style.height = "100px";
        document.getElementById("TitleBig").style.opacity = "1";
        document.querySelector('#TitleSmall').style.left = "-200px";
        document.querySelector('#TitleSmall').style.opacity = 0;

        document.querySelector('#LinksDiv').style.height = "120px";

        document.getElementById("AE").style.top = "67px";
        document.getElementById("AE2").style.top = "67px";
    }
}



var HyperlinkDivHeight = "122px";
var HyperlinkDivWidth;
function CheckHyperlinkArrangment(){
  if(PageState == 1){

    //height
    if(CurrentLink < 9){
      HyperlinkDivHeight = "122px";
    }else if(CurrentLink < 19){
      HyperlinkDivHeight = "244px";
    }else{
       HyperlinkDivHeight = "366px";
    }

    //width

    if(CurrentLink < 9){
       HyperlinkDivWidth = "auto";
    }else{
       HyperlinkDivWidth = "1020px";
    }
    
  }else if(PageState == 2){
    //height
    if(CurrentLink < 14){
      HyperlinkDivHeight = "122px";
    }else{
      HyperlinkDivHeight = "122px";
    }
    //width
    
    if(CurrentLink < 14){
      HyperlinkDivWidth = "auto";
    }else{
       HyperlinkDivWidth = "1530px";
    }
  }
  
  if(CurrentLink == 28){
    setTimeout(() => {
      document.getElementById("LinksAddition").style.width = "90px";
      document.getElementById("LinksAddition").style.margin = "0px 5px 10px 5px";
      document.getElementById("LinksAddition").style.padding = "1px";
    }, 100 );
  }else if(CurrentLink == 29){
    document.getElementById("LinksAddition").style.width = "0px";
    document.getElementById("LinksAddition").style.margin = "0px";
    document.getElementById("LinksAddition").style.padding = "0px";
      
  }
}


function HyperLinksShow(){
    var HyperLinks = document.getElementById("LinksDiv"); 
    HyperLinks.style.height = HyperlinkDivHeight;
    HyperLinks.style.width = HyperlinkDivWidth;
    HyperLinks.style.opacity = 1;

    if(document.getElementById("Search").value == ''){
      document.getElementById("SearchBar").style.border = "1px solid transparent";
    }else{
      document.getElementById("SearchBar").style.border = "1px solid" + BorderColor;
    }

    if(PageState == 2){
      document.getElementById("LinksDiv").style.marginBottom = "0px";
      document.getElementById("AfterEnter").style.top = "0px";
      if(window.innerWidth < 830){
        document.getElementById('AfterEnter').style.height = window.innerHeight - (244) + 'px';
        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "244px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "244px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }else if(window.innerWidth < 1050){
        document.getElementById('AfterEnter').style.height = window.innerHeight - (189) + 'px';
        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "189px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "189px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }else if(window.innerWidth >= 1050){
        document.getElementById("AfterEnter").style.height = window.innerHeight - (189) + 'px';
        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "189px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "189px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }
    }
  setTimeout(() => {
    if(PageState == 2){
      SetScroll();
    }
  }, 300 );
}

function HyperLinksHide(){

    document.querySelector('#LinksDiv').style.height = "0px";
    document.querySelector('#LinksDiv').style.opacity = 0;

    if(PageState == 2){
      document.getElementById("LinksDiv").style.marginBottom = "0px";
      document.getElementById("AfterEnter").style.top = "0px";
      if(window.innerWidth < 830){
        document.getElementById('AfterEnter').style.height = window.innerHeight - (122) + 'px';
        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "122px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "122px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }else if(window.innerWidth < 1050){
        document.getElementById('AfterEnter').style.height = window.innerHeight - (67) + 'px';
        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "67px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "67px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }else if(window.innerWidth >= 1050){
        document.getElementById("AfterEnter").style.height = window.innerHeight - (67) + 'px';

        document.getElementById("AE").style.transition = ".3s";
        document.getElementById("AE").style.top = "67px";
        document.getElementById("AE2").style.transition = ".3s";
        document.getElementById("AE2").style.top = "67px";
        setTimeout(() => {
          document.getElementById("AE").style.transition = "0s";
          document.getElementById("AE2").style.transition = "0s";
        }, 400 );
      }
    }
    
  setTimeout(() => {
    if(PageState == 2){
      SetScroll();
    }
  }, 300 );
}


function LinksAddShow(){
    var Creator = document.getElementById("LinksCreater");
    Creator.style.height = "186px";
    Creator.style.padding = "0px 10px";
  
    document.getElementById("LinksDiv").style.zIndex = "-1";
    document.getElementById("SearchAndLinks").style.border = "1px solid" + BorderColor; //DarkMode Affected
    console.log(BorderColor);

    if(PageState == 2){
      document.getElementById("LinksDiv").style.marginBottom = "0px";
    }
}

function LinksAddHide(){
    var Creator = document.getElementById("LinksCreater");
    Creator.style.height = "0px";
    Creator.style.padding = "0px 10px";
  
    document.getElementById("LinksDiv").style.zIndex = "1";
    document.getElementById("SearchAndLinks").style.border = "0px solid transparent";

}
var CurrentLink = 5;

Link_URL_Storage[0] = "https://www.google.com/";
Link_URL_Storage[1] = "https://www.apple.com/";
Link_URL_Storage[2] = "./";
Link_URL_Storage[3] = "https://ttu.blackboard.com/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1";
Link_URL_Storage[4] = "https://webwork.math.ttu.edu/webwork2/f23ynunezm1452s122/";
Link_URL_Storage[5] = "https://www.cengage.com";

Link_Title_Storage[0] = "Google";
Link_Title_Storage[1] = "Apple";
Link_Title_Storage[2] = "System";
Link_Title_Storage[3] = "Black Board";
Link_Title_Storage[4] = "Web Work";
Link_Title_Storage[5] = "Cengage";

Link_T_Color_Storage[0] = "#000000";
Link_T_Color_Storage[1] = "#000000";
Link_T_Color_Storage[2] = "#000000";
Link_T_Color_Storage[3] = "#ffffff";
Link_T_Color_Storage[4] = "#ffffff";
Link_T_Color_Storage[5] = "#ffffff";

Link_TH_Color_Storage[0] = "#A7DDEE";
Link_TH_Color_Storage[1] = "#A7DDEE";
Link_TH_Color_Storage[2] = "#A7DDEE";
Link_TH_Color_Storage[3] = "#2b81be";
Link_TH_Color_Storage[4] = "#2b81be";
Link_TH_Color_Storage[5] = "#2b81be";

Link_BG_Color_Storage[0] = "#f6f6f6";
Link_BG_Color_Storage[1] = "#f6f6f6";
Link_BG_Color_Storage[2] = "#f6f6f6";
Link_BG_Color_Storage[3] = "#2b81be";
Link_BG_Color_Storage[4] = "#2b81be";
Link_BG_Color_Storage[5] = "#2b81be";

Link_BGH_Color_Storage[0] = "#ffffff";
Link_BGH_Color_Storage[1] = "#ffffff";
Link_BGH_Color_Storage[2] = "#ffffff";
Link_BGH_Color_Storage[3] = "#ffffff";
Link_BGH_Color_Storage[4] = "#ffffff";
Link_BGH_Color_Storage[5] = "#ffffff";

function LinksCancel(){
  if(document.getElementById("LinkTitle").innerHTML == "Add Link"){
    //CheckHyperlinkArrangment();
  }
  
  LinksAddHide();
  SearchBarShow();
  HyperLinksShow();
  LinksClear();
}






function LinksClear(){
  document.getElementById("LinkAddTitle").value = "";
  document.getElementById("LinkAddURL").value = "";
  
  document.getElementById("LinkAddTitle").placeholder = "Snow";
  document.getElementById("LinkAddURL").placeholder = "example.snow.com";
}

function ClearURL(){
  document.getElementById("LinkAddURL").value = "";
  document.getElementById("LinkAddURL").placeholder = "example.snow.com";
}

function ClearTitle(){
  document.getElementById("LinkAddTitle").value = "";
  document.getElementById("LinkAddTitle").placeholder = "Snow";
}
const SearchClearButton = document.getElementById("SearchIcon2");
SearchClearButton.addEventListener("click", (e) =>{
    document.getElementById("SearchIcon2").style.width = "0px";
    document.getElementById("SearchIcon2").style.padding = "0px";
    document.getElementById("SearchIcon2").style.borderRight = "1px solid transparent";
    document.getElementById("Search").value = "";

    AutoCompleteKill();
});



var SelectedResult = -1;
var DisplayedResults = -1;
function autocomplete(inp, DataArray) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      if(!document.getElementById("Search").value == ""){
          document.getElementById("SearchIcon2").style.width = "44px";
          document.getElementById("SearchIcon2").style.padding = "7px 10px 7px 12px";
          document.getElementById("SearchIcon2").style.borderRight = " 1px solid" + BorderColor; //Darkmode Affected

          document.getElementById("SearchAndLinks").style.boxShadow = "0px 2px 2px" + DropShadowColor;
          document.getElementById("SearchBar").style.border = "1px solid" + BorderColor; //DarkMode Affected
          HyperLinksHide();

          AutoCompleteCreate();
      }else {
          document.getElementById("SearchIcon2").style.borderRight = " 0px solid" + BorderColor;
          document.getElementById("SearchIcon2").style.width = "0px";
          document.getElementById("SearchIcon2").style.padding = "0px";

          //document.getElementById("SearchAndLinks").style.boxShadow = "";
          document.getElementById("SearchBar").style.border = "1px solid transparent";
          if(PageState == 1){
            HyperLinksShow();
          }
          AutoCompleteKill();
      }
      
  });
  
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {

    var parent = document.getElementById("SearchSuggestions");
    
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/

        if(document.getElementById("Search").value == ""){
            HyperLinksShow();
          
        }else{
          
        if(SelectedResult < DisplayedResults){
          SelectedResult++;
          if(SelectedResult >= -1){
            if(SelectedResult >= 0){
              parent.children[SelectedResult].classList = "sssresult";
            
            }
            if(SelectedResult > 0){
              parent.children[SelectedResult-1].classList = ("ssresult");
            
            }
          }
        }

        }
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/

        if(document.getElementById("Search").value == ""){
          HyperLinksHide();
        
        }else{
          
          if(SelectedResult > 0){
            SelectedResult--;
            if(SelectedResult <= DisplayedResults){
              if(SelectedResult <= DisplayedResults){
                parent.children[SelectedResult + 1].classList = "ssresult";

              }
              if(SelectedResult < DisplayedResults){
                parent.children[SelectedResult].classList = "sssresult";
            
              }
            }
          }else if(SelectedResult == 0){
            SelectedResult--;
            parent.children[0].classList = "ssresult";
          }
        }
        
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        
        if(document.getElementById("Search").value != ""){
          document.getElementById("DisplayedSearch").innerHTML = document.getElementById("Search").value;
          window.history.replaceState('page2', null, 'xx');
        }
        if(DisplayedResults > -1 && SelectedResult > -1){
          parent.childNodes[SelectedResult].id = "SelectedSearch";
          document.getElementById("Search").value = document.getElementById("SelectedSearch").innerHTML;
          AutoCompleteKill();
        }else{
          AutoCompleteKill();
        }
        PageState = 2;
        ResizeUI();
      }  else if (e.keyCode == 27){
         /*If the ESCAPE key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        PageState = 1;
        ResizeUI();
        document.getElementById("AfterEnter").scrollTop = 0;
        AutoCompleteKill();
        
      } else if (e.keyCode == 9){
        e.preventDefault();
        let SearchText = document.getElementById("Search").value;
        let ccccc = SearchText.slice(0, 3);
        console.log(ccccc);
        if(SearchText.slice(0 ,3) == "/g1"){
          gen1();
          console.log("g1");
          SetScroll();
        }else if(SearchText.slice(0 ,3) == "/g2"){
          gen2();
          console.log("g2");
          SetScroll();
        }else if(SearchText.slice(0 ,3) == "/ll"){
          Load_Users_HyperLinks(FileTarget);
          HyperLinksShow();
          console.log("ll");
        }else if(SearchText.slice(0 ,3) == "/zz"){
          zz();
          console.log("zz");
        }
        AutoCompleteKill();
      }
  });
/*execute a function when someone clicks in the document:*/
}

function AutoCompleteCreate(){
  DisplayedResults++;
  
  var parent = document.getElementById("SearchSuggestions");
  parent.innerHTML += '<h class="ssresultB">' + document.getElementById("Search").value + "</h>";
  if(DisplayedResults == 0){
    parent.children[0].style.borderRadius = "21px 21px 21px 21px";
  }else{
    if(DisplayedResults-1 == 0){
      parent.children[0].style.borderRadius = "21px 21px 0px 0px";
    }
    parent.children[DisplayedResults].style.borderRadius = "0px 0px 21px 21px";
    if(DisplayedResults != 1){
      parent.children[DisplayedResults-1].style.borderRadius = "0px";
    }
  }

}
function AutoCompleteKill(){
  document.getElementById("SearchSuggestions").innerHTML = "";
  SelectedResult = -1;
  DisplayedResults = -1;
  if(PageState == 1){
    HyperLinksShow();
  }
  if(document.getElementById("Search").value == ""){
    document.getElementById("SearchBar").style.border = "1px solid transparent";
  }
  document.getElementById("SearchAndLinks").style.boxShadow = "";
  document.getElementById("AE").style.boxShadow = "none";
  
}

var Results = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","One Hundred"];
autocomplete(document.getElementById("Search", Results));











/*Generate Page Results*/

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

function gen1(){
    let d = 0;
    if(window.innerWidth >= 1050){
       d = document.querySelector("#Col1");
    }else if(window.innerWidth < 1050){
       d = document.querySelector("#Col2");
    }
    var l = d.getElementsByClassName("pageResultLink");
    l = l.length;

  //pageResultInformation
    d.appendChild(createNewElement('div', null, 'pageResultLink'));
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('a', null, 'PageLink'));
    d.children[l].children[0].children[0].children[0].href = "https://www.apple.com";
    d.children[l].children[0].children[0].children[0].innerHTML = "Apple.com";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PagePublish'));
    d.children[l].children[0].children[0].children[1].innerHTML = "Published: Eternity";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'PageDescription'));
    d.children[l].children[0].children[0].children[2].innerHTML = "Iphone 12x24 max mini pro negative -2 aliquam malesuada bibendum arcu vitae.     Velit dignissim sodales ut eu sem integer vitae justo. Nisl purus in mollis nunc sed    i";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'Keywords'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Found Keywords: 1,2,3,4";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'MKeywords'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Missing Keywords: 5,6,7,8";
  

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonH'));
    d.children[l].children[2].innerHTML = "description";

    let EL1 = document.getElementsByClassName('pageResultButtonH');
    EL1[l].addEventListener('click', DisplayFlag);
    
}
function gen2(){
    let d = 0;
    if(window.innerWidth >= 1050){
        d = document.querySelector("#Col2");
    }else if(window.innerWidth < 1050){
        d = document.querySelector("#Col1");
    }
    var l = d.getElementsByClassName("pageResultKnowledge");
    l = l.length;
  
    d.appendChild(createNewElement('div', null, 'pageResultKnowledge'));
    d.children[l].appendChild(createNewElement('div', null, 'pageResultInformation'));
    d.children[l].children[0].appendChild(createNewElement('div', null, 'resultPadding'));
    d.children[l].children[0].children[0].appendChild(createNewElement('h', null, 'DeffWordSound'));
    d.children[l].children[0].children[0].children[0].innerHTML = "Deffinition of _____ ";

    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'deffWordIn'));
    d.children[l].children[0].children[0].children[1].innerHTML = "_____ in Chemestry:";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordDeff'));
    d.children[l].children[0].children[0].children[2].innerHTML = "- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse     cillum    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non    proident,    sunt in culpa qui officia deserunt mollit anim id est laborum.";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'WordSyn'));
    d.children[l].children[0].children[0].children[3].innerHTML = "Synonyms: ";
    d.children[l].children[0].children[0].appendChild(createNewElement('p', null, 'etymology'));
    d.children[l].children[0].children[0].children[4].innerHTML = "Etymology of _____ ";
  

    //description
    
    //pageResultDisclaimer
    d.children[l].appendChild(createNewElement('div', null, 'pageResultDisclaimer'));
    d.children[l].children[1].appendChild(createNewElement('div', null, 'resultPadding'));

    d.children[l].appendChild(createNewElement('button', null, 'pageResultButtonK'));
    d.children[l].children[2].innerHTML = "description";

    let EL1 = document.getElementsByClassName('pageResultButtonK');
    EL1[l].addEventListener('click', DisplayFlag);
    
}


document.getElementById("AfterEnter").addEventListener("scroll", (e) => {
  console.log(document.getElementById("AfterEnter").scrollTop);
  //console.log(document.getElementById("AfterEnter").scrollTop);
  
  SetScroll();
  
});
function SetScroll(){
  if(document.getElementById("AfterEnter").scrollTop > 0){

  document.getElementById("AE").style.transition = "0s";
  document.getElementById("AE2").style.transition = "0s";
  let FullHeight = document.getElementById("AfterEnter").scrollHeight;
  let ShownHeight = document.getElementById("AfterEnter").offsetHeight;
  let HiddenHeight = FullHeight - ShownHeight;
  let x = window.innerWidth;
  let step = x/HiddenHeight;

  document.getElementById("AE2").style.width = document.getElementById("AfterEnter").scrollTop * step + "px";
  //document.getElementById("AE").style.width = (parseInt(window.innerWidth) - (document.getElementById("AfterEnter").scrollTop * x/(FullHeight - ShownHeight))) + 'px';

  //document.getElementById("AE").style.boxShadow = "inset 0 7px 9px -8px rgba(0, 0, 0, 1)";
  document.getElementById("AE2").style.boxShadow = "inset 0 7px 9px -8px rgba(43, 129, 190, 1)";
  let z = 1;
  }else if(document.getElementById("AfterEnter").scrollTop < 1){
    document.getElementById("AE").style.boxShadow = "none";
    document.getElementById("AE2").style.boxShadow = "none";
  }
}
zz();