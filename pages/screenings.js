import { fetchScreenings } from "../api/screening.api.js";
import { fetchMovie } from "../api/movie.api.js";

export async function createScreenings(app, movieId) {
  app.innerHTML = "";

  const screenings = await fetchScreenings(movieId);
  const movie = await fetchMovie(movieId);

  const screeningsByDate = groupScreeningsByDate(screenings);

  const mainContent = document.createElement("div");
  mainContent.classList.add("main-content");
  mainContent.style.position = "relative";

  const poster = createPoster(movie);

  const screeningContent = document.createElement("div");
  screeningContent.classList.add("screening-content");

  const dateList = document.createElement("ul");
  dateList.classList.add("horizontal-list-screenings");

  const screeningList = document.createElement("ul");
  screeningList.classList.add("vertical-list-screenings");

  Object.entries(screeningsByDate).forEach(([date, dateScreenings]) => {
    const dateItem = document.createElement("li");

    const weekdayEl = document.createElement("h3");

    const [month, day] = date.split("-");
    const newDate = new Date(2026, Number(month) - 1, Number(day));
    const weekDay = newDate.toLocaleDateString("en-US", { weekday: "long" });

    const dateEl = document.createElement("span");
    dateEl.textContent = date;
    dateEl.classList.add("text-secondary");

    const divEl = document.createElement("div");
    divEl.classList.add("d-flex", "flex-column", "align-items-center");

    weekdayEl.textContent = weekDay;
    weekdayEl.classList.add("text-danger", "mb-2");

    divEl.appendChild(weekdayEl);
    divEl.appendChild(dateEl);

    const list = document.createElement("ul");
    list.classList.add("day-screenings");

    dateScreenings.forEach((screening) => {
      renderScreenings(screening, list);
    });

    dateItem.appendChild(divEl);
    dateItem.appendChild(list);
    dateList.appendChild(dateItem);
  });

  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("slider-wrapper");

  const leftBtn = document.createElement("button");
  leftBtn.classList.add("slider-arrow", "left");
  leftBtn.innerHTML = "&#10094;";
  leftBtn.setAttribute("aria-label", "Scroll left");

  const rightBtn = document.createElement("button");
  rightBtn.classList.add("slider-arrow", "right");
  rightBtn.innerHTML = "&#10095;";
  rightBtn.setAttribute("aria-label", "Scroll right");

  sliderWrapper.appendChild(leftBtn);
  sliderWrapper.appendChild(dateList);
  sliderWrapper.appendChild(rightBtn);

  const updateButtons = () => {
    const maxScrollLeft = dateList.scrollWidth - dateList.clientWidth;
    const isOverflowing = dateList.scrollWidth > dateList.clientWidth;

    leftBtn.style.display = isOverflowing ? "block" : "none";
    rightBtn.style.display = isOverflowing ? "block" : "none";

    if (!isOverflowing) return;

    leftBtn.disabled = dateList.scrollLeft <= 0;
    rightBtn.disabled = dateList.scrollLeft >= maxScrollLeft - 1;
  };

  leftBtn.addEventListener("click", () => {
    dateList.scrollBy({
      left: -dateList.clientWidth,
      behavior: "smooth",
    });
  });

  rightBtn.addEventListener("click", () => {
    dateList.scrollBy({
      left: dateList.clientWidth,
      behavior: "smooth",
    });
  });

  dateList.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  screeningContent.appendChild(sliderWrapper);
  screeningContent.appendChild(screeningList);

  mainContent.appendChild(BackArrow());
  mainContent.appendChild(poster);
  mainContent.appendChild(screeningContent);

  app.appendChild(mainContent);

  updateButtons();
}

function renderScreenings(screening, list) {

  const li = document.createElement("li");
  li.classList.add("mb-3");
  const { time } = splitDateTime(screening.startTime);

  const a = document.createElement("a");

  a.classList.add(
    "btn",
    "btn-outline-light",
    "link-underline",
    "link-underline-opacity-0",
    "date-button",
    "d-flex",
    "flex-column"
  );


  const timeEL = document.createElement("h3");
  timeEL.textContent = time;

  const hallEl = document.createElement("span");
  hallEl.textContent = screening.hall.name;
  hallEl.classList.add("text-secondary", "mt-1");
  const formatEl = document.createElement("span");
  formatEl.textContent = screening.is3D ? "3D" : "2D";
  formatEl.classList.add("text-secondary");

  a.appendChild(hallEl);
  a.appendChild(timeEL);
  a.appendChild(formatEl);

  a.href = `#/reservation/${screening.id}`;

  li.appendChild(a);
  list.appendChild(li);

}

function BackArrow() {
  const a = document.createElement("a");
  a.href = "#/";
  a.classList.add("back-arrow", "text-secondary");
  a.textContent = "← Back to home page";

  a.style.position = "absolute";
  a.style.top = "10px";
  a.style.left = "20px";
  a.style.fontWeight = "500";
  a.style.zIndex = "10";
  a.style.fontSize = "1.5rem";
  a.style.gap = "6px";
  a.style.display = "flex";
  a.style.alignItems = "center";
  a.style.opacity = "0.8";
  a.onmouseenter = () => a.style.opacity = "1";
  a.onmouseleave = () => a.style.opacity = "0.8";

  return a;
}

function groupScreeningsByDate(screenings) {
  const grouped = {};

  screenings.forEach((screening) => {
    const { date } = splitDateTime(screening.startTime);

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(screening);
  });

  return grouped;
}

function splitDateTime(datetime) {
  console.log(datetime, "datetime");

  const [date, time] = datetime.split("T");
  const [, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");


function createPoster(movie) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("d-flex", "gap-4", "align-items-start", "mb-4", "mt-5");

  // poster image
  const img = document.createElement("img");
  img.src = `data:image/png;base64,${movie.image}`;
  img.alt = `Poster for ${movie.title}`;
  img.style.width = "300px";
  img.style.borderRadius = "8px";

  // info container
  const info = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = movie.title;
  title.classList.add("text-danger", "mb-2");

  const meta = document.createElement("p");
  meta.textContent = `${movie.category} · ${movie.durationMinutes} min · ${movie.ageLimit}+`;
  meta.classList.add("text-light", "mb-2");

  const description = document.createElement("p");
  description.textContent = movie.description;
  description.classList.add("text-secondary", "description");

  info.appendChild(title);
  info.appendChild(meta);
  info.appendChild(description);

  wrapper.appendChild(img);
  wrapper.appendChild(info);

  return wrapper;
}
