const BASE_URL_SCREENINGS = "http://localhost:8080/screenings/";

export async function fetchScreenings(movieId) {
  try {
    const response = await fetch(`${BASE_URL_SCREENINGS}movie/${movieId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const screenings = await response.json();
    console.log(screenings, "screenings");
     
    return screenings;
  } catch (error) {
    console.error("Error fetching screenings", error);
  } 
    // console.log(movieId, "movieId");
    // return screenings.filter(screening => screening.movie.id === Number(movieId));
}

export async function fetchScreening(screeningId) {
  try {
    const response = await fetch(`${BASE_URL_SCREENINGS}${screeningId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const screening = await response.json();
    console.log(screening, "screening");
     
    return screening;

  } catch (error) {
    console.error("Error fetching screening", error);
  }
}
