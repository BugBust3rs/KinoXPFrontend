import { createMovies } from "./movies.js";
import { createHome } from "./home.js";
import { createAdmin } from "./admin.js";
import { createNotFound } from "./notFound.js";

// Router logic
function router() {
  // Get the hash (e.g., #/movies)
  const hash = window.location.hash.slice(1) || "/";

  // Update the app container
  const app = document.getElementById("app");
  app.innerHTML = "";
  if (hash === "/") {
    createHome(app);
  } else if (hash === "/movies") {
    createMovies(app);
  } else if (hash === "/admin") {
    createAdmin(app);
  } else {
    view = views.notFound();
  }

  // Update active nav link
  updateActiveLink(hash);
}

// Update active navigation link
function updateActiveLink(currentHash) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentHash}`) {
      link.classList.add("active");
    }
  });
}

// Listen for hash changes
window.addEventListener("hashchange", router);

// Initial load
router();
