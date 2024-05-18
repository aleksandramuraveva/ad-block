document.addEventListener('DOMContentLoaded', function() {
  let container = document.querySelector('.ad-container');
  let allAds = container.querySelectorAll('.ad-card');
  let adWidth = allAds[0].clientWidth; // Geting the width of an ad

  // Arrow navigation
  let prevArrow = document.querySelector('.prev-arrow');
  let nextArrow = document.querySelector('.next-arrow');

  // Check the scroll position and hide/show left and right arrows
  function checkScroll() {
    if (container.scrollLeft <= 0) {
        // At the beginning of the slider, hide the left arrow
        prevArrow.style.display = 'none';
    } else {
        prevArrow.style.display = '';
    }

    if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1){
        // At the end of the slider, hide the right arrow
        nextArrow.style.display = 'none';
    } else {
        nextArrow.style.display = '';
    }
  }

  checkScroll();

  container.addEventListener('scroll', checkScroll);

  prevArrow.addEventListener('click', function() {
    container.scrollLeft -= adWidth;
    checkScroll();
  });

  nextArrow.addEventListener('click', function() {
    container.scrollLeft += adWidth;
    checkScroll();
  });


  // Swipe functionality for mobile

  let startX;
  let threshold = 100; // Minimum distance of swipe to trigger slide change

  container.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX;
  });

  container.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  container.addEventListener('touchend', function(e) {
    let moveX = e.changedTouches[0].pageX - startX;
    if (Math.abs(moveX) >= threshold) {
      if (moveX < 0) {
        nextArrow.click();
      } else {
        prevArrow.click();
      }
    }
  });
});