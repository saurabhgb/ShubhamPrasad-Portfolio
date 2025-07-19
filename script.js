function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
 // Typing animation
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
typeTagline();
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const spinner = document.getElementById("spinner");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  fetch("blog/my-btech-journey.md")
    .then((response) => (response.ok ? response.text() : Promise.reject()))
    .then((markdown) => {
      document.getElementById("blog-content").innerHTML = marked.parse(markdown);
    })
    .catch(() => {
      document.getElementById("blog-content").textContent = "Could not load blog content.";
    });

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
    { threshold: 0.2 }
  );
  skillLevels.forEach((skill) => skillObserver.observe(skill));

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

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
  }

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
});
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});
