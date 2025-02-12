
var FileTarget2 = "./userWrittenLinks.txt";
Rewrite_User_HyperLinks(FileTarget2);

var CurrentLink = 5;

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
        //line = Link_URL_Storage[i] + "|" + Link_Title_Storage[i] + "|" + Link_BG_Color_Storage[i] + "|" + Link_BGH_Color_Storage[i] + "|" + Link_T_Color_Storage[i] + "|" + Link_TH_Color_Storage[i] + "|\n";
        paragraph += line;
      }
      console.log(paragraph);
      /*
      outFS.write(paragraph);
      outFS.destroy;*/
  }


/*  Add Link
    Edit Link
    Remove Link
    Reposition Link
*/


/* Link Dragging and Droping*/

var LinkDragLocation;
var StartDrag = function(){
  this.classList.add("dragging");
  this.style.backgroundColor = BorderColor; //from SearchTest_Dark.js
  this.style.border = "1px solid" + SecondaryBorderColor;  //from SearchTest_Dark.js
  this.style.boxShadow = "0px 0px 4px 4px " + DropShadowColor; //from SearchTest_Dark.js
  this.classList.add("dragging");
  this.addEventListener("dragend", StopDrag);
}

var StopDrag = function(){
  this.classList.remove("dragging");
  this.style.backgroundColor = "transparent"; //from SearchTest_Dark.js
  this.style.border = "1px solid transparent";  //from SearchTest_Dark.js
  this.style.boxShadow = ""; //from SearchTest_Dark.js
}
var QuickLinkReposition = function({pageX}){

}



const sortableList = document.querySelector("#LinksDiv");
const items = sortableList.querySelectorAll(".HyperLinkStyle");
/*
items.forEach(item => {
    item.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});*/

var initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...sortableList.querySelectorAll(".HyperLinkStyle:not(.dragging)")];
    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
      //console.log(items.offsetLeft, sibling ,sibling.offsetLeft, sibling.offsetWidth );
        let pos = Math.floor((e.clientX - ((window.innerWidth - document.getElementById("LinksDiv").offsetWidth) / 2))/114);
        console.log(sibling.offsetWidth, window.innerWidth, sibling.offsetLeft, e.clientX);
        //return e.clientX <= pos * 114;
        return e.clientX <= sibling.offsetLeft + sibling.offsetWidth + sortableList.offsetLeft - 57;
    });
    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
}


sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());
/* End of Dragging QuickLinks */




var QuickLinkRedirect = function(){
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.querySelector(".hyperlinktitle"));
  location--;
  let c = this.parentNode.querySelector("#LinksRedirect");
  window.location.assign(c.getAttribute("url"));
}

var QuickLinkHover = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;

  let c = p.querySelector("#LinksRedirect");
  c.style.color = c.getAttribute("th_c");
  c.style.backgroundColor = c.getAttribute("bgh_c");
}

var QuickLinkHoverOut = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;

  let c = p.querySelector("#LinksRedirect");
  c.style.color = c.getAttribute("t_c");
  c.style.backgroundColor = c.getAttribute("bg_c");
}



var QuickLinkRemove = function(){

  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.parentNode.querySelector(".hyperlinktitle"));
  location--;
  let p = document.getElementById("LinksDiv");
  parent2 = this.parentNode.parentNode;
  parent2.style.transition = '.2s';
  parent2.style.width = "0px";
  parent2.style.opacity = 0;
  parent2.style.margin = "0px 10px 0px 0px";
  parent2.style.padding = "0px";

  CurrentLink--;
  CheckHyperlinkArrangment()

  setTimeout(() => {
    document.getElementsByClassName("LinkEditButton")[location].removeEventListener('click', QuickLinkEdit);
    document.getElementsByClassName("LinkDeleteButton")[location].removeEventListener('click', QuickLinkRemove);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('click', QuickLinkRedirect);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('mouseover', QuickLinkHover);
    document.getElementById("LinksDiv").children[location+1].querySelector("#LinksRedirect").removeEventListener('mouseout', QuickLinkHoverOut);
    p.removeChild(parent2);
    document.getElementById("LinksDiv").style.width = HyperlinkDivWidth;
    document.getElementById("LinksDiv").style.height = HyperlinkDivHeight;
   }, 200);
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
  if(PageState == 1){
    HyperLinksHide();
  }
  document.getElementById("SearchBar").style.border = "0px solid transparent";
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.parentNode.querySelector(".hyperlinktitle"));
  location--;

  /*document.getElementById("LinkTitle").innerHTML = "Edit Link";
  document.getElementById("LinkAddTitle").value = Quicklink_Storage[location].title;
  document.getElementById("LinkAddURL").value = Quicklink_Storage[location].url;
  
  document.getElementById("LinkTColorPicker").value = Quicklink_Storage[location].tc;
  document.getElementById("LinkTHColorPicker").value = Quicklink_Storage[location].thc;
  document.getElementById("LinkBGColorPicker").value = Quicklink_Storage[location].bgc;
  document.getElementById("LinkBGHColorPicker").value = Quicklink_Storage[location].bghc;*/

  document.getElementById("LinkTitle").innerHTML = "Edit Link";
  let c = this.parentNode.parentNode.querySelector("#LinksRedirect");

  document.getElementById("LinkAddTitle").value = this.parentNode.parentNode.querySelector(".hyperlinktitle").innerHTML;
  document.getElementById("LinkAddURL").value = c.getAttribute("url")
  
  document.getElementById("LinkTColorPicker").value = c.getAttribute("t_c")
  document.getElementById("LinkTHColorPicker").value = c.getAttribute("th_c")
  document.getElementById("LinkBGColorPicker").value = c.getAttribute("bg_c")
  document.getElementById("LinkBGHColorPicker").value = c.getAttribute("bgh_c")

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

    if(CreatorTitle == "Edit Link"){

      p.children[CurrentLocation + 1].children[1].setAttribute("url", HyperLinkURL.value);
      p.children[CurrentLocation + 1].children[1].setAttribute("t_c", HyperLinkTitleColor);
      p.children[CurrentLocation + 1].children[1].setAttribute("th_c", HyperLinkTitleHoverColor);
      p.children[CurrentLocation + 1].children[1].setAttribute("bg_c", HyperLinkBackgroundColor);
      p.children[CurrentLocation + 1].children[1].setAttribute("bgh_c", HyperLinkBackgroundHoverColor);

      let char = HyperLinkTitle.value.at(0).toUpperCase();
      let c = p.querySelector('#LinksRedirect');
      p.children[CurrentLocation + 1].children[1].style.color = HyperLinkTitleColor;
      p.children[CurrentLocation + 1].children[1].style.backgroundColor = HyperLinkBackgroundColor;
      p.children[CurrentLocation + 1].children[1].innerHTML = char;
      p.children[CurrentLocation + 1].children[2].innerHTML =  HyperLinkTitle.value;
      
    }else if(CreatorTitle == "Add Link"){
      CurrentLink++;
      CheckHyperlinkArrangment();
      BuildQuickLink(HyperLinkTitle.value, HyperLinkURL.value, HyperLinkTitleColor, HyperLinkTitleHoverColor, HyperLinkBackgroundColor, HyperLinkBackgroundHoverColor, CurrentLink+1);
    }
    document.getElementById("LinkTitle").innerHTML = "inactive";
    LinksAddHide();
    HyperLinksShow();
    SearchBarShow();
    LinksClear();
    //document.getElementById("LinkTitle").innerHTML = "inactive";
  }
})



