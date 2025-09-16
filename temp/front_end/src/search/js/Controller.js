var gamepadInfo = document.getElementById("gamepad-info");
var ball = document.getElementById("ball");
var start;

var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.cancelRequestAnimationFrame;

window.addEventListener("gamepadconnected", function() {
  var gp = navigator.getGamepads()[0];
  console.log("Gamepad connected at index ", gp.index, ": ", gp.id, ". It has ", gp.buttons.length, " buttons and ",gp.axes.length, " axes.");

  document.querySelector("#Col" + (page_col + 1)).children[0].classList.add('controllerSelect');
  gameLoop();
});

window.addEventListener("gamepaddisconnected", function() {
  gamepadInfo.innerHTML = "Waiting for gamepad.";
  rAFStop(start);
});

if(navigator.webkitGetGamepads) {
  // Webkit browser that uses prefixes
  var interval = setInterval(webkitGP, 500);
}

function webkitGP() {
  var gp = navigator.webkitGetGamepads()[0];
  if(gp) {
    gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
    gameLoop();
    clearInterval(interval);
  }
}

var buttonState = {}; // Object to store the state of each button

const keyboard_movment = ['up', 'down', 'left', 'right'];
var main_column = 1;
var main_row = 0;
function buttonPressed(gp, buttonIndex) {
  // Check if the button is currently pressed
  if (buttonState[buttonIndex] !== true) {
      // Button is not already pressed, handle the press
      console.log("Button " + buttonIndex + " Pressed");
      buttonState[buttonIndex] = true;

      if(document.querySelector('.keyboard').style.height == '250px'){
        Keyboard_Controls(buttonIndex);
      }else if(buttonIndex === 16){
        display_keyboard();
        document.querySelector('.Search').select();
      }else if(buttonIndex == 9){ //open Menu //need to implement proper navigation. It should cancel out othr navigations
        Settings_Toggle();
      }else if(GenNavState != 0){
        if(buttonIndex == 13){
          Dark_Mode_Toggle();
        }
      }else if(PageState != 1){
        Page_Controls(buttonIndex);
      }
      if(buttonIndex == 8){
        if(PageState == 1){
          PageState = 2;
          ResizeUI();
          hide_keyboard();
        }else if(document.querySelector('.keyboard').style.height == '250px'){
          hide_keyboard();
        }else{
          PageState = 1;
          ResizeUI();
        }
        let Search = document.getElementById("Search");
        if(Search.value != ""){
          console.log('searched');
          document.getElementById("DisplayedSearch").innerHTML = Search.value;
          window.history.replaceState('data', '234', 'search?key='+ Search.value);
          search_function();
        }
      }
  }
}

var page_row = 0;
var page_col = 0;
//import from PageLoad
//row_minus
//row_plus
function get_height(row, column, direction){

  //get height of current object
  var row_from_elements = document.querySelectorAll("#Col"+ (column + 1)+" > * ");
  var h_reference = 0;
  for(var i = 0; i <= row; i++){
    h_reference += (20 + row_from_elements[i].offsetHeight);
  }
  h_reference -= (20 + row_from_elements[row].offsetHeight/2);

  console.log("height reference: ", h_reference);
  var row_to_elements;
  //determine what column to chek element heights of
  if(direction == 1){
    row_to_elements = document.querySelectorAll("#Col" + (row_plus[page_col] + 1) + "> * ");
    console.log(row_to_elements.length, '+')
  }else if(direction == 0){
    row_to_elements = document.querySelectorAll("#Col"+ (row_minus[column]+ 1) + " >*");
    console.log(row_to_elements.length, '-')

  }

    var h_t1 = 0;
    var h_t2 = 0;
    var c = 0;
  //find object in next column at a similar same height
  for(var i = 0; i < row_to_elements.length; i++){
    if(h_t1 + 20 + row_to_elements[i].offsetHeight <= h_reference){
      h_t1 += (20 + row_to_elements[i].offsetHeight);
      console.log(h_t1, i, '1');
      c = i;
    }else if(h_t1 + 20 + row_to_elements[i].offsetHeight > h_reference){
      h_t2 = (h_t1);
      h_t2 -= 20;
      c = i;
      console.log(h_t2, i, '2');
      break;
    }
  }
  //determine whether, the height after object 1 or object 2 is closer to the height in the current column.
  let difference1 = Math.abs(h_t1 - h_reference);
  let difference2 = Math.abs(h_t2 - h_reference);
  if(h_reference == h_t1 || difference1 < difference2){
    return c--
  }else if(difference2 <= difference1){
    return c;
  }
}

