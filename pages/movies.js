import { fetchMovies } from "../api/movie.api.js";

const ul = document.createElement("ul");

export function createMovies(app) {
  render(app);
}

const render = async (app) => {
  const movies = await fetchMovies();
  console.log(movies);

  const div = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = "currently playing";
  h2.classList.add("text-light");

  div.appendChild(h2);
  ul.innerHTML = "";

  ul.classList.add("horizontal-list");
  div.classList.add("pt-5");

  movies.forEach((movie) => {
    createMovie(movie);
  });

  div.appendChild(ul);
  app.appendChild(div);
};

const createMovie = (movie) => {
  const li = document.createElement("li");
  const article = document.createElement("article");

  const a = document.createElement("a");
  a.href = `#/screenings/${movie.id}`;
  a.classList.add("link-underline", "link-underline-opacity-0"); // optional

  const poster = document.createElement("div");
  poster.classList.add("poster");

  const img = document.createElement("img");
  img.src = movie.base64;
  img.alt = `Poster for ${movie.title}`;
  poster.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = movie.title;
  h3.classList.add("text-danger", "mb-1");
  h3.style.marginTop = "0%"


  a.appendChild(poster);
  a.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = `${movie.category} · ${movie.durationMinutes} · ${movie.ageLimit}`;
  p.classList.add("text-secondary"); // remove top margin
  p.style.marginTop = "0%"

  const button = document.createElement("a");
  button.classList.add("btn", "btn-secondary");
  button.href = `#/screenings/${movie.id}`;
  button.textContent = "Buy Tickets";

  article.appendChild(a);
  article.appendChild(p);
  article.appendChild(button);
  li.style.marginRight = "40px";
  li.appendChild(article);
  ul.appendChild(li);
};
