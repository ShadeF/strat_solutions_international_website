document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const images = document.querySelectorAll("img[data-src]");
  const config = {
    rootMargin: "0px 0px 50px 0px",
    threshold: 0,
  };

  // Code to make button go to top to from Button
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // end

  // Navbar Pointer Change
  const pointerLink = document.querySelectorAll(".nav-links li a");
  pointerLink.forEach((link) => {
    link.addEventListener("click", function () {
      pointerLink.forEach((pointerLink) =>
        pointerLink.classList.remove("active")
      );
      this.classList.add("active");
    });
  });
  // end

  // Lazy Loading for images
  document.querySelectorAll("img[data-src]").forEach((img) => {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = () => {
      img.removeAttribute("data-src");
    };
  });

  let observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        self.unobserve(entry.target);
      }
    });
  }, config);

  images.forEach((image) => {
    observer.observe(image);
  });

  function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) return;
    img.src = src;
    img.onload = () => {
      img.removeAttribute("data-src");
    };
  }
  // end

  // Burger menu
  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });

  // Close navbar when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Close the navbar
      nav.classList.remove("nav-active");

      // Reset the burger animation
      burger.classList.remove("toggle");

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    });
  });
  // end

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  // end

  // Check if the URL has a hash and if it's #about
  if (window.location.hash === "#about") {
    // Redirect to #home or scroll to the top
    window.location.hash = "#home";
  } else if (window.location.hash) {
    // If there's any other hash, scroll to it smoothly
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the hash doesn't exist, scroll to the top
      window.scrollTo(0, 0);
    }
  } else {
    // If there's no hash, ensure at the top
    window.scrollTo(0, 0);
  }
  // end

  // Animation for logo slide
  const copy = document.querySelector(".logo_slide").cloneNode(true);
  document.querySelector(".client_section").appendChild(copy);
});
// end
