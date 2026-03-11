const BASE_URL_MOVIE = "http://localhost:8080/movies";

export async function fetchMovies() {
  try {
    const response = await fetch(BASE_URL_MOVIE);
    console.log(response, "response");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies", error)
  }
}

export async function fetchMovie(movieId) {
  try {
    const response = await fetch(`${BASE_URL_MOVIE}/${movieId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie", error);
  }
}
