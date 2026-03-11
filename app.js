import { createHome } from "./pages/home.js";
import { createAdmin } from "./pages/admin.js";
import { createNotFound } from "./pages/notFound.js";
import { createScreenings } from "./pages/screenings.js";
import { createReservation } from "./pages/reservation.js";
import { createConfirmation } from "./pages/confirmation.js";
// Router logic
function router() {
  // Get the hash (e.g., #/movies)
  const hash = window.location.hash.slice(1) || "/";
  console.log(hash, "hash");
  
  // Update the app container
  const app = document.getElementById("app");

  app.innerHTML = "";

  const screeningsMatch = hash.match(/^\/screenings\/(\d+|[a-zA-Z0-9-_]+)$/);
  const reservationMatch = hash.match(/^\/reservation\/(\d+|[a-zA-Z0-9-_]+)$/);
  const confirmationMatch = hash.match(/^\/confirmation\/(\d+|[a-zA-Z0-9-_]+)$/);


  if (hash === "/") {
    createHome(app);
  } else if (hash === "/admin") {
    createAdmin(app);
  } else if (confirmationMatch) {
    createConfirmation(app, confirmationMatch[1]);
  } else if (screeningsMatch) {
    const movieId = screeningsMatch[1];
    createScreenings(app, movieId);
  } else if (reservationMatch) {
    const screeningId = reservationMatch[1];
    createReservation(app, screeningId);
  } else {
    createNotFound(app)
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
