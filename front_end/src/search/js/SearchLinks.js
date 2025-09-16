var WindowWidth;
var WindowHeight;
var HyperLinksState = 0;
var SortSubMenuState = 0;

function Update(){
    WindowWidth = window.innerWidth;
    WindowHeight = window.innerHeight;
}

var QuickLinkEditButtons = document.getElementsByClassName("linkeditbutton");
var QuickLinkRemoveButtons = document.getElementsByClassName("linkdeletebutton");
var QuickLinkRedirectButtonParent = document.getElementsByClassName("HyperlinkStyle");

document.getElementById("SearchIcon1").addEventListener("click", (event)  =>{
  event.preventDefault();
  document.getElementById("Search").focus();
  if(document.getElementById("SearchIcon1").innerHTML == "search"){
    document.getElementById("SearchIcon1").innerHTML = "zoom_in";
  }else{
    document.getElementById("SearchIcon1").innerHTML = "search";
  }

});
/*function zz(){
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
}*/

document.querySelector(".TitleSmall").addEventListener("click", (e) => {
  e.preventDefault();
  PageState = 1;
  document.querySelector(".AfterEnter").scrollTop = 0;
  ResizeUI();
});

function SearchBarShow(){
    document.getElementById("SearchBar").style.height = "44px";
}
function SearchBarHide(){
    document.getElementById("SearchBar").style.height = "0px";
}

var WindowResizeTimeout;
var HyperlinkState = Math.floor( window.innerWidth / 104 );
var PageResult = 0;
var PreviousPageResultState = null;

if(window.innerWidth <= 830){
  PageResultState = 1;
  ResultMerge(1);
}else if(window.innerWidth <= 1400){
  PageResultState = 2;
  ResultMerge(2);
}else if(window.innerWidth > 1400){
  PageResultState = 3;
  ResultMerge(3);
}


window.addEventListener("resize", (e) =>{
    clearTimeout(WindowResizeTimeout);
    //WindowResizeTimeout = setTimeout(ResizeUI, 200);

    if(window.innerWidth <= 830 && window.innerWidth > 0 && PageResultState != 1){
      row_plus = [0];
      row_minus = [0];

      page_row = 0;
      page_col = 0;
      
      ResultMerge(1);
      console.log("ResultState", PageResultState, "Set");
      PageResultState = 1;
      

    }else if(window.innerWidth <= 1400 && window.innerWidth > 830 && PageResultState != 2){
      row_plus = [1, 0];
      row_minus = [1, 0];

      page_row = 0;
      page_col = 0;

      ResultMerge(2);
      console.log("ResultState", PageResultState, "Set");
      PageResultState = 2;

    }else if(window.innerWidth > 1400 && PageResultState != 3){
      row_plus = [1, 2, 0];
      row_minus = [2, 0, 1];

      page_row = 0;
      page_col = 0;

      ResultMerge(3);
      console.log("ResultState", PageResultState, "Set");
      PageResultState = 3;
    }
    
    //Adjust #afterEnter's height height;

    SetScroll();


    let HLStateChange =  Math.floor( window.innerWidth / 104 );
    if(HLStateChange != HyperlinkState){
      CheckHyperlinkArrangment();
      console.log("HyperLink State Changed To:", HLStateChange, "From", HyperlinkState);
      HyperlinkState = HLStateChange;
    }
    keyboard_scale();
});


keyboard_scale();
function keyboard_scale(){
  if(document.querySelector(".keyboard").offsetWidth > (window.innerWidth - 20)){
    var factor = (window.innerWidth - 20) / document.querySelector(".keyboard").offsetWidth;
    document.querySelector(".keyboard").style.transform = "scale("+ factor +")";
  }else{
    document.querySelector(".keyboard").style.transform = "scale(1)";
  }
}


