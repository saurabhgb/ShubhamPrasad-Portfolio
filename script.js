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
      document.getElementById("blog-content").innerHTML = html;
    })
    .catch(error => {
      console.error("Error loading blog:", error);
      document.getElementById("blog-content").textContent = "Could not load blog content.";
    });
});
