'use strict';

// loaded 
// loading will be end after document is loaded 

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load",function(){
    preloader.classList.add("loaded");
    this.document.body.classList.add("loaded")
});

// add event listener on mulitiple elements 

const addEventOnElements =function(elements,eventType,callback){
    for(let i=0, len=elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

// navbar 

const navbar= document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar =function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers,"click", toggleNavbar);

// header & Back to top 

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



// hero slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }
    updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }
    updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// auto slide

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseover", function (){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],"mouseout",autoSlide);

window.addEventListener("load",autoSlide);

// parallax effect 

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


document.getElementById('bookOrderButton').addEventListener('click', function() {
  var formContainer = document.getElementById('formContainer');
  
  if (formContainer.style.display === 'none' || formContainer.style.display === '') {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
});



// validation 

document.getElementById('reservationForm').addEventListener('submit', function(event) {
  let isValid = true;

  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const person = document.getElementById('person');
  const reservationDate = document.getElementById('reservation-date');
  const time = document.getElementById('time');
  
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const personError = document.getElementById('person-error');
  const dateError = document.getElementById('date-error');
  const timeError = document.getElementById('time-error');

  if (!name.value) {
    isValid = false;
    name.classList.add('error');
    nameError.style.display = 'block';
  } else {
    name.classList.remove('error');
    nameError.style.display = 'none';
  }

  if (!phone.value) {
    isValid = false;
    phone.classList.add('error');
    phoneError.style.display = 'block';
  } else {
    phone.classList.remove('error');
    phoneError.style.display = 'none';
  }

  if (!person.value) {
    isValid = false;
    person.classList.add('error');
    personError.style.display = 'block';
  } else {
    person.classList.remove('error');
    personError.style.display = 'none';
  }

  if (!reservationDate.value) {
    isValid = false;
    reservationDate.classList.add('error');
    dateError.style.display = 'block';
  } else {
    reservationDate.classList.remove('error');
    dateError.style.display = 'none';
  }

  if (!time.value) {
    isValid = false;
    time.classList.add('error');
    timeError.style.display = 'block';
  } else {
    time.classList.remove('error');
    timeError.style.display = 'none';
  }

  if (!isValid) {
    event.preventDefault();
  }
});





document.addEventListener('DOMContentLoaded', function () {
  const cateringForm = document.getElementById('cateringForm');
  const bookOrderButton = document.getElementById('bookOrderButton');
  const formContainer = document.getElementById('formContainer');
  const successMessage = document.getElementById('successMessage');

  const resetErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => {
      errorMessage.style.display = 'none';
    });
  };

  formContainer.style.display = 'none';
  successMessage.style.display = 'none';

  bookOrderButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
    bookOrderButton.style.display = 'none';
  });

  cateringForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const fields = [
      { id: 'event-name', errorId: 'event-name-error' },
      { id: 'event-theme', errorId: 'event-theme-error' },
      { id: 'reservation-date-start', errorId: 'start-date-error' },
      { id: 'reservation-date-end', errorId: 'end-date-error' },
      { id: 'event-time', errorId: 'event-time-error' },
      { id: 'address', errorId: 'address-error' },
      { id: 'address-line-2', errorId: 'address-line-2-error' },
      { id: 'city', errorId: 'city-error' },
      { id: 'state', errorId: 'state-error' },
      { id: 'arrival-time', errorId: 'arrival-time-error' },
      { id: 'food-served-time', errorId: 'food-served-time-error' },
      { id: 'number-of-guest', errorId: 'guest-error' },
      { id: 'contact-person', errorId: 'contact-person-error' },
      { id: 'contact-email', errorId: 'contact-email-error' },
      { id: 'phone', errorId: 'phone-error' },
      { id: 'food-request', errorId: 'food-request-error' }
    ];

    let isValid = true;

    resetErrorMessages(); 

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const errorMessage = document.getElementById(field.errorId);
      if (!input.value.trim()) {
        errorMessage.style.display = 'block';
        isValid = false;
      } else {
        errorMessage.style.display = 'none';
      }
    });
  });
});






