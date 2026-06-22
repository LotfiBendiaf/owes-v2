const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver 
  (function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target)
      }
    })
  }, 
  appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  })
  
  sliders.forEach(slider => {
    appearOnScroll.observe(slider)
  })

//   Hide header when scrolling down
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos || currentScrollPos <= 0) {
    document.getElementById("header").style.top = "0";
  }
  else{
    document.getElementById("header").style.top = "-120px";
  }
  prevScrollpos = currentScrollPos;
}

// Menu Burger
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
let menuOpen =false;

menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menu.classList.remove('hidden');
    menu.classList.add('visible');
    console.log("Menu open")
    menu.style.zIndex="99";
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menu.classList.remove('visible');
    menu.classList.add('hidden');
    menuOpen = false;
  }
});
// window.onclick = function(event) {
//   if (event.target != menu && event.target !=menuBtn && menuOpen == true) {
//     menuBtn.classList.remove('open');
//     menu.classList.remove('visible');
//     menu.classList.add('hidden');
//     menuOpen = false;
//   }
// }