import { getMealsData } from "../main.js";

function ingredientsHtmlCode(ingredients) {
  let code = "";

  for (let i = 0; i < 20; i++) {
    code += `<div class="col-sm-6 col-md-4 col-lg-3 ">
    <div class="ingredients-card rounded-4 overflow-hidden text-center">
    <i class="fa-solid fa-drumstick-bite"></i>
        <h4 class="fw-bold my-2">${ingredients[i].strIngredient}</h4>
        <p>${ingredients[i].strDescription}</p>
    </div>
  </div>
     `;
  }

  return code;
}

async function ingredientsFetch() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let ingredientsData = await response.json();

  root.innerHTML = ingredientsHtmlCode(ingredientsData.meals);
  $("#root .ingredients-card ").click(function () {
    let ingredientsArr = $("#root .ingredients-card");

    ingredientsArr.each(function (i) {
      $(this).attr("id", `${ingredientsData.meals[i].strIngredient}`);
    });
  });

  $("#root .ingredients-card").click(function () {
    getMealsData("filter", "i", this.id);
  });
}

export { ingredientsFetch };
