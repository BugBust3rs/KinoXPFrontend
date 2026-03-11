import { logout } from "../../api/admin.api.js";

export function createAdminMenu(app) {
    const div = document.createElement("div");
div.classList.add("admin-container");

const h2 = document.createElement("h2");
h2.textContent = "Admin Menu";
h2.classList.add("admin-title");

const menuDiv = document.createElement("div");
menuDiv.classList.add("admin-menu");

const reservationsBtn = document.createElement("button");
reservationsBtn.textContent = "Reservations";
reservationsBtn.classList.add("admin-menu-btn");
reservationsBtn.onclick = () => {
    window.location.hash = "/admin/reservations";
};


    const movieListBtn = document.createElement("button");
    movieListBtn.classList.add("admin-menu-btn");
    movieListBtn.textContent = "Movie List";
    movieListBtn.onclick = () => {
    window.location.hash = "/admin/movie-list";
};

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.classList.add("admin-logout-btn");
    logoutBtn.onclick = logout;

    menuDiv.appendChild(reservationsBtn);
    menuDiv.appendChild(movieListBtn);
    div.appendChild(h2);
    div.appendChild(menuDiv);
    div.appendChild(logoutBtn);
  app.appendChild(div);
}