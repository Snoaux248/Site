const FN = document.getElementById("FirstName");
const LN = document.getElementById("LastName");
const User = document.getElementById("User");
const Email = document.getElementById("Email");
const Pass = document.getElementById("Pass");
const Passonfirm = document.getElementById("PassConfirm");
const DobM = document.getElementById("DobMonth");
const DobD = document.getElementById("DobDay");
const DobY = document.getElementById("DobYear");

const CreateAccountButton = document.getElementById("CreateAccount");

var Error_FN = document.getElementById("FNEM");
var Error_LN = document.getElementById("LNEM");
var Error_User = document.getElementById("UNEM");
var Error_Email = document.getElementById("EMEM");
var Error_Pass = document.getElementById("PWEM");
var Error_PassConfirm = document.getElementById("PWCEM");
var Error_DoB = document.getElementById("DOBEM");

var E1 = document.getElementById("E1");
var E2 = document.getElementById("E2");
var E3 = document.getElementById("E3");
var E4 = document.getElementById("E4");
var E5 = document.getElementById("E5");
var E6 = document.getElementById("E6");
var E7 = document.getElementById("E7");

var TakenUser = "Snow";
var TakenEmail = "Flurries@snow.com";

CreateAccountButton.addEventListener("click", (enter) => {
	enter.preventDefault();
	    //First Name checks
        if (FN.value == "") {
		        Error_FN.style.opacity = 1;
		        E1.innerHTML = "Insert First Name";
	    } else {
        	    Error_FN.style.opacity = 0;
        	    E1.innerHTML = "First Name";
        }
        //Last Name checks
        if (LN.value == "") {
		        Error_LN.style.opacity = 1;
		        E2.innerHTML = "Insert Last Name";
	    } else {
        	    Error_LN.style.opacity = 0;
        	    E2.innerHTML = "Last Name";
        }
        //Username checks
        if (User.value == "") {
		        Error_User.style.opacity = 1;
		        E3.innerHTML = "Insert Username";
	    }else if(User.length << 8){
                Error_User.style.opacity = 1;
		        E3.innerHTML = "Must be 8 Digits";
	    }else if(User.value == TakenUser){
                Error_User.style.opacity = 1;
		        E3.innerHTML = "Username Taken";
	    }else {
        	    Error_User.style.opacity = 0;
        	    return true;
        }
        //Email checks
        if (Email.value == "") {
		        Error_Email.style.opacity = 1;
		        E4.innerHTML = "Insert Email";
	    }else if(Email.value == TakenEmail){
                Error_Email.style.opacity = 1;
		        E4.innerHTML = "Email Taken";
	    }else {
        	    Error_Email.style.opacity = 0;
        	    return true;
        } 
        //Password and Password Confirm checks
        if(Pass.value == ""){
            Error_Pass.style.opacity = "1";
            E5.innerHTML = "Type Password";
            
        }else if(Pass.length < 8){
        	Error_Pass.style.opacity = "1";
            E5.innerHTML = "Must Be 8 Characters";
        }else{
            Error_Pass.style.opacity = "0";
            E5.innerHTML = "Password";
        }

        
        if(PassConfirm.value == ""){
            Error_PassConfirm.style.opacity = "1";
            E6.innerHTML = "Confirm Password";
        }else if(PassConfirm.value != Pass.value){
            Error_PassConfirm.style.opacity = "1";
            E6.innerHTML = "Dose Not Match";
        }else{
        	Error_PassConfirm.style.opacity = "0";
            E6.innerHTML = "Password Confirm";
        }

})
const DiscardButton = document.getElementById("Cancel");
DiscardButton.addEventListener("click", (enter) => {
	enter.preventDefault();
    if(history.length == 1){
        window.location.assign("http://127.0.0.1:8000/Snow/Login");
    }else{
        window.history.back();
    }
})
/*
http://127.0.0.1:8000/Snow/CreateAccount
*/