function Page_Controls(buttonIndex){
  if(buttonIndex > 11 && buttonIndex < 16){
    page_movment(keyboard_movment[buttonIndex-12]);
  }
}
function t(container){
  container.style.transition = '.0s';
}

//function to scroll container appropriately;
function set_scroll_for_controller_nav(x){

  let container = document.querySelector("#AfterEnter");
  console.log(container.scrollTop, x.offsetTop);
  if((x.offsetTop + x.offsetHeight) > (container.offsetHeight + container.scrollTop)){
    container.scrollTop = (x.offsetTop - container.offsetHeight) + x.offsetHeight + 80;
  }else if((x.offsetTop + 80) < container.scrollTop){
    container.scrollTop = x.offsetTop;
  }

  smoothScrollTimeout = setTimeout(t(container), 200);


}

function page_movment(direction){
  if(direction == 'left'){ // Search results controller left d-pad
    
    document.getElementById("Col"+ (page_col + 1)).children[page_row].classList.remove('controllerSelect');
    var location = get_height(page_row, page_col, 0);
    var l = 0;
    do{
      l = document.querySelectorAll("#Col" + (row_minus[page_col] + 1) + "> * ").length;
      console.log(l, "Length");
      if(parseInt(l) == 0){
        page_col = row_minus[page_col];
      }
    }while(l = 0);
    document.getElementById("Col"+ (row_minus[page_col] + 1)).children[location].classList.add('controllerSelect');
    //scroll container appropriately;
    set_scroll_for_controller_nav(document.getElementById("Col"+ (row_minus[page_col] + 1)).children[location]);

    page_col = row_minus[page_col];
    page_row = location;
  }else if(direction == 'right'){ // Search results controller right d-pad

    document.getElementById("Col"+ (page_col + 1)).children[page_row].classList.remove('controllerSelect');
    var location = get_height(page_row, page_col, 1);
    var l = 0;
    do{
      l = document.querySelectorAll("#Col" + (row_plus[page_col] + 1) + "> * ").length;
      console.log(l, "Length");
      if(parseInt(l) == 0){
        page_col = row_plus[page_col];
      }
    }while(l = 0);
    document.getElementById("Col"+ (row_plus[page_col] + 1)).children[location].classList.add('controllerSelect');
    //scroll container appropriately;
    set_scroll_for_controller_nav( document.getElementById("Col"+ (row_plus[page_col] + 1)).children[location]);

    page_col = row_plus[page_col];
    page_row = location;
  }else if(direction == 'up'){ // Search results controller up d-pad

    let c = document.getElementById("Col" + (page_col + 1));
    if(page_row != 0){
      c.children[page_row].classList.remove("controllerSelect");
      c.children[page_row - 1].classList.add("controllerSelect");
      //scroll container appropriately;
      set_scroll_for_controller_nav(c.children[page_row - 1]);
      page_row--;
    }else{
      c.children[page_row].classList.remove("controllerSelect");
      var l = document.querySelectorAll("#Col" + (page_col + 1) + "> * ").length;
      c.children[l-1].classList.add("controllerSelect");
      //scroll container appropriately;
      set_scroll_for_controller_nav(c.children[l-1]);
      page_row = l-1;
    }
    console.log("c1");
    
  }else if(direction == 'down'){ // Search results controller down d-pad

    var c = document.getElementById("Col" + (page_col + 1));
    var l = document.querySelectorAll("#Col" + (page_col + 1) + "> * ").length;
    console.log(l, "length");

    if(page_row != l-1){
      c.children[page_row].classList.remove("controllerSelect");
      c.children[page_row + 1].classList.add("controllerSelect");
      //scroll container appropriately;
      set_scroll_for_controller_nav(c.children[page_row+1]);
      page_row++;
    }else{
      c.children[page_row].classList.remove("controllerSelect");
      c.children[0].classList.add("controllerSelect");
      //scroll container appropriately;
      set_scroll_for_controller_nav(c.children[0]);
      page_row = 0;
    }
    console.log("c2");
  }
}
function buttonReleased(gp, buttonIndex) {
  // Reset the button state when released
  buttonState[buttonIndex] = false;
  //console.log("Button " + buttonIndex + " Released");
}

