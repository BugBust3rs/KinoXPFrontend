const reservation = 
[
    {
    customerName: "Anders Jensen",
    customerEmail: "anders@email.dk",
    creationDate: new Date().toISOString().slice(0, 19), // format: "2026-03-09T14:30:00"
    price: 149.95,
    screening: {
      id: 1  // reference til eksisterende screening
    },
    seats: [
      { id: 3 }, // referencer til eksisterende sæder
      { id: 7 }
    ]
  },
];
export async function fetchReservations() {
  try {
    const response = await fetch("http://localhost:8080/reservations");

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

export async function deleteReservation(id) {
    await fetch(`http://localhost:8080/reservations/${id}`, {
        method: "DELETE"
    });
}
