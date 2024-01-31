import { getMealsData } from "../main.js";

function areaHtmlCode(area) {
  let code = "";

  for (let i = 0; i < area.length; i++) {
    code += `<div class="col-sm-6 col-md-4 col-lg-3 ">
    <div class="area-card rounded-4 overflow-hidden text-center">
    <i class="fa-solid fa-house-flag"></i>
        <h4 class="fw-bold mt-2">${area[i].strArea}</h4>
    </div>
  </div>
     `;
  }

  return code;
}

async function areaFetch() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let areaData = await response.json();

  root.innerHTML = areaHtmlCode(areaData.meals);
  $("#root .area-card ").click(function () {
    let areaArr = $("#root .area-card");

    areaArr.each(function (i) {
      $(this).attr("id", `${areaData.meals[i].strArea}`);
    });
  });

  $("#root .area-card").click(function () {
    getMealsData("filter", "a", this.id);
  });
}

export { areaFetch };
