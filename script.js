function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  // Typing Animation
  const tagline = "No goal is bigger than a person's struggle! Growth starts with dreaming.";
  const taglineEl = document.getElementById("typing-tagline");
  let i = 0;

  function typeTagline() {
    if (i < tagline.length) {
      taglineEl.innerHTML += tagline.charAt(i);
      i++;
      setTimeout(typeTagline, 50);
    }
  }

  if (taglineEl) typeTagline();

  // Blog markdown fetch
  fetch("my-btech-journey.md")
    .then((response) => response.text())
    .then((markdown) => {
      document.getElementById("blog-content").innerHTML = marked.parse(markdown);
    })
    .catch((error) => {
      document.getElementById("blog-content").innerText = "Failed to load blog.";
      console.error("Error loading blog:", error);
    });

  // Contact form handling
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const spinner = document.getElementById("spinner");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert("Please verify you are human by completing the reCAPTCHA.");
        return;
      }

      spinner.style.display = "flex";
      status.textContent = "Sending...";
      status.style.color = "#f9f871";

      const data = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          spinner.style.display = "none";
          if (response.ok) {
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "lightgreen";
            form.reset();
            grecaptcha.reset();
          } else {
            response.json().then((data) => {
              status.textContent = data.error || "❌ Message not sent. Try again.";
              status.style.color = "red";
            });
          }
        })
        .catch(() => {
          spinner.style.display = "none";
          status.textContent = "❌ Network error. Please try again.";
          status.style.color = "red";
        });
    });
  }

  // Nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

  // Active nav link on scroll
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
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  // Animate skill bars
  const skillLevels = document.querySelectorAll(".skill-level");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-skill") + "%";
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillLevels.forEach((skill) => skillObserver.observe(skill));

  // Scroll animation on sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideFadeIn 1s ease forwards";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("section").forEach((section) => observer.observe(section));

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});
