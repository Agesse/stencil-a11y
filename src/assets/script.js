"use strict";

$(document).ready(function () {
  $("#demo-rating").load("articles/rating.html", () => {
    initRating();
    initalizeRating();
  });
  $("#demo-uxstars").load("articles/uxstars.html");
  $("#demo-tooltip").load("articles/tooltip.html");
  $("#demo-tabs").load("articles/tabs.html", () => {
    var demoTabs = [
      { name: 'Confiture de cerise', id: 'cerise' },
      { name: 'Frites belges', id: 'frites' },
      { name: 'Cookies', id: 'cookies' },
      { name: 'Limonade', id: 'limonade' }
    ];
    document.querySelector("pea11y-tabs").tabsNames = demoTabs;
  });
  $("#demo-snippet").load("articles/snippet.html");
});

// RATING
function initalizeRating() {
  document.addEventListener("onChange", (e) => {
    document.getElementById(e.srcElement.id + "-selection").innerText = e.detail;
  }, false);
  document.addEventListener("onMouseOver", (e) => {
    document.getElementById(e.srcElement.id + "-hover").innerText = e.detail;
  }, false);
}

// UXSTARS
function resetUxstars(idElem) {
  document.getElementById(idElem).setAttribute("value", 0);
}
