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
    <p class="m-0 py-1">Enter a real age +16 to 100</p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="password" class="form-control" id="passwordInput" />
  <span>Enter Your Password</span>
  <div class="error-message d-none">
    <i class="fa-solid fa-caret-up" style="color: #df0016"></i>
    <p class="m-0 py-1">
      Enter a pass *Minimum 8 characters, 1 letter & 1 number (confirm your pass to check)*
    </p>
  </div>
</div>
<div class="col-md-6 form-floating position-relative">
  <input type="password" class="form-control" id="rePasswordInput" />
  <span>confirm Your Password</span>
  <i class="fa-solid fa-eye eye-password-icon position-absolute"></i>
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
function contactHandler() {
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
      errorMessage.classList.add("d-none");
    } else {
      input.classList.add("is-invalid");
      errorMessage.classList.remove("d-none");
    }
    addValidation();
  };

  function addValidation() {
    let isValid = true;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "" || !inputs[i].classList.contains("is-valid")) {
        isValid = false;
        break;
      }
    }

    // Check if both password and re-entered password are valid
    if (
      isValid &&
      pass.classList.contains("is-valid") &&
      rePass.classList.contains("is-valid")
    ) {
      $("#submitBtn").removeAttr("disabled");
      $("#submitBtn").addClass("btn-outline-success");
      $("#submitBtn").removeClass("btn-outline-danger");
    } else {
      $("#submitBtn").attr("disabled", "true");
      $("#submitBtn").addClass("btn-outline-danger");
      $("#submitBtn").removeClass("btn-outline-success");
    }
  }

  let pass = document.getElementById("passwordInput");
  let rePass = document.getElementById("rePasswordInput");

  $("#nameInput").keyup(function () {
    displayError(regexName, this, errorMessageArray[0]);
  });
  $("#emailInput").keyup(function () {
    displayError(regexEmail, this, errorMessageArray[1]);
  });
  $("#phoneInput").keyup(function () {
    displayError(regexPhone, this, errorMessageArray[2]);
  });
  $("#ageInput").keyup(function () {
    displayError(regexAge, this, errorMessageArray[3]);
  });
  $("#passwordInput").keyup(function () {
    displayError(regexPass, this, errorMessageArray[4]);
    checkPass(pass, 4);
  });
  $("#rePasswordInput").keyup(function () {
    displayError(regexPass, this, errorMessageArray[5]);
    checkPass(rePass, 5);
  });

  function checkPass(input, i) {
    if (pass.value != "" && rePass.value != "" && pass.value == rePass.value) {
      errorMessageArray[i].classList.add("d-none");
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      errorMessageArray[i].classList.remove("d-none");
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
    addValidation();
  }

  let passwordIcon = document.querySelectorAll(".eye-password-icon")[0];
  passwordIcon.onclick = function () {
    if (pass.type == "password") {
      pass.type = "text";
      rePass.type = "text";
      passwordIcon.classList.remove("fa-eye");
      passwordIcon.classList.add("fa-eye-slash");
    } else {
      pass.type = "password";
      rePass.type = "password";
      passwordIcon.classList.remove("fa-eye-slash");
      passwordIcon.classList.add("fa-eye");
    }
  };

  function resetFormState() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
      inputs[i].classList.remove("is-valid", "is-invalid");
    }

    pass.value = "";
    rePass.value = "";
    pass.classList.remove("is-valid", "is-invalid");
    rePass.classList.remove("is-valid", "is-invalid");

    $("#submitBtn").attr("disabled", "true");
    $("#submitBtn").addClass("btn-outline-danger");
    $("#submitBtn").removeClass("btn-outline-success");
  }

  // _________________________________________________
  $("#submitBtn").click(function () {
    Swal.fire({
      icon: "success",
      title: "congratulation !",
    });
    let btn = document.querySelector("button.swal2-confirm");
    btn.innerHTML = "Thanks";
    resetFormState();
  });
}

export {
  formSpanClick,
  formInputClick,
  formInputBlur,
  contactHtmlCode,
  contactHandler,
};
