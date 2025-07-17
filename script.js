
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
// 👇 Dynamic Markdown Blog Rendering
document.addEventListener("DOMContentLoaded", () => {
  fetch("blog/my-btech-journey.md")
    .then(res => res.text())
    .then(markdown => {
      document.getElementById("blog-content").innerHTML = marked.parse(markdown);
    })
    .catch(err => {
      document.getElementById("blog-content").innerText = "Failed to load blog.";
      console.error("Error loading blog:", err);
    });
});
