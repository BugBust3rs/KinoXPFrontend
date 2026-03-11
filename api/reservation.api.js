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