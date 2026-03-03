import { fetchMovies } from "../api/movie.api.js";

const ul = document.createElement("ul");

export function createMovies(app) {
  render(app);
}

const render = async (app) => {
  const movies = await fetchMovies();
  console.log(movies);
  ul.innerHTML = "";

  ul.classList.add("horizontal-list");
  ul.classList.add("pt-5");

  movies.forEach((movie) => {
    createMovie(movie);
  });

  app.appendChild(ul);
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
  img.classList.add("rounded");
  poster.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = movie.title;
  h3.classList.add("text-danger");

  a.appendChild(poster);
  a.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = `${movie.category} · ${movie.durationMinutes} · ${movie.ageLimit}`;
  p.classList.add("text-secondary");

  article.appendChild(a);
  article.appendChild(p);

  li.classList.add("m-3");
  li.appendChild(article);
  ul.appendChild(li);
};
