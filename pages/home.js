import { fetchMovies } from "../api/movie.api.js";

export async function createHome(app) {
  const movies = await fetchMovies();
  console.log(movies);

  const section = document.createElement("div");
  section.classList.add("pt-5");

  const h2 = document.createElement("h2");
  h2.textContent = "Currently Playing";
  h2.classList.add("text-light");

  // Wrapper for arrows + list
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");

  // Left arrow
  const leftBtn = document.createElement("button");
  leftBtn.classList.add("slider-arrow", "left");
  leftBtn.innerHTML = "&#10094;";
  leftBtn.setAttribute("aria-label", "Scroll left");

  // Right arrow
  const rightBtn = document.createElement("button");
  rightBtn.classList.add("slider-arrow", "right");
  rightBtn.innerHTML = "&#10095;";
  rightBtn.setAttribute("aria-label", "Scroll right");

  // Create ul here, not globally
  const ul = document.createElement("ul");
  ul.classList.add("horizontal-list");

  movies.forEach((movie) => {
    ul.appendChild(createMovie(movie));
  });

  const updateButtons = () => {
  const maxScrollLeft = ul.scrollWidth - ul.clientWidth;

  const isOverflowing = ul.scrollWidth > ul.clientWidth;

  // hide arrows completely if no overflow
  leftBtn.style.display = isOverflowing ? "block" : "none";
  rightBtn.style.display = isOverflowing ? "block" : "none";

  if (!isOverflowing) return;

  // disable arrows when at ends
  leftBtn.disabled = ul.scrollLeft <= 0;
  rightBtn.disabled = ul.scrollLeft >= maxScrollLeft - 1;
};

  leftBtn.addEventListener("click", () => {
    ul.scrollBy({
      left: -ul.clientWidth,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", () => {
    ul.scrollBy({
      left: ul.clientWidth,
      behavior: "smooth",
    });
  });

  ul.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  sliderWrapper.appendChild(leftBtn);
  sliderWrapper.appendChild(ul);
  sliderWrapper.appendChild(rightBtn);

  section.appendChild(h2);
  section.appendChild(sliderWrapper);
  app.appendChild(section);

  updateButtons();
}



const createMovie = (movie) => {
  console.log(movie, "movie");

  const li = document.createElement("li");
  const article = document.createElement("article");

  const a = document.createElement("a");
  a.href = `#/screenings/${movie.id}`;
  a.classList.add("link-underline", "link-underline-opacity-0");

  const poster = document.createElement("div");
  poster.classList.add("poster");

  const img = document.createElement("img");
  img.src = `data:image/png;base64,${movie.image}`;
  img.alt = `Poster for ${movie.title}`;
  poster.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = movie.title;
  h3.classList.add("text-danger", "mb-1");
  h3.style.marginTop = "0%";

  a.appendChild(poster);
  a.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = `${movie.category} · ${movie.durationMinutes} · ${movie.ageLimit}`;
  p.classList.add("text-secondary");
  p.style.marginTop = "0%";

  const button = document.createElement("a");
  button.classList.add("btn", "btn-secondary");
  button.href = `#/screenings/${movie.id}`;
  button.textContent = "Buy Tickets";

  article.appendChild(a);
  article.appendChild(p);
  article.appendChild(button);

  li.appendChild(article);

  return li;
};