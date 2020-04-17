// ==UserScript==
// @name     Remove img.privateOverlay elements
// @version  1
// @grant    none
// ==/UserScript==

window.addEventListener('load', function () {
  let es = document.querySelectorAll('img.privateOverlay');
  es.forEach(function (e) {e.remove()});
});
