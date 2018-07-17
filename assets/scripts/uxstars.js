function init() {
  var elemUxstars = document.getElementsByTagName("pea11y-uxstars");
  for (var i = 0, l = elemUxstars.length; i < l; i++) {
    elemUxstars[i].imgSize = [78, 15];
  }
}

function resetUxstars(idElem) {
  document.getElementById(idElem).setAttribute("value", 0);
}
