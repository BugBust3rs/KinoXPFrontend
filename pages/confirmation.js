//import { createConfirmation } from "/pages/confirmation.js";
import { fetchReservation} from "../../api/reservation.api.js";

export async function createConfirmation(app, reservationId) {
    // Henter reservation data fra backend via id
    const reservation = await fetchReservation(reservationId);
    console.log(reservation);

    const h1 = document.createElement("h1");
    h1.textContent = "Booking bekræftet!";
    h1.classList.add("text-light");
    app.appendChild(h1);

     // Wrapper til beskeden

    const confirmation = document.createElement("div");
    confirmation.classList.add("confirmation-wrapper");

  

    // Besked
    const title = document.createElement("h3");
    title.context = "Booking bekræftet";
    title.classList.add("text-light");



     // Samler det hele
    
    confirmation.appendChild(title);
    
    app.appendChild(confirmation);
   





}


