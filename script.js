// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  // Load Blog Markdown
  fetch("blog/my-btech-journey.md")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      const blogEl = document.getElementById("blog-content");
      blogEl.innerHTML = html;
      blogEl.style.opacity = 1;
    })
    .catch(error => {
      console.error("Error loading blog:", error);
      const blogContainer = document.getElementById("blog-content");
      if (blogContainer) blogContainer.textContent = "Could not load blog content.";
    });

  // Animate sections on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideFadeIn 1s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Mobile Hamburger Menu Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Scroll-Based Active Nav Highlight
  const sections = document.querySelectorAll("section");
  const navAnchors = document.querySelectorAll(".nav-links li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
// Animate skill bars when they appear in viewport
const skillLevels = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.getAttribute('data-skill');
      target.style.width = width + '%';
    }
  });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
  skillObserver.observe(skill);
});
