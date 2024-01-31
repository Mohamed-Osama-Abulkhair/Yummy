import { mealFetch } from "./components/meal.js";
import { NavBtnClick, liClick } from "./components/nav.js";
import {
  spanClick,
  inputClick,
  inputBlur,
  searchFetch,
} from "./components/search.js";

const detailsText = $("#root .meal-card .details");
const root = document.getElementById("root");

$(document).ready(function () {
  $("#loader").fadeOut(1500, function () {
    $("body").css("overflow", "visible");
  });
});
// ! _____________________________________============ Nav ===========_____________________________________

$("nav .navBox #NavBtn").click(NavBtnClick);

$("nav .insideNavLinks ul li").click(liClick);

// ! _____________________________________============ Fetch ===========_____________________________________

detailsText.text().trim().length > 100
  ? detailsText.css({ padding: "16rem .625rem", overflowY: "auto" })
  : detailsText.css({ padding: "1.25rem .625rem", overflowY: "visible" });

async function getMealsData(
  method = "filter",
  mVar = "a",
  r = "Egyptian",
  fixedCode = ""
) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/${method}.php?${mVar}=${r}`
    );

    let mealsData = await response.json();
    updateRoot(mealsData, r, fixedCode);
    // ____________search_________________
    $("span.search").click(spanClick);
    $(".form-control.search").click(inputClick);
    $(".form-control.search").blur(inputBlur);
    $(".form-control.search").keyup(searchFetch);
    // ____________one meal by id_________________
    $("#root .meal-card").click(function () {
      let mealArr = $("#root .meal-card");

      mealArr.each(function (i) {
        $(this).attr("id", `${mealsData.meals[i].idMeal}`);
      });
    });

    $("#root .meal-card").click(function () {
      mealFetch("lookup", "i", this.id);
    });
  } catch (error) {
    console.error("Error fetching Meals data:", error);
  }
}

getMealsData();

function updateRoot(mealsData, r, fixedCode) {
  root.innerHTML = fixedCode + `<h1>${r}</h1>` + codeOFhtml(mealsData.meals);
}

function codeOFhtml(mealsData) {
  let code = "";

  for (let i = 0; i < mealsData.length; i++) {
    code += `<div class="col-sm-6 col-md-4 col-lg-3 ">
    <div class="meal-card rounded-4 position-relative overflow-hidden">
      <img src="${mealsData[i].strMealThumb}" alt="${mealsData[i].strMeal}">
      <div class="position-absolute top-100 w-100 h-100 details d-flex align-items-center ">
        <h4 class="fw-bold">${mealsData[i].strMeal}</h4>
      </div>
    </div>
  </div>
     `;
  }

  return code;
}


// ! _____________________________________===============================_____________________________________

export { getMealsData, detailsText };
