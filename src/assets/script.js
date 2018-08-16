"use strict";

$(document).ready(function () {
  $("#demo-rating").load("articles/rating.html", () => {
    initRating();
  });
  $("#demo-uxstars").load("articles/uxstars.html");
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


// UXSTARS
function resetUxstars(idElem) {
  document.getElementById(idElem).setAttribute("value", 0);
}