function ResultMerge(currentState){
  
  var columnData;
  columnData = $("#Col1, #Col2, #Col3").children();
  console.log("Length of children", columnData.length);

  var columns = currentState;
  console.log("columns", columns);
  var columnWidth = document.getElementById("Col1").offsetWidth;
  for(var i = 0; i < columnData.length; i++){
    var child = columnData[i];
    console.log("child", child);
    var collisionParentColumn = (parseInt(child.getAttribute('column')) -1) % columns + 1;
    console.log("collisionParentColumn", collisionParentColumn);
    var collisionRight = Math.min(columns - collisionParentColumn, parseInt(child.getAttribute('right')));
    console.log("collisionRight", collisionRight);
    var collisionLeft = Math.min(collisionParentColumn - 1, parseInt(child.getAttribute('left')));
    console.log("collisionLeft", collisionLeft);
    var span = 1 + collisionRight + collisionLeft;
    console.log("span", span);
    var percentWidth = ((columnWidth * span) + (20 * (span - 1)))/(columnWidth)  * 100;
    console.log(percentWidth);
    var percentLeftOffset = (-((columnWidth + 20) * collisionLeft)/columnWidth) * 100;
    console.log(percentLeftOffset);
    if(columnData[i].parentNode.getAttribute("id") == ("Col" + collisionParentColumn)){
      console.log("Collided with self");
    }else{
      document.getElementById("Col" + collisionParentColumn).appendChild(child);
    }

    //child.style.left = percentLeftOffset + "%";
    //child.style.width = percentWidth + "%";

    child.style.width = "calc("+span*100+"% + "+ (20* (span-1)) +"px)";
    //console.log("calc("+span*100+"% + "+ (20* (span-1)) +"px)");
    child.style.left = "calc(-"+collisionLeft*100+"% - "+ (20*(collisionLeft)) +"px)";
    //console.log("calc(-"+collisionLeft*100+"% - "+ (20*(collisionLeft)) +"px)");
  }
  /*
  switch(currentState){
    case 1:

      for(var i = 0; i < columnData.length; i++){
        if(columnData[i].getAttribute('type') == "definition"){
          document.querySelector("#Col1").appendChild(columnData[i]);
        }
      }
      for(var i = 0; i < columnData.length; i++){
        if(columnData[i].getAttribute('type') == "hyperlink"){
          document.querySelector("#Col1").appendChild(columnData[i]);
        }else if(columnData[i].getAttribute('type') == "external_link"){
          //document.querySelector("#Col1").appendChild(columnData[i]);
        }else{
          document.querySelector("#Col1").appendChild(columnData[i]);
        }
      }
      

      break;
    case 2:
      
    for(var i = 0; i < columnData.length; i++){
      if(columnData[i].getAttribute('type') == "definition"){
        document.querySelector("#Col2").appendChild(columnData[i]);
      }else if(columnData[i].getAttribute('type') == "hyperlink"){
        document.querySelector("#Col2").appendChild(columnData[i]);
      }else if(columnData[i].getAttribute('type') == "external_link"){
        //document.querySelector("#Col1").appendChild(columnData[i]);
      }else{
        document.querySelector("#Col1").appendChild(columnData[i]);
      }
    }
      break;
    case 3:
      for(var i = 0; i < columnData.length; i++){
        if(columnData[i].getAttribute('type') == "definition"){
          document.querySelector("#Col2").appendChild(columnData[i]);
        }else if(columnData[i].getAttribute('type') == "hyperlink"){
          document.querySelector("#Col3").appendChild(columnData[i]);
        }else if(columnData[i].getAttribute('type') == "external_link"){
          //document.querySelector("#Col1").appendChild(columnData[i]);
        }else{
          document.querySelector("#Col3").appendChild(columnData[i]);
        }
      }
      break;
  }*/
  //console.log(columnData);

}
function ResizeUI(){
  CheckHyperlinkArrangment();
    document.querySelector('.SearchAndLinks').style.transition = ".3s";
    if(PageState == 2){ 
        //SearchBar Reposition and Resize
        document.querySelector('.TitleSmall').classList.remove('titleSmallHidden');
        document.querySelector('.TitleBig').classList.add('titleBigHidden');
        document.querySelector('.AfterEnter').classList.add('AfterEnterShow');
        document.querySelector('.SearchAndLinks').classList.add('SearchAndLinksTop');
        document.querySelector('.LinksDiv').classList.add('LinkBuffer');
            
        /*Title Reposition and resize */
        console.log("Title set to state 2"); // Title is displayed
        document.querySelector('.LinksDiv').style.height = "0px";
        document.querySelector('#LinksCreater').style.height = "0px";
        document.querySelector('#LinksCreater').style.padding = "0px 0px";
        document.querySelector('#SearchBar').style.height = "44px";
        document.querySelector('.SearchAndLinks').style.border = "0px solid transparent";
        console.log("Page set to state", PageState); // Results are displayed
        console.log("Hyperlinks set to state: 2"); // 1h x screen width
    }else if(PageState == 1){

        document.querySelector('.TitleBig').classList.remove('titleBigHidden');
        document.querySelector('.TitleSmall').classList.add('titleSmallHidden');
        document.querySelector(".AfterEnter").classList.remove('AfterEnterShow');
        document.querySelector(".SearchAndLinks").classList.remove('SearchAndLinksTop');
        document.querySelector('.LinksDiv').classList.remove('LinkBuffer');

        document.querySelector(".AfterEnter").classList.remove('AfterEnterShowLinks'); // Conditional
        document.querySelector(".AE").classList.remove("ScrollShowLinks");
        document.querySelector(".AE2").classList.remove("ScrollShowLinks");
        console.log("Title set to state 1"); // Title is not displayed
        console.log("Page set to state", PageState); // Results are not displayed
    }
    console.log("Hyperlinks set to state: 1"); // variable h x screen width
}





