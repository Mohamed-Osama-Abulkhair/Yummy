function mealHtmlCode(meal) {
  function generateMeasurements(meal) {
    let measurementsHTML = "";
    for (let i = 1; i <= 20; i++) {
      const measurement = meal[`strMeasure${i}`];
      if (measurement) {
        if (!isNaN(measurement)) {
          measurementsHTML += `<p>${measurement} lbs</p>`;
        } else {
          measurementsHTML += `<p>${measurement}</p>`;
        }
      }
    }
    return measurementsHTML;
  }

  function generateTags(meal) {
    let tagsHTML = "";
    if (meal.strTags) {
      const tagsArray = meal.strTags.split(",");
      for (let i = 0; i < tagsArray.length; i++) {
        tagsHTML += `<p>${tagsArray[i]}</p>`;
      }
    }
    return tagsHTML;
  }

  let code = "";

  for (let i = 0; i < 1; i++) {
    code += `
    <div class="col-md-4">
      <img class="rounded-3 overflow-hidden" src="${
        meal[0].strMealThumb
      }" alt="${meal[0].strMeal}" />
      <h2 class="mealName text-center mt-3">${meal[0].strMeal}</h2>
    </div>
    <div class="col-md-8 meal">
      <h4 class="detailsTitle">Instructions</h4>
      <p>${meal[0].strInstructions}</p>
      <div class="d-flex align-items-baseline">
        <h3 class="me-2">Area :</h3>
        <h4>${meal[0].strArea}</h4>
      </div>
      <div class="d-flex align-items-baseline">
        <h3 class="me-2">Category :</h3>
        <h4>${meal[0].strCategory || ""}</h4>
      </div>
      <div>
      <h3>Recipes :</h3>
      <div class="d-flex justify-content-start flex-wrap recipes">
        ${generateMeasurements(meal[0])}
      </div>
    </div>
      <div>
        <h3>Tags :</h3>
        <div class="d-flex align-items-center tags">
          ${generateTags(meal[0])}
        </div>
      </div>
      <a href="${meal[0].strSource}" target="_blank">
        <button class="btn btn-success" >Source</button>
      </a>
      <a href="${meal[0].strYoutube}" target="_blank">
        <button class="btn btn-danger">Youtube</button>
      </a>
    </div>
  `;

    return code;
  }
}

async function mealFetch(method, mVar, r) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${method}.php?${mVar}=${r}`
  );

  let mealsData = await response.json();
  root.innerHTML = mealHtmlCode(mealsData.meals);
}

export { mealFetch };
