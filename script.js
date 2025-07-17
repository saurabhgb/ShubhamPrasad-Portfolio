// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Blog Markdown Fetch and Render
document.addEventListener("DOMContentLoaded", () => {
  fetch("blog/my-btech-journey.md")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      const blogEl = document.getElementById("blog-content");
      blogEl.innerHTML = html;
      blogEl.style.opacity = 1;  // 👈 Fade in animation trigger
    })
    .catch(error => {
      console.error("Error loading blog:", error);
      const blogContainer = document.getElementById("blog-content");
      if (blogContainer)
        blogContainer.textContent = "Could not load blog content.";
    });
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
