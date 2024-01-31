function contactHtmlCode() {
  let code = "";

  code = `  <div class="col-md-6 form-floating position-relative">
  <input type="text" class="form-control" id="nameInput" />
  <span>Enter Your Name</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">Enter a real name at least 3 characters</p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="email" class="form-control" id="emailInput" />
  <span>Enter Your Email</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">Enter a real email @ex.com</p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="text" class="form-control" id="phoneInput" />
  <span>Enter Your Phone</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">Enter a real Egyptian phone</p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="number" class="form-control" id="ageInput" min="16" />
  <span>Enter Your Age</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">Enter a real age +16</p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="password" class="form-control" id="passwordInput" />
  <span>Enter Your Password</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">
      Enter a pass *Minimum 8 characters, 1 letter & 1 number:*
    </p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="password" class="form-control" id="rePasswordInput" />
  <span>confirm Your Password</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">password doesn't match</p>
  </div>
</div>
<button id="submitBtn" class="btn btn-outline-danger" disabled>submit</button>
     `;
  return code;
}

function formSpanClick(e) {
  e.target.parentElement.children[0].focus();
  e.target.parentElement.children[1].style.fontSize = ".75rem";
}

function formInputClick(e) {
  e.target.nextElementSibling.style.fontSize = ".75rem";
}

function formInputBlur(e) {
  if (e.target.parentElement.children[0].value.trim() != "") {
    e.target.nextElementSibling.style.transform = "translate(-10px,-200%)";
    e.target.nextElementSibling.style.padding = "0 10px";
    e.target.nextElementSibling.style.fontSize = ".75rem";
    e.target.nextElementSibling.style.color = "#fff";
  } else {
    e.target.nextElementSibling.style.transform = "translateY(-50%)";
    e.target.nextElementSibling.style.fontSize = "1rem";
  }
}

// _________________________________________________________
var inputs = document.getElementsByTagName("input");
let errorMessageArray = document.getElementsByClassName("error-message");
let regexName = /^[a-zA-Z]{3,9}(?:\s[a-zA-Z]{3,9})*$/;
var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let regexPhone = /^01[0125][0-9]{8}$/;
let regexAge = /^(1[6-9]|[2-9]\d|100)$/;
let regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let displayError = (regex, input, errorMessage) => {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    $("#submitBtn").removeAttr("disabled");
    $("#submitBtn").addClass("btn-outline-success");
    $("#submitBtn").removeClass("btn-outline-danger");
    errorMessage.classList.add("d-none");
    addValidation();
  } else {
    input.classList.add("is-invalid");
    $("#submitBtn").attr("disabled", "true");
    $("#submitBtn").addClass("btn-outline-danger");
    $("#submitBtn").removeClass("btn-outline-success");
    errorMessage.classList.remove("d-none");
  }
};

function addValidation() {
  for (var i = 1; i <= inputs.length - 2; i++) {
    if (inputs[i].value == "") {
      $("#submitBtn").attr("disabled", "true");
    } else {
      if (
        regexName.test($("#nameInput").value) &&
        regexEmail.test($("#emailInput").value) &&
        regexPhone.test($("#emailInput").value) &&
        regexAge.test($("#ageInput").value) &&
        regexPass.test($("#passwordInput").value) &&
        $("#passwordInput").value === $("#rePasswordInput").value
      ) {
        $("#submitBtn").removeAttr("disabled");
        inputs[i].classList.add("is-valid");
        inputs[i].classList.remove("is-invalid");
      } else {
        $("#submitBtn").attr("disabled", "true");
      }
    }
  }
}

let pass = document.getElementById("passwordInput");
let rePass = document.getElementById("rePasswordInput");

$("#nameInput").keyup(function () {
  displayError(regexName, this, errorMessageArray[0]);
});
$("#emailInput").keyup(function () {
  displayError(regexPhone, this, errorMessageArray[1]);
});
$("#phoneInput").keyup(function () {
  displayError(regexPhone, this, errorMessageArray[2]);
});
$("#ageInput").keyup(function () {
  displayError(regexAge, this, errorMessageArray[3]);
});
$("#passwordInput").keyup(function () {
  displayError(regexPass, this, errorMessageArray[4]);
});
$("#rePasswordInput").keyup(function () {
  if (pass.value != rePass.value) {
    errorMessageArray[5].classList.remove("d-none");
    rePass.classList.add("is-invalid");
    $("#submitBtn").attr("disabled", "true");
    $("#submitBtn").removeClass("btn-outline-success");
    $("#submitBtn").addClass("btn-outline-danger");
    addValidation();
  } else {
    errorMessageArray[5].classList.add("d-none");
    rePass.classList.add("is-valid");
    rePass.classList.remove("is-invalid");
    $("#submitBtn").removeAttr("disabled");
    $("#submitBtn").removeClass("btn-outline-danger");
    $("#submitBtn").addClass("btn-outline-success");
  }
});

// _________________________________________________
$("#submitBtn").click(function () {
  Swal.fire({
    icon: "success",
    title: "congratulation !",
  });
  let btn = document.querySelector("button.swal2-confirm");
  btn.innerHTML = "Thanks";
});
export { formSpanClick, formInputClick, formInputBlur ,contactHtmlCode};
