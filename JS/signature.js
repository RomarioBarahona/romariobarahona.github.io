document.addEventListener("DOMContentLoaded", function() {
  // Redirecting to the portfolio page
  setTimeout(function() {
      window.location.href = 'portfolio.html';
  }, 6000); 
});

function animatePath(pathname, animation) {
    var path = document.querySelector(pathname);
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
      'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      animation;
    // Go!
    path.style.strokeDashoffset = '0';
  }
  
  animatePath('#R path', 'stroke-dashoffset 1s ease-in-out');
  animatePath('#omario path', 'stroke-dashoffset 2s 1s ease-in-out');
  animatePath('#B path', 'stroke-dashoffset 1s 2.9s ease-in-out');
  animatePath('#arahona path', 'stroke-dashoffset 2s 3.9s ease-in-out');