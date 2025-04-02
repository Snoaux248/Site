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
  window.location.assign(QuickLinks_structure.structure[location].url);
}

var QuickLinkHover = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;

  let c = p.querySelector("#LinksRedirect");
  c.style.color = QuickLinks_structure.structure[location].title_hover;
  c.style.backgroundColor = QuickLinks_structure.structure[location].background_hover;
}

var QuickLinkHoverOut = function(){
  let p = this.parentNode;
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), p.querySelector(".hyperlinktitle"));
  location--;

  let c = p.querySelector("#LinksRedirect");
  c.style.color = QuickLinks_structure.structure[location].title_color;
  c.style.backgroundColor = QuickLinks_structure.structure[location].background_color;
}

var QuickLinkRemove = function(){

  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.parentNode.querySelector(".hyperlinktitle"));
  location--;
  let p = document.getElementById("LinksDiv");
  parent2 = this.parentNode;
  parent2.style.transition = '.2s';
  parent2.style.width = "0px";
  parent2.style.opacity = 0;
  parent2.style.margin = "0px 10px 0px 0px";
  parent2.style.padding = "0px";
  CurrentLink--;

  CheckHyperlinkArrangment();
  QuickLinks_structure.remove_by_location(location);
  send_UsersSavedLinks();

  setTimeout(() => {
    parent2.getElementsByClassName("LinkEditButton")[0].removeEventListener('click', QuickLinkEdit);
    parent2.getElementsByClassName("LinkDeleteButton")[0].removeEventListener('click', QuickLinkRemove);
    parent2.querySelector("#LinksRedirect").removeEventListener('click', QuickLinkRedirect);
    parent2.querySelector("#LinksRedirect").removeEventListener('mouseover', QuickLinkHover);
    parent2.querySelector("#LinksRedirect").removeEventListener('mouseout', QuickLinkHoverOut);
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
  CurrentLocation = QuickLinks_structure.length;
}


var QuickLinkEdit = function(){
  if(PageState == 1){
    HyperLinksHide();
  }
  document.getElementById("SearchBar").style.border = "0px solid transparent";
  let location = [].indexOf.call(document.getElementsByClassName('hyperlinktitle'), this.parentNode.querySelector(".hyperlinktitle"));
  location--;

  document.getElementById("LinkTitle").innerHTML = "Edit Link";
  let c = this.parentNode.querySelector("#LinksRedirect");

  document.getElementById("LinkAddTitle").value = this.parentNode.querySelector(".hyperlinktitle").innerHTML;

  document.getElementById("LinkAddTitle").value = QuickLinks_structure.structure[location].title;
  document.getElementById("LinkAddURL").value = QuickLinks_structure.structure[location].url;
  document.getElementById("LinkTColorPicker").value = QuickLinks_structure.structure[location].title_color;
  document.getElementById("LinkTHColorPicker").value = QuickLinks_structure.structure[location].title_hover;
  document.getElementById("LinkBGColorPicker").value = QuickLinks_structure.structure[location].background_color;
  document.getElementById("LinkBGHColorPicker").value = QuickLinks_structure.structure[location].background_hover;

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
  if(TitleError == true && URLError == true){
    console.log("Invalid Hyperlink addition or modification");
    return;
  }

  if(CreatorTitle == "Edit Link"){

    let char = HyperLinkTitle.value.at(0).toUpperCase();
    let c = p.querySelector('#LinksRedirect');
    p.children[CurrentLocation + 1].children[2].style.color = HyperLinkTitleColor;
    p.children[CurrentLocation + 1].children[2].style.backgroundColor = HyperLinkBackgroundColor;
    p.children[CurrentLocation + 1].children[2].innerHTML = char;
    p.children[CurrentLocation + 1].children[3].innerHTML =  HyperLinkTitle.value;


    QuickLinks_structure.remove_by_location(CurrentLocation);
    var new_link = {
      'title':HyperLinkTitle.value, 
      'url':HyperLinkURL.value, 
      'title_color':HyperLinkTitleColor, 
      'title_hover': HyperLinkTitleHoverColor, 
      'background_color':HyperLinkBackgroundColor, 
      'background_hover':HyperLinkBackgroundHoverColor
    };

    console.log("CurrentLocation", CurrentLocation);
    QuickLinks_structure.insert(new_link, CurrentLocation);
    send_UsersSavedLinks();
  }else if(CreatorTitle == "Add Link"){
    CurrentLink++;

    CheckHyperlinkArrangment();
    var new_link = {
      'title':HyperLinkTitle.value, 
      'url':HyperLinkURL.value, 
      'title_color':HyperLinkTitleColor, 
      'title_hover': HyperLinkTitleHoverColor, 
      'background_color':HyperLinkBackgroundColor, 
      'background_hover':HyperLinkBackgroundHoverColor
    };
    console.log("CurrentLocation", CurrentLink);
    QuickLinks_structure.insert(new_link, CurrentLink);
    BuildQuickLink(new_link, CurrentLink);
    send_UsersSavedLinks();
  }
    
  document.getElementById("LinkTitle").innerHTML = "inactive";
  LinksAddHide();
  HyperLinksShow();
  SearchBarShow();
  LinksClear();
    //document.getElementById("LinkTitle").innerHTML = "inactive";
})



