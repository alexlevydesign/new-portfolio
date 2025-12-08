// Get name of current page by the text in the H1 tag
const currentPage = document.getElementsByTagName("title")[0].innerHTML;
// console.log(currentPage);

//array of UI & UX pages
const uxPages = ["Alex Levy's Portfolio — UI and UX", "The Newshouse Redesign", "Typeface Library Tool", "Optimal Assessment", "AI Financial Advisor", "Government Data Finder", "Coding by Design"]

//array of graphic design pages
const graphicDesignPages = ["Alex Levy's Portfolio — Graphic design", "CuseHacks Branding", "Type Specimen", "Motion Reel", "Flavefull Branding", "Daily Orange Graphics", "Map Design", "Community Geography Rebrand", "Petropolis Magazine"]

// Compare current page to array of all UX pages
uxPages.forEach(page => {
    // console.log(page);
    if (currentPage === page) {
        // console.log("This is a UX page!")
        // document.getElementby("NavBarLinksChild").classList.add("CurrentPage");
        // console.log(document.getElementsByClassName("NavBarLinksChild")[1].innerHTML);
        document.getElementsByClassName("NavBarLinksChild")[1].classList.add("CurrentPage");
    }
});

// Compare current page to array of all graphic design pages
graphicDesignPages.forEach(page => {
    if (currentPage === page) {
        // console.log("This is a graphic design page!")
        document.getElementsByClassName("NavBarLinksChild")[2].classList.add("CurrentPage");
    }
});

const projectCards = document.querySelectorAll(".ProjectCard");

projectCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    const mouseMoveHandler = (e) => {
      card.style.setProperty("--x", `${e.x}px`);
      card.style.setProperty("--y", `${e.y}px`);
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    card.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    }, { once: true });
  });
});

// Image Slider
const slider = document.querySelector('.SliderImageContainer');
const slides = document.querySelectorAll('.SliderImage');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

if (slider && slides.length > 0) {
  let currentSlide = 0;

  function updateSlider() {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('SlideActive'));
    
    // Add active class to current slide
    slides[currentSlide].classList.add('SlideActive');
    
    // Calculate the transform value
    // Each slide takes up full width + gap
    const slideWidth = slides[0].offsetWidth;
    const gap = 32; // 2rem gap in pixels (approximate)
    const offset = currentSlide * (slideWidth + gap);
    
    slider.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Initialize slider
  updateSlider();
}
