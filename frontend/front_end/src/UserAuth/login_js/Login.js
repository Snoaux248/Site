const Email= document.getElementById("Email");
const Remember = document.getElementById("RM");
const Password = document.getElementById("Pass");
const Error = document.getElementById("EC");

const LoginButton = document.getElementById("Login");
const CreateAccountButton = document.getElementById("NewAccount");
const DiscardButton = document.getElementById("Cancel");

var U1 = ["User"];
var P1 = ["Pass"];

var ID = "";
LoginButton.addEventListener("click", (e) => {
	e.preventDefault();
    var User = Email.value;
    var Pass = Password.value;
    if(User === "User" && Pass === "Pass"){
        window.location.assign("http://127.0.0.1:8000/Snow/Search");
        var ID = "Acc1";
    }else{
    	Error.style.opacity = "1";
    }
})
CreateAccountButton.addEventListener("click", (e) => {
	e.preventDefault();
    window.location.assign("http://127.0.0.1:8000/Snow/CreateAccount");
})
DiscardButton.addEventListener("click", (e) => {
	e.preventDefault();
    window.location.assign("http://127.0.0.1:8000/Snow/Search");
})

