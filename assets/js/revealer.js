// Reveal
// A function to activate a reveal animation on scroll

function reveal(boundary, els, animationStyle) {
  var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var boundaryTop = boundary.getBoundingClientRect().top + 500;

  if(boundaryTop <= bodyScrollTop) {
    console.log('element: ' + boundary.getBoundingClientRect().top);
    console.log('window: ' + (bodyScrollTop));
    if (Array.isArray(els)) {
      for (i = 0, n = els.length; i < n; i++) {
        els[i].classList.add(animationStyle);
      }
    } else {
      els.classList.add(animationStyle);
    }
  }
}