//Dynamic UI resizing for Quiklinks.


var HyperlinkDivHeight = "114";
var HyperlinkDivWidth;
function CheckHyperlinkArrangment(){
  //Width
  if(PageState == 1){
      if(window.innerWidth >= 1040){
        if(CurrentLink >= 9){
          HyperlinkDivWidth = 1040;
        }else if(CurrentLink < 9){
          HyperlinkDivWidth = (CurrentLink + 2) * 104;
        }
      }else if(window.innerWidth < 1040){
        var num = Math.floor(window.innerWidth / 104);
        if((CurrentLink + 1) > num){
          HyperlinkDivWidth = 104 * num;
        }else{
          HyperlinkDivWidth = 104 * (CurrentLink + 1);
        }
      }
      //console.log(PageState, window.innerWidth, CurrentLink, HyperlinkDivWidth);
  }else if(PageState == 2){
      num = Math.floor(window.innerWidth / 104);
      if((CurrentLink+1) >= num){
        HyperlinkDivWidth = (num) * 104;
      }else if((CurrentLink + 1) < num){
        HyperlinkDivWidth = (CurrentLink +2) * 104;
      }
      //console.log(num, CurrentLink+1, HyperlinkDivWidth);
  }
  document.getElementById("LinksDiv").style.width = HyperlinkDivWidth  + "px";

  //height
  if(PageState == 1){
    if(window.innerWidth >= 1040){
      var num = Math.floor((CurrentLink +1)/10) + 1;
      HyperlinkDivHeight = (num * 124);
    }else if(window.innerWidth < 1040){
      var num = Math.floor((CurrentLink + 1)/Math.floor(window.innerWidth / 104)) + 1;
      HyperlinkDivHeight = (num * 124);
    }
    document.getElementById("LinksDiv").style.height = HyperlinkDivHeight + "px";
  }else if(PageState == 2){
    HyperlinkDivHeight = 124;
  }
  
  if(CurrentLink == 28){
    setTimeout(() => {
      document.getElementsByClassName("HyperLinkStyle")[0].style.width = "90px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.margin = "0px 5px 10px 5px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.padding = "0px";
    }, 100 );
  }else if(CurrentLink == 29){
    document.getElementsByClassName("HyperLinkStyle")[0].style.width = "0px";
    document.getElementsByClassName("HyperLinkStyle")[0].style.margin = "0px";
    document.getElementsByClassName("HyperLinkStyle")[0].style.padding = "0px";
  }
}


/*new storage solution that is incomplete*/
/*
var Quicklink_Storage = [];

function Quicklink(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color){
  this.title = Title;
  this.url = Url;
  this.tc = T_Color;
  this.thc = TH_Color;
  this.bgc = BG_Color;
  this.bghc = BGH_Color;
  console.log(this.title, this.url, this.tc, this.thc, this.bgc, this.bghc);
}
function NewBuildQuickLinks(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color){

  var newLink = new Quicklink(Title, Url, T_Color, TH_Color, BG_Color, BGH_Color);
  Quicklink_Storage.push(newLink);
}

NewBuildQuickLinks('Title', 'Url', 'T_Color', 'TH_Color', 'BG_Color', 'BGH_Color');*/