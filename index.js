// Get name of current page by the text in the H1 tag
const currentPage = document.getElementsByTagName("title")[0].innerHTML;
// console.log(currentPage);

//array of UI & UX pages
const uxPages = ["Alex Levy's Portfolio — UI and UX", "The Newshouse Redesign", "Typeface Library Tool", "Optimal Assessment", "AI Financial Advisor", "Government Data Finder", "Coding by Design"]

//array of graphic design pages
const graphicDesignPages = ["Alex Levy's Portfolio — Graphic design", "CuseHacks Branding", "Type Specimen", "Motion Reel", "Flavefull Branding", "Daily Orange Graphics", "Map Design", "Community Geography Rebrand", "Petropolis Magazine"]

// Compare current page to array of all UX pages
uxPages.forEach(page => {
    console.log(page);
    if (currentPage === page) {
        console.log("This is a UX page!")
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
