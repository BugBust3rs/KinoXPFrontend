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

export async function updateMovie(movieId, movieData) {
  try {
    const response = await fetch(`${BASE_URL_MOVIE}/${movieId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating movie", error);
  }
}

export async function deleteMovie(movieId) {
  try {
    const response = await fetch(`${BASE_URL_MOVIE}/${movieId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return true;
  } catch (error) {
    console.error("Error deleting movie", error);
  }
}

export async function createMovie(movieData) {
  try {
    const response = await fetch(BASE_URL_MOVIE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error creating movie", error);
  }
}