function HyperLinksShow(){
  var HyperLinks = document.querySelector('.LinksDiv');
  HyperLinks.style.height = HyperlinkDivHeight + "px";
  HyperLinks.style.opacity = 1;

  if(document.getElementById("Search").value == ''){
    document.getElementById("SearchBar").style.border = "1px solid transparent";
  }else{
    document.getElementById("SearchBar").style.border = "1px solid" + BorderColor;
  }
  if(PageState == 2){
    document.querySelector(".AfterEnter").classList.add("AfterEnterShowLinks");
    document.querySelector('.AE2').classList.add('ScrollShowLinks');
    document.querySelector('.AE').classList.add('ScrollShowLinks');
    //document.querySelector('.LinksDiv').style.marginBottom = "0px";

    document.querySelector(".AE").style.transition = ".3s";
    document.querySelector(".AE2").style.transition = ".3s";
    setTimeout(() => {
        document.querySelector(".AE").style.transition = "0s";
        document.querySelector(".AE2").style.transition = "0s";
    }, 400 );
  }
  setTimeout(() => {
    if(PageState == 2){
      SetScroll();
    }
  }, 300 );
}

function HyperLinksHide(){

  document.querySelector('.LinksDiv').style.height = "0px";
  document.querySelector('.LinksDiv').style.opacity = 0;

  if(PageState == 2){
    document.querySelector(".AfterEnter").classList.remove("AfterEnterShowLinks");
    document.querySelector('.AE2').classList.remove('ScrollShowLinks');
    document.querySelector('.AE').classList.remove('ScrollShowLinks');

    document.querySelector(".AE").style.transition = ".3s";
    document.querySelector(".AE2").style.transition = ".3s";
    setTimeout(() => {
        document.querySelector(".AE").style.transition = "0s";
        document.querySelector(".AE2").style.transition = "0s";
    }, 400 );
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
  
    document.querySelector('.LinksDiv').style.zIndex = "-1";
    document.querySelector('.SearchAndLinks').style.border = "1px solid" + BorderColor; //DarkMode Affected
    console.log(BorderColor);

    if(PageState == 2){
      document.querySelector('.LinksDiv').style.marginBottom = "0px";
    }
}

function LinksAddHide(){
    var Creator = document.getElementById("LinksCreater");
    Creator.style.height = "0px";
    Creator.style.padding = "0px 10px";
  
    document.querySelector('.LinksDiv').style.zIndex = "1";
    document.querySelector('.SearchAndLinks').style.border = "0px solid transparent";

}



function LinksCancel(){
  /*if(document.getElementById("LinkTitle").innerHTML == "Add Link"){
    CheckHyperlinkArrangment();
  }*/
  document.getElementById("LinkTitle").innerHTML = "inactive";
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

function modifyURL(append){
  window.history.replaceState('data', '234', 'key?search='+ append);
}
function resetURL(){
  window.history.replaceState('data', '234', "./");
}

function ClearURL(){
  document.getElementById("LinkAddURL").value = "";
  document.getElementById("LinkAddURL").placeholder = "example.snow.com";
}

function ClearTitle(){
  document.getElementById("LinkAddTitle").value = "";
  document.getElementById("LinkAddTitle").placeholder = "Snow";
}

/* Search Bar*/
const SearchClearButton = document.getElementById("SearchIcon2");
SearchClearButton.addEventListener("click", (e) =>{

  document.getElementById("Search").focus();
  document.getElementById("SearchIcon2").style.width = "0px";
  document.getElementById("SearchIcon2").style.padding = "0px";
  document.getElementById("SearchIcon2").style.borderRight = "1px solid transparent";
  document.getElementById("Search").value = "";

  resetURL();
  AutoCompleteKill();
});


var generateLoc = ["Col1", "Col2", "Col3"];
function Search_Commands(SearchString, display){
  var array = [];
  var array_position = 0;
  var i2 = 0;
  for(var i = 0; i < SearchString.length; i++){
    if(SearchString[i] == ' ' || i == SearchString.length - 1){
      if(i == SearchString.length - 1) i++;
      
      array[array_position] = SearchString.slice(i2, i);
      i2 = i+1;
      array_position++;
      console.log("Slice:", array[array_position-1]);
    }
  }

  if(array[0] == "g"){
    Dynamic_Generation(array[1], array[2]);
  }else if(array[0] == "d"){

  }else if(array[0] == "clear"){
    for(var i = 1; i < 4; i++){
      document.getElementById("Col" + i).innerHTML = null;
    }
    definitions_structure.clear_structure();
  }else if(array[0] == "ll"){
    get_UsersSavedLinks();
    HyperLinksShow();
  }else if(array[0] == "zz"){
    zz();
  }else if(array[0] == "g1"){
    gen1();
  }else if(array[0] == "g2"){
    gen2();
  }
  if(display == true){
    document.querySelector("#DisplayedSearch").innerHTML = "Snow::Command::" + SearchString;
  }
  SetScroll();
}

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

          document.querySelector('.SearchAndLinks').style.boxShadow = "0px 2px 2px" + DropShadowColor;
          document.getElementById("SearchBar").style.border = "1px solid" + BorderColor; //DarkMode Affected
          HyperLinksHide();

          AutoCompleteCreate();
      }else {
          document.getElementById("SearchIcon2").style.borderRight = " 0px solid" + BorderColor;
          document.getElementById("SearchIcon2").style.width = "0px";
          document.getElementById("SearchIcon2").style.padding = "0px";

          //document.getElementById("SearchAndLinks").style.boxShadow = "";
          document.getElementById("SearchBar").style.border = "1px solid transparent";
          window.history.replaceState('data', '234', "./");
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
        
      } else if (e.keyCode == 13) { //
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        search_function();
        if(document.getElementById("Search").value != ""){
          document.getElementById("DisplayedSearch").innerHTML = document.getElementById("Search").value;
          //window.history.replaceState('data', '234', 'key?search='+ Search.value);
          modifyURL(Search.value);
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
        document.querySelector(".AfterEnter").scrollTop = 0;
        AutoCompleteKill();
        
      } else if (e.keyCode == 9){
        e.preventDefault();
        let SearchText = document.getElementById("Search").value;
        let ccccc = SearchText.slice(0, 3);
        console.log(ccccc);
        if(SearchText.at(0) == '/'){
          Search_Commands( SearchText.slice(1, SearchText.length), true);
        }
        AutoCompleteKill();
      }
  });
