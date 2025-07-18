// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const spinner = document.getElementById("loading-spinner");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

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

  // Animate skill bars
  const skillLevels = document.querySelectorAll(".skill-level");
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute("data-skill") + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillLevels.forEach(skill => skillObserver.observe(skill));

  // Animate sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "slideFadeIn 1s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach(section => observer.observe(section));

  // Mobile Hamburger Menu Toggle
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
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Form Submission with reCAPTCHA and Spinner
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert("Please verify you are human by completing the reCAPTCHA.");
        return;
      }

      if (spinner) spinner.style.display = "inline-block";
      if (status) {
        status.textContent = "Sending...";
        status.style.color = "#f9f871";
      }

      const data = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      })
        .then(response => {
          if (spinner) spinner.style.display = "none";

          if (response.ok) {
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "lightgreen";
            form.reset();
            grecaptcha.reset();
          } else {
            response.json().then(data => {
              status.textContent = data.error || "❌ Message not sent. Try again.";
              status.style.color = "red";
            });
          }
        })
        .catch(() => {
          if (spinner) spinner.style.display = "none";
          status.textContent = "❌ Network error. Please try again.";
          status.style.color = "red";
        });
    });
  }
});
