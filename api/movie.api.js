const BASE_URL_MOVIE = "http://localhost:8080/api/movie";

export async function fetchMovies() {
  try {
    const response = await fetch(BASE_URL_MOVIE);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }    
  } catch (error) {
    console.error("Error fetching movies", error)
  }
}

