import inception from "../images/inception.js";
const BASE_URL_MOVIE = "http://localhost:8080/api/movie";

export async function fetchMovies() {
  try {
    // const response = await fetch(BASE_URL_MOVIE);
    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // return await response.json();
    // change this when backend works
    return fakeMovies();
    
  } catch (error) {
    console.error("Error fetching movies", error)
  }
}

function fakeMovies() {
   return [
  {
    id: 1,
    title: "Inception",
    durationMinutes: 148,
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    category: "Sci-Fi",
    ageLimit: 13,
    base64: inception
    },
  {
    id: 2,
    title: "The Dark Knight",
    durationMinutes: 152,
    description: "Batman faces the Joker in Gotham City.",
    category: "Action",
    ageLimit: 15,
    base64: inception
  },
  {
    id: 3,
    title: "Frozen",
    durationMinutes: 102,
    description: "A princess sets off on a journey to find her sister.",
    category: "Animation",
    ageLimit: 0,
    base64: inception
  },
  {
    id: 4,
    title: "The Conjuring",
    durationMinutes: 112,
    description: "Paranormal investigators help a family terrorized by a dark presence.",
    category: "Horror",
    ageLimit: 18,
    base64: inception
  }
];
}
