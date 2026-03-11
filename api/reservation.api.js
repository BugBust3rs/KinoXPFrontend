const BASE_URL_RESERVATION = "http://localhost:8080/reservations";

export async function postReservation(reservation) {
    console.log(reservation, "reservation");
    return fetch(BASE_URL_RESERVATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error posting reservation", error);
    });
}

export async function fetchReservations() {
  try {
    const response = await fetch('http://localhost:8080/reservations/');
    console.log(reservation); // 👈 hvad ser du i konsollen?
console.log(reservation.screening); // 👈 er screening undefined?

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Reservation hentet:", data);
    return data;

  } catch (error) {
    console.error("Fejl ved oprettelse af reservation:", error);
  }
}

// Henter én reservation via id
export async function fetchReservation(id) {
    try {
        const response = await fetch(`http://localhost:8080/reservations/${id}`); // 👈 backticks
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fejl ved hentning af reservation:", error);
    }
}


export async function deleteReservation(id) {
    await fetch(`http://localhost:8080/reservations/${id}`, {
        method: "DELETE"
    });
}