//Dynamic UI resizing for Quiklinks.


var HyperlinkDivHeight = "114";
var HyperlinkDivWidth;
function CheckHyperlinkArrangment(){
  //Width
  if(PageState == 1){
      if(window.innerWidth >= 1040){
        if(CurrentLink >= 9){
          HyperlinkDivWidth = 1040 + 5;
        }else if(CurrentLink < 9){
          HyperlinkDivWidth = (CurrentLink+1) * 104 + 1;
        }
      }else if(window.innerWidth < 1040){
        var num = Math.floor(window.innerWidth / 104 + 1);
        if((CurrentLink + 1) > num){
          HyperlinkDivWidth = 104 * num;
        }else{
          HyperlinkDivWidth = 104 * (CurrentLink);
        }
      }
      console.log(PageState, window.innerWidth, CurrentLink, HyperlinkDivWidth);
  }else if(PageState == 2){
      num = Math.floor(window.innerWidth / 104);
      if((CurrentLink+1) > num){
        HyperlinkDivWidth = (num) * 104 + CurrentLink / 3 * 2;
      }else if((CurrentLink + 1) <= num){
        HyperlinkDivWidth = (CurrentLink+1) * 104 + CurrentLink  / 3 * 2;
      }
      //console.log(num, CurrentLink+1, HyperlinkDivWidth);
  }
  document.getElementById("LinksDiv").style.width = HyperlinkDivWidth  + "px";

  //height
  if(PageState == 1){
    if(window.innerWidth >= 1040){
      var num = Math.floor((CurrentLink)/10) + 1;
      HyperlinkDivHeight = (num * 124);
    }else if(window.innerWidth < 1040){
      var num = Math.floor((CurrentLink)/Math.floor(window.innerWidth / 104)) + 1;
      HyperlinkDivHeight = (num * 124);
    }
    document.getElementById("LinksDiv").style.height = HyperlinkDivHeight + "px";
  }else if(PageState == 2){
    HyperlinkDivHeight = 124;
  }
  
  if(CurrentLink == 29){
    setTimeout(() => {
      document.getElementsByClassName("HyperLinkStyle")[0].style.width = "90px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.margin = "0px 5px 10px 5px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.padding = "0px";
    }, 100 );
  }else if(CurrentLink == 30){
    setTimeout(() => {
      document.getElementsByClassName("HyperLinkStyle")[0].style.width = "0px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.margin = "0px";
      document.getElementsByClassName("HyperLinkStyle")[0].style.padding = "0px";
    }, 100 );
  }
}