function Keyboard_Controls(buttonIndex){
  if(buttonIndex > 11 && buttonIndex < 16){
    keyBoardControl(keyboard_movment[buttonIndex-12]);
  }else if(buttonIndex == 0){
     let keyStroke = document.querySelector('.keyboard').querySelector('.controllerSelect').children[0].innerHTML;
    if(keyStroke.length == 1){
      if(keyboard_state == 2){
        document.querySelector('.Search').value += document.querySelector('.keyboard').querySelector('.controllerSelect').children[0].innerHTML;
      }else if(keyboard_state == 1){
        document.querySelector('.Search').value += document.querySelector('.keyboard').querySelector('.controllerSelect').children[0].innerHTML;
        Keyboard_Secondary(0);
      }else{
        document.querySelector('.Search').value += document.querySelector('.keyboard').querySelector('.controllerSelect').children[1].innerHTML;
      }
    }

    if(keyStroke == 'Delete'){
      document.querySelector('.Search').value = document.querySelector('.Search').value.slice(0, -1);
    }else if(keyStroke == 'Enter'){
      document.getElementById("DisplayedSearch").innerHTML = Search.value;
      PageState = 2;
      ResizeUI();
      document.querySelector('.keyboard').style.height = "0px";
    }else if(keyStroke == 'Shift'){
      Keyboard_Secondary(1);
    }else if(keyStroke == 'CapsLock'){
      Keyboard_Secondary(2);
    }else if(keyStroke == 'Space'){
      document.querySelector('.search').value += ' ';
    }else if(keyStroke == 'Esc'){
      hide_keyboard();
    }else if(keyStroke == 'Tab'){
      var SearchText = document.getElementById("Search").value;
      if(SearchText.at(0) == '/'){
        Search_Commands( SearchText.slice(1, SearchText.length), true);
        hide_keyboard();
      }
    }
  }else if(buttonIndex == 1 || buttonIndex == 16){ //B
    hide_keyboard();
  }else if(buttonIndex == 2){
    document.querySelector('.Search').value = document.querySelector('.Search').value.slice(0, -1);
    if(document.querySelector('.search').value == ''){
      resetURL();
    }
  }else if(buttonIndex == 3){
    document.querySelector('.Search').value += ' ';
  }else if(buttonIndex == 10){
    Keyboard_Secondary(1);
  }
}
function display_keyboard(){
  document.querySelector('.keyboard').style.height = "250px";
  document.querySelector('.keyboard').style.padding = "5px";
  document.querySelector('.keyboard').style.opacity = 1;
  console.log(document.querySelector('.search').value);
  if(keyboard_state != 1 && document.querySelector('.search').value != ''){
    Keyboard_Secondary(1);
  }
}
function hide_keyboard(){
  document.querySelector('.keyboard').style.height = "0px";
  document.querySelector('.keyboard').style.padding = "0px";
  document.querySelector('.keyboard').style.opacity = 0;
  if(keyboard_state != 1){
    Keyboard_Secondary(0);
  }
}
var keyboard_state = 1; // 0 = default, 1 = shift,  2 = caps
function Keyboard_Secondary(x){
  var keys = document.querySelectorAll('.key');
  if(keyboard_state == 0){
    for(var i = 0; i < keys.length; i++){
      if(keys[i].childElementCount == 2){ //caps
        keys[i].children[1].style.transform = "scale(.75)";
        keys[i].children[0].style.transform = "scale(1)";
        keys[i].children[1].style.top = "22px";
        keys[i].children[0].style.top = "5px";
        keys[i].children[1].style.left = "-7px";
        keys[i].children[0].style.left = "0px";
      }
    }
    keyboard_state = x;
  }else if(keyboard_state == 1 || keyboard_state == 2){
    for(var i = 0; i < keys.length; i++){
      if(keys[i].childElementCount == 2){ //lower
        keys[i].children[0].style.transform = "scale(.75)";
        keys[i].children[1].style.transform = "scale(1)";
        keys[i].children[0].style.top = "22px";
        keys[i].children[1].style.top = "5px";
        keys[i].children[0].style.left = "-7px";
        keys[i].children[1].style.left = "0px";
      }
    }
    keyboard_state = 0;
  }
  console.log(keyboard_state);
}

function gameLoop() {
  if(navigator.webkitGetGamepads) {
    var gp = navigator.webkitGetGamepads()[0];

  } else {
    
    var gp = navigator.getGamepads()[0];
    for (var i = 0; i < gp.buttons.length; i++) {
      if (gp.buttons[i].value > 0 || gp.buttons[i].pressed == true && buttonState[i] === false) {
          buttonPressed(gp, i);
      } else if (buttonState[i] === true) { // Only test for release if button was pressed
          buttonReleased(gp, i);
      }
    }

  }
  var start = rAF(gameLoop);
};

var Keyboard_column = 5;
var Keyboard_row = 2;
const offsetReference = [13, 13, 12, 12, 7];

const zero_to_four = [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 7];
const four_to_zero = [0, 1, 2, 3, 7, 11, 12, 13];

