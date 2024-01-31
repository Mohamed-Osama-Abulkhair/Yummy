import { getMealsData } from "../main.js";

function spanClick(e) {
  e.target.parentElement.children[0].focus();
  e.target.parentElement.children[1].style.fontSize = ".75rem";
}

function inputClick(e) {
  e.target.nextElementSibling.style.fontSize = ".75rem";
  $(".form-control.search")[1].maxLength = 1;
}

function inputBlur(e) {
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

let searchHtmlCode = `<div class="col-lg-6 form-floating">
<input type="text" class="form-control search" />
<span class="search">Search By Name</span>
</div>
<div class="col-lg-6 form-floating">
<input type="text" class="form-control search" maxlength="1"/>
<span class="search">Search By first Letter</span>
</div>
</div>
</div>`;

let val1 = "",
  val2 = "";
async function searchFetch(e) {
  if (e.target.maxLength > 0) {
    val2 = e.target.value;
    searchHtmlCode = `<div class="col-lg-6 form-floating">
      <input type="text" class="form-control search" value="${val1}" />
      <span class="search">Search By Name</span>
    </div>
    <div class="col-lg-6 form-floating">
      <input type="text" class="form-control search" maxlength="1" value="${val2}"/>
      <span class="search">Search By first Letter</span>
    </div>
  </div>
</div>`;
    await getMealsData("search", "f", e.target.value, searchHtmlCode);
    $(".form-control.search")[1].focus();
    setCursorPosition(
      $(".form-control.search")[1],
      $(".form-control.search")[1].value.length
    );
  }
  if (e.target.maxLength < 0) {
    val1 = e.target.value;
    searchHtmlCode = `<div class="col-lg-6 form-floating">
      <input type="text" class="form-control search" value="${val1}" />
      <span class="search">Search By Name</span>
      </div>
      <div class="col-lg-6 form-floating">
      <input type="text" class="form-control search" maxlength="1" value="${val2}"/>
      <span class="search">Search By first Letter</span>
    </div>
  </div>
</div>`;
    await getMealsData("search", "s", e.target.value, searchHtmlCode);
  }
  $(".form-control.search")[0].focus();
  setCursorPosition($(".form-control.search")[0], $(".form-control.search")[0].value.length);
}

function setCursorPosition(input, position) {
  if (input.setSelectionRange) {
    input.setSelectionRange(position, position);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd("character", position);
    range.moveStart("character", position);
    range.select();
  }
}

export { searchHtmlCode, spanClick, inputClick, inputBlur, searchFetch };