/*execute a function when someone clicks in the document:*/
}

function search_function(){
    var string = document.getElementById("Search").value;
    var data = { search: string };
    fetch('/api/returnsearch/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data })
    })
    .then(response => response.json())
    .then(data => populate_page(data))
    .catch(error => console.error('Error:', error));
}
async function getURLInfo(SearchResult){
  search_function(SearchResult);
}

const populate_page = function(returned_results){
  console.log(returned_results.stringify);
  if(document.getElementById("SearchIcon1").innerHTML == "search" && document.getElementById("Search").value != ""){
    Search_Commands("clear", false);
    document.getElementById("DisplayedSearch").innerHTML = document.getElementById("Search").value;
  }
  for(var i = 0; i < returned_results.length; i++){
    console.log(returned_results.length);
    var existence = definitions_structure.compare(returned_results[i]);
    if(existence == false){
      definitions_structure.insert(returned_results[i], null);
      generate_definition(returned_results[i].word, "Subject: undefined", returned_results[i].definition);
    }else{
      console.log("collision with previous search array");
    }
  }
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
  document.querySelector('.SearchAndLinks').style.boxShadow = "";
  document.querySelector(".AE").style.boxShadow = "none";
  
}

var Results = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","One Hundred"];
autocomplete(document.getElementById("Search", Results));











/*Generate Page Results*/


document.querySelector(".AfterEnter").addEventListener("scroll", (e) => {
  SetScroll();  
});
function SetScroll(){
  if(document.querySelector(".AfterEnter").scrollTop > 0){

    //document.querySelector(".AE").classList.add("");
    document.querySelector(".AE").style.transition = "0s";
    document.querySelector(".AE2").style.transition = "0s";
    let FullHeight = document.querySelector(".AfterEnter").scrollHeight;
    let ShownHeight = document.querySelector(".AfterEnter").offsetHeight;
    let HiddenHeight = FullHeight - ShownHeight;
    let x = window.innerWidth;
    let step = x/HiddenHeight;

    document.querySelector(".AE2").style.width = document.querySelector(".AfterEnter").scrollTop * step + "px";
    document.querySelector(".AE2").style.boxShadow = "inset 0 7px 9px -8px rgba(43, 129, 190, 1)";
    let z = 1;
  }else if(document.querySelector(".AfterEnter").scrollTop < 1){
    document.querySelector(".AE").style.boxShadow = "none";
    document.querySelector(".AE2").style.boxShadow = "none";
  }
}