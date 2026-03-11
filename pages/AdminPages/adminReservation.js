// Importerer API-funktioner til at hente reservationer og screenings fra backend
import { fetchScreening } from "../../api/screening.api.js";
import { fetchReservations, deleteReservation } from "../../api/reservation.api.js";

// Opretter et globalt table-element som genbruges ved hver opdatering
const table = document.createElement("table", "text-center", "text-light");


// Hovedfunktion der bygger reservationsoversigten i admin-panelet
export async function createAdminReservation(app){

    // Laver  KinoXP Admin overskrift 
    const h1 = document.createElement("h1");
    h1.textContent = "KINOXP ADMIN";
    h1.classList.add("text-danger");

    // laver Reservation overskrift
    const h2 = document.createElement("h2");
    h2.textContent = "Revervations";
    h2.classList.add("text-primary");

    // Opretter en wrapper div med border rundt om tabellen
    const wrapper = document.createElement("div");
    wrapper.classList.add("border", "border-danger", "p-2", "rounded", "d-inline-block");

    
    
    // Rydder tabellen så gamle data ikke vises ved genindlæsning
    table.innerHTML = "";
        table.classList.add("table", "table-sm", "table-borderless");

    
    // Henter alle reservationer fra backend
    const reservations = await fetchReservations();
    console.log(reservations);

    // Opretter header-rækken med kolonnetitler
    const tr = document.createElement("tr");
    tr.classList.add("text-start");
    const th1 = document.createElement("th");
    th1.scope="col";
    const th2 = document.createElement("th");
    th2.scope="col";
    const th3 = document.createElement("th");
    th3.scope="col";
    const th4 = document.createElement("th");
    th4.scope="col";



    // Sætter tekst og rød farve på hver kolonneoverskrift
    th1.textContent = "Customer";
    th1.classList.add("text-primary", "pe-4")
    th2.textContent = "Movie";
    th2.classList.add("text-primary", "pe-4")
    th3.textContent = "Showtime";
    th3.classList.add("text-primary", "pe-4")
    th4.textContent = "Seats";
    th4.classList.add("text-primary", "pe-4")

    const th5 = document.createElement("th");
    th5.scope = "col";
    th5.classList.add("text-primary", "pe-4");
    tr.appendChild(th5);

        
  
    table.appendChild(tr);
    

    // Tilføjer alle th-elementer til header-rækken
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5)

    // Opretter en tabelrække for hver reservation
    reservations.forEach((reservation) => {
        createRow(reservation)   
    });

    // Tilføjer header-rækken og tabellen til siden
    app.appendChild(h1);
    app.appendChild(h2);
    wrapper.appendChild(table);
    app.appendChild(wrapper);
    table.appendChild(tr);
   
}

// Opretter én tabelrække med data for en enkelt reservation
async function createRow(reservation){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    // Henter den tilknyttede screening fra backend via screening-id
    const screening = await fetchScreening(reservation.screening.id)

    console.log(reservation.seats);

    console.log(screening, "screening");
    console.log(screening.startDateTime, "reservation.startDateTime");

    // Splitter dato og tid fra screeningens startDateTime
    const { date, time } = splitDateTime(screening.startDateTime);

    // Udfylder cellerne med kundenavn, filmtitel, dato+tid og sæder
    td1.textContent = reservation.customerName;
    td1.classList.add("text-light", "text-start", "pe-4");
    td2.textContent = screening.movie.title;
    td2.classList.add("text-light", "text-start" , "pe-4");
    td3.textContent = `${date}-${time}`;
    td3.classList.add("text-light", "text-start", "pe-4");
    td4.textContent = reservation.seats.map(seat => `Seat ${seat.seatRow}-${seat.seatColumn}`).join(", ");
    td4.classList.add("text-light", "text-start", "pe-4");

      //opretter slet knap
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slet";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");

    // Kalder delete funktionen når der klikkes
    deleteBtn.addEventListener("click", async () => {
        await deleteReservation(reservation.id);
        tr.remove();// fjerner rækken fra tabellen
    })

    td5.appendChild(deleteBtn);
   

    // Tilføjer alle celler til rækken, og rækken til tabellen
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5);
    table.appendChild(tr)
}

// Hjælpefunktion der formaterer en ISO datetime-streng (fx "2026-03-09T14:30:00")
// til separat dato ("03-09") og tid ("14:30")
function splitDateTime(datetime) {
    console.log(datetime);

    // Splitter på "T" for at adskille dato og tid
    const [date, time] = datetime.split("T");

    // Udtrækker måned og dag fra datodelen (ignorerer år)
    const [, month, day] = date.split("-");

    // Udtrækker timer og minutter fra tidsdelen
    const [hours, minutes] = time.split(":");

    return {
        date: `${month}-${day}`,
        time: `${hours}:${minutes}`,
    };
}