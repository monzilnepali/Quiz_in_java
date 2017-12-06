window.onload = function() {
    console.log("loaded");
    localStorage.clear();
}

var emailFlag;
var playerDetail = new Object();

function loginChecking() {
    console.log("loginchecking function called");
    var inputField = document.getElementsByTagName("input");
    var uname = inputField[0].value;
    var email = inputField[1].value;
    if (uname == "" || email == "") {
        document.getElementById("errorMessage").style.display = "block";

    } else {
        if (emailFlag == 1) {
            // alert("your logged in");
            playerDetail.name = uname;
            playerDetail.email = email;
            localStorage.setItem("player", JSON.stringify(playerDetail));
            console.log("redirecting to quiz setting page");
            window.location = "../index.html";
        } else {
            document.getElementById("errorMessage").style.display = "block";
        }
    }
} // end of loginChecking

//this function is used to validate the user input


function inputValidation(inputField) {
    inputField.style.border = "2px solid #3498db";
    document.getElementById("errorMessage").style.display = "none";
    inputField.addEventListener("blur", function() {
        if (inputField.getAttribute("type") == "text") {
            if (inputField.value != "") {
                inputField.style.border = "2px solid #2ecc71";
            } else {
                inputField.style.border = "2px solid #e74c3c";

            }
        } else {
            console.log("its email input field");
            if (checkEmail(inputField.value)) {
                console.log("correct email ");
                inputField.style.border = "2px solid #2ecc71";
                emailFlag = 1;
            } else {
                inputField.style.border = "2px solid #e74c3c";

            }
        }
    });


}


//function for format of email address
function checkEmail(mail) {

    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!reg.test(mail)) {
        return false;
    } else {
        return true;
    }

}