import { areaFetch } from "./area.js";
import { categoriesFetch } from "./categories.js";
import { contactHandler, contactHtmlCode, formInputBlur, formInputClick, formSpanClick } from "./contact.js";
import { ingredientsFetch } from "./ingredients.js";
import {
  inputBlur,
  inputClick,
  searchFetch,
  searchHtmlCode,
  spanClick,
} from "./search.js";

const insideNavWidth = $("nav .insideNavLinks").outerWidth();
const outNavWidth = $("nav .navBox").outerWidth();
const navWidth = insideNavWidth - outNavWidth;
const listItems = $("nav .insideNavLinks ul li").get().reverse();

function NavBtnClick() {
  if ($("nav").css("left") == "0px") {
    $("nav .navBox #NavBtn #fBar").css({
      transform: "translateY(-15px)",
      width: "70%",
    });
    $("nav .navBox #NavBtn #lBar").css({
      transform: "translateY(15px)",
      width: "35%",
    });
    $("nav .navBox #NavBtn #mBar").css({
      transform: "translateX(0)",
    }); // ________________________________________________________________

    $(listItems).each(function (index) {
      $(this)
        .delay(index * 50)
        .animate({ top: "250px" }, 250);
    });
    $("nav").animate({ left: -navWidth, zIndex: "99" }, 500);
  } else {
    $("nav .navBox #NavBtn #fBar").css({
      transform: "rotate(45deg)",
      width: "100%",
    });
    $("nav .navBox #NavBtn #lBar").css({
      transform: "rotate(315deg)",
      width: "100%",
    });
    $("nav .navBox #NavBtn #mBar").css({
      transform: "translateX(100%)",
    }); // ________________________________________________________________

    $("nav").css({ left: "0px", zIndex: "9999" });
    $("nav .insideNavLinks ul li").each(function (index) {
      $(this)
        .delay(index * 50)
        .animate({ top: "0" }, 250);
    });
  }
}

async function liClick(e) {
  $("nav .insideNavLinks ul li").removeClass("active");
  e.target.classList.add("active");
  if (e.target.id == "search") {
    root.innerHTML = searchHtmlCode;
    $("span.search").click(spanClick);
    $(".form-control.search").click(inputClick);
    $(".form-control.search").blur(inputBlur);
    $(".form-control.search").keyup(searchFetch);
  } else if (e.target.id == "categories") {
    await categoriesFetch();
  } else if (e.target.id == "area") {
    await areaFetch();
  } else if (e.target.id == "ingredients") {
    await ingredientsFetch();
  } else if (e.target.id == "contact") {
    root.innerHTML = contactHtmlCode();
    $("span").click(formSpanClick);
    $(".form-control").click(formInputClick);
    $(".form-control").blur(formInputBlur);
    contactHandler()
  }
  NavBtnClick();
}

$("span.search").click(spanClick);
$(".form-control.search").click(inputClick);
$(".form-control.search").blur(inputBlur);
$(".form-control.search").keyup(searchFetch);

export { NavBtnClick, liClick };
