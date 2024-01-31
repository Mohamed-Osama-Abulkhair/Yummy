import { getMealsData } from "../main.js";

function categoriesHtmlCode(categories) {
  let code = "";

  for (let i = 0; i < categories.length; i++) {
    code += `<div class="col-sm-6 col-md-4 col-lg-3 ">
    <div class="meal-card rounded-4 position-relative overflow-hidden">
      <img src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}">
      <div class="position-absolute top-100 w-100 h-100 details ">
        <h4 class="fw-bold mb-2">${categories[i].strCategory}</h4>
        <p>${categories[i].strCategoryDescription}</p>
      </div>
    </div>
  </div>
     `;
  }

  return code;
}

async function categoriesFetch() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let categoriesData = await response.json();
  root.innerHTML = categoriesHtmlCode(categoriesData.categories);
  const detailsText = $("#root .meal-card .details");
  detailsText.text().trim().length > 100
    ? detailsText.css({ padding: "1rem .625rem", overflowY: "auto" })
    : detailsText.css({ padding: "1rem .625rem", overflowY: "visible" });

  $("#root .meal-card ").click(async function (e) {
    let mVar = e.target.innerHTML.split(" ");

    await getMealsData("filter", "c", mVar[0]);
  });
}

export { categoriesHtmlCode, categoriesFetch };
