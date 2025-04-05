//for QuickLinks.js and SearchLinks.js
var PageState = 1;
var CurrentLink = 0;
var CurrentLocation = 0;
//for Controller.js and PageGeneration.js
var PageResultState;

//for Controller.js
var row_plus = [0];
var row_minus = [0];

var definitions_structure = new arr();
var QuickLinks_structure = new arr();
var links_structure = new arr();



var UIState;
if(window.innerWidth < 630){
  UIState = 0;
}else{
  UIState = 1;
}


// Controller.js specifications
if(window.innerWidth <= 830){
  PageResultState = 1;
  console.log("ResultState", PageResultState, "Set On-Load");
  row_plus = [1, 0];
  row_minus = [1, 0];
}else if(window.innerWidth <= 1400){
  PageResultState = 2;
  console.log("ResultState", PageResultState, "Set On-Load");
  row_plus = [1, 0];
  row_minus = [1, 0];
}else if(window.innerWidth > 1400){
  PageResultState = 3;
  console.log("ResultState", PageResultState, "Set On-Load");
  row_plus = [1, 2, 0];
  row_minus = [2, 0, 1];
}
console.log("Controller matrix: ", row_plus, row_minus, "Set On-Load");





window.addEventListener('load', (e) =>{ 
    document.getElementById("Search").focus();
    if(document.querySelector('#Search').value === ""){
      console.log("fail");
    }else{
        document.querySelector('#DisplayedSearch').innerHTML = document.querySelector('#Search').value;
        search_function();
        PageState = 2;
        ResizeUI();
    }
    
});



// Getting User HyperLinks from backend
//get_UsersSavedLinks();

async function get_UsersSavedLinks(){
  fetch('/api/fetchUsersLinks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: "none" /* implement user support probably backend*/})
  })
  .then(response => response.json())
  .then(data => read_UsersSavedLinks(data.users_saved_links))
  .catch(error => console.error('Error:', error));
}

// Read the links recieved from the backend
function read_UsersSavedLinks(data){
  var linksDiv = document.getElementById("LinksDiv");
  linksDiv.innerHTML = null;
  JSON.stringify(data)
  Create_AddLinksButton();
  for(var i = 0; i < data.length; i++){
    BuildQuickLink(data[i], i+1);
    CurrentLocation = i+1;
    CurrentLink = i+1;
    QuickLinks_structure.insert(data[i]);
  }
  CheckHyperlinkArrangment();
  //QuickLinks_structure.display();
}

// Send Links to backend upon update
async function send_UsersSavedLinks(){
  fetch('/api/sendUsersLinks/', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ users_saved_links: QuickLinks_structure.structure})
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}
//





//old code for reference

Load_Users_HyperLinks(FileTarget);
var Temp_Values = new Array(6);
var FileTarget = "search/userSavedLinks.txt";
async function Load_Users_HyperLinks(FileToRead){
    var linksDiv = document.getElementById("LinksDiv");
    linksDiv.innerHTML = null;
    Create_AddLinksButton();

    const inFS = new FileReader();

    inFS.addEventListener('load', (e) => {
      const file = e.target.result;
      const lines = file.split(/[\r\n]+/g);
      CurrentLink = lines.length -1;
      for(let i = 0; i < lines.length; i++){
        var address1 = 0;
        var address2 = 0;
        let arrayLocation = 0;
        for(let j = 0; j <= lines[i].length; j++){
          if(lines[i].at(j) == '|'){
            address2 = j;
            Temp_Values[arrayLocation] = lines[i].slice(address1, address2);
            arrayLocation += 1;
            address1 = address2 +1;
          }
        }
        let index = i+1;
//                     Title           Url             Title_C         Title_Hover     Background      Background_Hover
        //BuildQuickLink(Temp_Values[1], Temp_Values[0], Temp_Values[4], Temp_Values[5], Temp_Values[2], Temp_Values[3], index);
        BuildQuickLink({"title": Temp_Values[1], "url": Temp_Values[0], "background_color": Temp_Values[2], "background_hover": Temp_Values[3], "title_color": Temp_Values[4], "title_hover": Temp_Values[4], index});
      }
      CheckHyperlinkArrangment();
    });

    let response = await fetch('/api/usersLinks/');
    let data = await response.blob();
    inFS.readAsText(data);
    inFS.destroy;
}