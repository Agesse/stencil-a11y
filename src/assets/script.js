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

  document.addEventListener("onPea11yRatingChange", (e) => {
    if (e.srcElement.id.includes("fancy") || e.srcElement.id.includes("readonly")) {
      document.getElementById(e.srcElement.id + "-selection").innerText = textValues[e.detail];
    } else {
      document.getElementById(e.srcElement.id + "-selection").innerText = e.detail;
      if (e.srcElement.id.includes("max")) {
        resetAriaLive("pea11y-rating-aria-live");
      }
    }
  }, false);

  document.addEventListener("onPea11yRatingHover", (e) => {
    if (e.srcElement.id.includes("fancy")) {
      document.getElementById(e.srcElement.id + "-selection").innerText = textValues[e.detail];
    } else if (!e.srcElement.id.includes("readonly")) {
      document.getElementById(e.srcElement.id + "-hover").innerText = e.detail;
    }
  }, false);

  document.addEventListener("onPea11yRatingLeave", (e) => {
    if (e.srcElement.id.includes("fancy")) {
      document.getElementById(e.srcElement.id + "-selection").innerText = textValues[e.detail];
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

function resetAriaLive(id) {
  if (document.getElementById(id).firstChild) {
    document.getElementById(id).removeChild(document.getElementById(id).firstChild);
  }
}

// UXSTARS
function resetUxstars(idElem) {
  document.getElementById(idElem).setAttribute("value", 0);
}
