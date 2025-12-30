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

// Slider functionality - Support multiple sliders
const sliders = document.querySelectorAll('.Slider');

sliders.forEach((slider) => {
    const sliderContainer = slider.querySelector('.SliderImageContainer');
    const slides = slider.querySelectorAll('.SliderImage');
    const prevButtons = slider.querySelectorAll('.SliderPrevButton');
    const nextButtons = slider.querySelectorAll('.SliderNextButton');

    if (sliderContainer && slides.length > 0) {
        let currentSlide = 0;
        let isTransitioning = false;
        let previousWidth = window.innerWidth;

        function getLeftPadding() {
            const width = window.innerWidth;
            if (width <= 400) return 1.2 * 16; // 1.2rem in pixels
            if (width <= 600) return 1 * 16; // 1rem in pixels
            if (width <= 800) return 1.7 * 16; // 1.7rem in pixels
            if (width <= 1300) return 3 * 16; // 3rem in pixels
            return 16 * 16; // 16rem in pixels
        }

        function updateSlider() {
            // Calculate widths based on viewport, not current element widths
            const viewportWidth = window.innerWidth;
            const leftPadding = getLeftPadding();
            const contentWidth = viewportWidth - (leftPadding * 2);
            
            // Active slide will be full content width, inactive will be 75% of that
            const activeWidth = contentWidth;
            const inactiveWidth = contentWidth * 0.75;
            
            // Calculate offset based on what widths WILL BE after transition
            const gap = 32; // 2rem gap
            let offset = 0;
            for (let i = 0; i < currentSlide; i++) {
                // Previous slides will all be inactive, so use inactive width
                offset += inactiveWidth + gap;
            }
            
            // Update active state
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('SlideActive');
                } else {
                    slide.classList.remove('SlideActive');
                }
            });
            
            sliderContainer.style.transform = `translateX(-${offset}px)`;
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Match CSS transition duration
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
            }, 500); // Match CSS transition duration
        }

        // Add event listeners to all prev/next buttons in this slider
        nextButtons.forEach(button => {
            button.addEventListener('click', nextSlide);
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', prevSlide);
        });

        // Update on window resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const wasAbove1300 = previousWidth > 1300;
            const isBelow1300 = width <= 1300;
            
            // Reset to first slide when crossing the 1300px breakpoint going down
            if (wasAbove1300 && isBelow1300) {
                currentSlide = 0;
                // Disable transition temporarily
                sliderContainer.style.transition = 'none';
                updateSlider();
                // Re-enable transition after a brief delay
                setTimeout(() => {
                    sliderContainer.style.transition = '';
                }, 50);
            } else {
                updateSlider();
            }
            
            previousWidth = width;
        });

        // Initial update
        updateSlider();
    }
});