const three_to_four = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6];
const four_to_three = [0, 0, 1, 2, 6, 11, 12, 12];


function keyBoardControl(x){
  const key = x;
  let parent = document.querySelector('.keyboard');

  if(key == 'left'){ //Left
    
    if(Keyboard_column != 0){
      parent.children[Keyboard_row].children[Keyboard_column-1].classList.add("controllerSelect");
      parent.children[Keyboard_row].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column--;
    }else{
      parent.children[Keyboard_row].children[offsetReference[Keyboard_row]].classList.add("controllerSelect");
      parent.children[Keyboard_row].children[0].classList.remove("controllerSelect");
      Keyboard_column = offsetReference[Keyboard_row];
    }
  }else if(key == 'right'){ //Right
    if(Keyboard_column != [offsetReference[Keyboard_row]]){
      parent.children[Keyboard_row].children[Keyboard_column+1].classList.add("controllerSelect");
      parent.children[Keyboard_row].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column++;
    }else{
      parent.children[Keyboard_row].children[0].classList.add("controllerSelect");
      parent.children[Keyboard_row].children[offsetReference[Keyboard_row]].classList.remove("controllerSelect");
      Keyboard_column = 0;
    }


  }else if(key == 'up'){
    if(Keyboard_row == 0){
      parent.children[0].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column = zero_to_four[Keyboard_column];
      parent.children[4].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row = 4;
    }else if(Keyboard_row == 4){
      parent.children[4].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column = four_to_three[Keyboard_column];
      parent.children[3].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row = 3;
    }else{
      parent.children[Keyboard_row].children[Keyboard_column].classList.remove("controllerSelect");
      if(Keyboard_column > offsetReference[Keyboard_row-1]){
        Keyboard_column = offsetReference[Keyboard_row-1];
      }
      parent.children[Keyboard_row-1].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row--;
    }

  }else if(key == 'down'){
    if(Keyboard_row == 3){
      parent.children[3].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column = three_to_four[Keyboard_column];
      parent.children[4].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row = 4;
    }else if(Keyboard_row == 4){
      parent.children[4].children[Keyboard_column].classList.remove("controllerSelect");
      Keyboard_column = four_to_zero[Keyboard_column];
      parent.children[0].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row = 0;
    }else{

    parent.children[Keyboard_row].children[Keyboard_column].classList.remove("controllerSelect");
    if(Keyboard_column > offsetReference[Keyboard_row+1]){
        Keyboard_column = offsetReference[Keyboard_row+1];
    }
      parent.children[Keyboard_row+1].children[Keyboard_column].classList.add("controllerSelect");
      Keyboard_row++;
    }
  }
}




class ControllerNav_Class{
  constructor(col_num){
    this.coordinate = [0, 0];
    this.column_length = [0];
    this.left = [];
    this.right = [];
    this.columns = set_columns(col_num);
  }

  set_columns(col_num){
    this.columns = col_num;
    for(var i = 0; i < col_num; i++){
      this.col_right[i] = i;
      this.col_left[i] = (i + -1 ) % 3;
      this.column_length[i] = document.getElementById("Col" + (i + 1)).childElementCount;
    }
  }
  increment_children(column){
    this.column_length[column]++;
  }
  deincrement_children(column){
    this.column_length[column]--;
  }

  move_right(){
    this.coordinate[0] = this.right[this.coordinate[0]];
    var count = 0;
    //remove state
    while(document.getElementById("Col" + (this.coordinate[0] + 1)).childElementCount == 0){
      count += 1;
      if(count == this.columns){
        this.coordinate[0] = null;
        return;
      }
      this.coordinate = this.right[this.coordinate[0]];
    }
    //add state
  }
  move_left(){
    this.coordinate[0] = this.left[this.coordinate[0]];
    var count = 0;
     //remove state
    while(document.getElementById("Col" + (this.coordinate[0] + 1)).childElementCount == 0){ //iderastes in necessary
      count += 1;
      if(count == this.columns){
        this.coordinate[0] = null;
        return;
      }
      this.coordinate = this.left[this.coordinate[0]];
    }
    //add state
  }
  move_up(){
    this.coordinate[1] = (this.coordinate[1] + 1);
     //remove state
    if(this.coordinate >= column_length[coordiante[1]]){
      this.coordinate[1] = this.coordinate[1] % column_length[coordiante[1]];
    }
     //add state
  }
  move_down(){
    this.coordinate[1] = (this.coordinate[1] - 1);
    //remove state
    if(this.coordinate <= 0){
      this.coordinate[1] = this.coordinate[1] % column_length[coordiante[1]];
    }
    //add state
  }

}