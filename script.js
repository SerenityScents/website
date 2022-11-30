const NumSlides = 3;
const MOVE_OUT_THRESHOLD = 100;
const MOVE_IN_THRESHOLD = -30;

let activeSlideIndex = 0;
let changeSlideTimeout;
let closeMenuTimeout;
let hideOverlayTimeout;
let hamburgerIsOpen = false;

let initalX;
let initalY;
let currentX;
let currentY;

window.addEventListener('DOMContentLoaded', (event) => {
  // When html is finished loading
  updateSlide()
  changeSlideTimeout = setTimeout(changeSlide, 5000, 1)
});

window.addEventListener('touchstart', (event) => {
  initalX = event.touches[0].pageX;
  initalY = event.touches[0].pageY;
});

window.addEventListener('touchmove', (event) => {
  currentX = event.touches[0].pageX;
  currentY = event.touches[0].pageY;
});

window.addEventListener('touchend', (event) => {
  let moveX = currentX - initalX;
  let moveY = currentY - initalY;
  if (moveX > MOVE_OUT_THRESHOLD && !hamburgerIsOpen && moveX > moveY) {
    openHamburger();
  }
  else if (moveX < MOVE_IN_THRESHOLD && hamburgerIsOpen) {
    closeHamburger();
  }
})

function changeSlide(change) {
  clearTimeout(changeSlideTimeout)
  changeSlideTimeout = setTimeout(changeSlide, 5000, 1)
  activeSlideIndex += change;
  if (activeSlideIndex > (NumSlides-1)) activeSlideIndex = 0;
  else if (activeSlideIndex < 0) activeSlideIndex = NumSlides-1;
  updateSlide()
}

function updateSlide() {
  let items = document.getElementsByClassName("carousel-slide");
  for (let i = 0; i < NumSlides; i++) {
    items[i].style.opacity = 0;
  }
  items[activeSlideIndex].style.opacity = 100;
}

function openHamburger() {
  clearTimeout(closeMenuTimeout)
  clearTimeout(hideOverlayTimeout)
  slideout = document.getElementById("slideout");
  overlay = document.getElementById("screen-overlay");
  body = document.getElementsByTagName("html")[0];
  overlay.style.display = "block";
  setTimeout(() => {overlay.style.opacity = 0.8;},1)
  overlay.style.pointerEvents = "all";
  slideout.style.display = "block";
  setTimeout(() => {slideout.style.marginLeft = 0;}, 1)
  body.style.overflow = "hidden";
  hamburgerIsOpen = true;
}

function closeHamburger() {
  slideout = document.getElementById("slideout");
  overlay = document.getElementById("screen-overlay");
  body = document.getElementsByTagName("html")[0];
  overlay.style.opacity = 0;
  hideOverlayTimeout = setTimeout(() => {overlay.style.display = "none";}, 500)
  overlay.style.pointerEvents = "none";
  slideout.style.marginLeft = "-60vw";
  closeMenuTimeout = setTimeout(() => {slideout.style.display = "none";}, 500)
  body.style.overflow = "visible";
  hamburgerIsOpen = false;
}