"use strict";

$(document).ready(function () {
  $("#demo-rating").load("articles/rating.html", () => {
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
  var textValues = ["Non renseigné", "Débutant", "Intermédiaire", "Avancé"];
  document.getElementById("pea11y-rating-fancy").setAttribute("text-values", textValues);
  document.getElementById("pea11y-rating-readonly").setAttribute("text-values", textValues);
  document.addEventListener("onChange", (e) => {
    if (e.srcElement.id.includes("fancy") || e.srcElement.id.includes("readonly")) {
      document.getElementById(e.srcElement.id + "-selection").innerText = textValues[e.detail];
    } else {
      document.getElementById(e.srcElement.id + "-selection").innerText = e.detail;
    }
    if (e.srcElement.id.includes("max") && e.detail !== 0 && document.getElementById("pea11y-rating-aria-live").firstChild) {
      console.log(e.detail);
      document.getElementById("pea11y-rating-aria-live").removeChild(document.getElementById("pea11y-rating-aria-live").firstChild);
    }
  }, false);
  document.addEventListener("onMouseOver", (e) => {
    if (!e.srcElement.id.includes("fancy") && !e.srcElement.id.includes("readonly")) {
      document.getElementById(e.srcElement.id + "-hover").innerText = e.detail;
    }
  }, false);
}

function resetRating(id) {
  document.getElementById(id).setValue(0);
  if (!document.getElementById("pea11y-rating-aria-live").firstChild) {
    var p = document.createElement("p");
    p.innerText = "Note du film réinitialisée";
    document.getElementById("pea11y-rating-aria-live").appendChild(p);
  }
}

// UXSTARS
function resetUxstars(idElem) {
  document.getElementById(idElem).setAttribute("value", 0);
}
