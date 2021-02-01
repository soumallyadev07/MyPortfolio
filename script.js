//gallery items filter
const filterButtons = document.querySelector('#filter-btns').children;
const items=document.querySelector(".portfolio-gallery").children;

for(let i=0; i<filterButtons.length; i++) {
	filterButtons[i].addEventListener("click", function(){
		for(let j=0; j<filterButtons.length; j++){
			filterButtons[j].classList.remove("active")
		}
		this.classList.add("active");
		const target=this.getAttribute("data-target")

		for(let k=0; k<items.length; k++){
			items[k].style.display="none";
			if(target==items[k].getAttribute("data-id")){
				items[k].style.display="block";
			}
			if (target=="all") {
				items[k].style.display="block";
			}
		}

	})
}

//Lightbox
const closeLightbox=document.querySelector(".close-lightbox");
const lightbox=document.querySelector(".lightbox")
const lightboxImage=lightbox.querySelector("img")
   
   lightbox.addEventListener("click",function(){
   	if (event.target!=lightboxImage) {
   		lightbox.classList.remove("show");
   	    lightbox.classList.add("hide");
   	}
   })

   closeLightbox.addEventListener("click",function(){
   	lightbox.classList.remove("show");
   	lightbox.classList.add("hide");
   })

const gallery=document.querySelector(".portfolio-gallery");
const galleryItem=gallery.querySelectorAll(".item");

galleryItem.forEach(function(element){
	element.querySelector(".fa-plus").addEventListener("click", function(){
		lightbox.classList.remove("hide");
		lightbox.classList.add("show");
		lightboxImage.src=element.querySelector("img").getAttribute("src");
	})
})


//testimonial slider
const sliderContainer=document.querySelector(".testi-slider");
const slides=sliderContainer.children;
const containerWidth=sliderContainer.offsetWidth;
const margin=30;
let itemPerSlide=0;
let slideDots;

// responsive
const responsive=[
       {breakPoint:{width:0,item:1}},
       {breakPoint:{width:991,item:2}}   
     ]
function load() {
	for(let i=0; i<responsive.length; i++){
		if(window.innerWidth>responsive[i].breakPoint.width){
			itemPerSlide=responsive[i].breakPoint.item;
		}
	}

	start();
}

function start(){
	totalWidth=0;
	for(let i=0; i<slides.length; i++){
		slides[i].style.width=(containerWidth/itemPerSlide)-margin + "px";
		slides[i].style.margin=margin/2 + "px";
		totalWidth+=containerWidth/itemPerSlide;
	}

	sliderContainer.style.width=totalWidth + "px";

	slideDots=Math.ceil(slides.length/itemPerSlide);

	for(let i=0; i<slideDots; i++){
		const div=document.createElement("div");
		      div.id=i;
		      div.setAttribute("onclick", "controlSlide(this)");
		      if(i==0){
			  div.classList.add("active");
		}
	  document.querySelector(".slide-controls").appendChild(div);
	}
}

let currentSlide=0;
let autoSlide=0;

function controlSlide(element){
	clearInterval(timer)
	timer=setInterval(autoPlay,4000);
	autoSlide=element.id;
	currentSlide=element.id;
	changeSlide(currentSlide);
}

function changeSlide(currentSlide){
	controlButtons=document.querySelector(".slide-controls").children;

	for(let i=0; i<controlButtons.length; i++){
		controlButtons[i].classList.remove("active")
	}
	controlButtons[currentSlide].classList.add("active")
	sliderContainer.style.marginLeft=-(containerWidth*currentSlide) + "px";
}

function autoPlay(){
	if(autoSlide==slideDots-1){
		autoSlide=0;
	}
	else{
		autoSlide++;
	}
	changeSlide(autoSlide)
}

let timer=setInterval(autoPlay,4000);

window.onload=load();

// Header fixed

window.onscroll=function(){
	const docScrollTop=document.documentElement.scrollTop;

	if(window.innerWidth>991){
		if(docScrollTop>100){
			document.querySelector("header").classList.add("fixed")
		}
		else{
			document.querySelector("header").classList.remove("fixed")
		}
	}
}

// navbar links
const navbar = document.querySelector(".navbar");
a = navbar.querySelectorAll("a");

a.forEach(function(element){
	element.addEventListener("click",function(){
		for(let i=0; i<a.length; i++){
			a[i].classList.remove("active");
		}
		this.classList.add("active")
		document.querySelector(".navbar").classList.toggle("show");
	})
})

//Hamburger

const hamBurger=document.querySelector(".ham-burger");

hamBurger.addEventListener("click", function(){
	document.querySelector(".navbar").classList.toggle("show");
})

// Preloader
// var overlay = document.getElementById("loader");

// window.addEventListener('load', function(){
//   overlay.style.display = 'none';
// })
var loaDer = document.querySelector("#preloader");
window.addEventListener("load", vanish);

function vanish() {
  loaDer.classList.add("disppear");
}

// Scroll To Top

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};