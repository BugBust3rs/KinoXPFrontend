const BASE_URL_SCREENINGS = "http://localhost:8080/api/screenings/";

export async function fetchScreenings(movieId) {
//   try {
//     const response = await fetch(`${BASE_URL_SCREENINGS}${movieId}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching screenings", error);
//   } 
    console.log(movieId, "movieId");

    return screenings.filter(screening => screening.movie.id === Number(movieId));
}



const screenings = [
  {
    id: 1,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 1,
      name: "Hall 1"
    },
    durationMinutes: 120,
    startDateTime: "2026-08-03T18:30:00+01:00",
    basePrice: 120,
    is3D: true
  },
  {
    id: 2,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 2,
      name: "Hall 2"
    },
    durationMinutes: 120,
    startDateTime: "2026-08-03T20:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 3,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 2,
      name: "Hall 2"
    },
    durationMinutes: 120,
    startDateTime: "2026-08-03T22:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 4,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 2,
      name: "Hall 2"
    },
    durationMinutes: 120,
    startDateTime: "2026-07-03T18:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 5,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 1,
      name: "Hall 1"
    },
    durationMinutes: 120,
    startDateTime: "2026-07-03T20:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 6,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 1,
      name: "Hall 1"
    },
    durationMinutes: 120,
    startDateTime: "2026-09-03T20:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 7,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 1,
      name: "Hall 1"
    },
    durationMinutes: 120,
    startDateTime: "2026-010-03T20:30:00+01:00",
    basePrice: 120,
    is3D: false
  },
  {
    id: 8,
    movie: {
      id: 1,
      title: "Dune: Part Two"
    },
    hall: {
      id: 1,
      name: "Hall 1"
    },
    durationMinutes: 120,
    startDateTime: "2026-011-03T20:30:00+01:00",
    basePrice: 120,
    is3D: false
  }
];