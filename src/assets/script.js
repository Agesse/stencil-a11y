"use strict";

$(document).ready(function () {
  $("#demo-rating").load("articles/rating.html", () => {
    initRating();
  });
  $("#demo-uxstars").load("articles/uxstars.html", function (res, status, xhr) {
    Prism.highlightAll();
  });
  $("#demo-snippet").load("articles/snippet.html", function (res, status, xhr) {
    initSnippet();
  });
});
