import { fetchScreening } from "../api/screening.api.js";
import { postReservation } from "../api/reservation.api.js";

let totalPrice = 0;

export async function createReservation(app, screeningId) {
    const screening = await fetchScreening(screeningId);
    const seats = screening.seatResponseList;
    let basePrice = screening.basePrice;
    if (screening.is3D){
        basePrice += 40;
    }
    const movie = screening.movie;

    const cowboyRowSeatsPrice = 20;
    const couchRowSeatsPrice = 20;

    const reservation = {
        screeningId: screening.id,
        selectedSeats: []
    };

    const selectedSeats = new Set();

    const wrapper = document.createElement("div");
    wrapper.className = "container py-4";

    const layout = document.createElement("div");
    layout.className = "d-flex gap-5 align-items-start flex-wrap";

    const totalPriceEl = document.createElement("h4");
    totalPriceEl.className = "mt-4 text-light";
    totalPriceEl.textContent = "Total: 0DKK";

    const infoPanel = createReservationElement(
        movie,
        totalPriceEl,
        basePrice,
        cowboyRowSeatsPrice,
        couchRowSeatsPrice,
        screening.id,
        reservation
    );

    const card = document.createElement("div");
    card.className = "card shadow-sm border-0 bg-transparent text-white flex-grow-1";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const title = document.createElement("h2");
    title.className = "h4 mb-4 text-danger";
    title.textContent = "Choose your seats";

    const screen = document.createElement("div");
    screen.className = "screen mb-4 mx-auto";

    const container = document.createElement("div");
    container.className = "seat-map mx-auto";

    const maxColumn = screening.hall.seatColumns;
    const maxRow = screening.hall.seatRows;

    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${maxColumn}, 40px)`;
    container.style.gridTemplateRows = `repeat(${maxRow}, 40px)`;
    container.style.gap = "8px";
    container.style.justifyContent = "center";

    seats.forEach(seat => {
        const seatEl = createSeatElement(
            seat,
            seats,
            selectedSeats,
            reservation,
            totalPriceEl,
            basePrice,
            cowboyRowSeatsPrice,
            couchRowSeatsPrice
        );
        container.appendChild(seatEl);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(screen);
    cardBody.appendChild(container);
    card.appendChild(cardBody);

    layout.appendChild(infoPanel);
    layout.appendChild(card);
    wrapper.appendChild(layout);
    app.appendChild(wrapper);
}

function createReservationElement(
    movie,
    totalPriceEl,
    basePrice,
    cowboyRowSeatsPrice,
    couchRowSeatsPrice,
    screeningId,
    reservation
) {
    const wrapper = document.createElement("div");
    wrapper.className = "reservation-info text-white";
    wrapper.style.width = "320px";
    wrapper.style.flexShrink = "0";

    const img = document.createElement("img");
    img.src = `data:image/png;base64,${movie.image}`;
    img.alt = `Poster for ${movie.title}`;
    img.className = "img-fluid rounded shadow mb-3";

    const title = document.createElement("h2");
    title.textContent = movie.title;
    title.className = "text-danger mb-2";

    const meta = document.createElement("p");
    meta.textContent = `${movie.category} · ${movie.durationMinutes} min · ${movie.ageLimit}+`;
    meta.className = "text-light mb-2";

    const description = document.createElement("p");
    description.textContent = movie.description;
    description.className = "text-secondary mb-4";

    const seatLegend = createSeatPriceLegend(
        basePrice,
        cowboyRowSeatsPrice,
        couchRowSeatsPrice
    );

    totalPriceEl.classList.remove("mt-4");
    totalPriceEl.classList.add("text-danger", "fw-bold", "mb-0");

    const form = document.createElement("form");
    form.className = "mt-4";

    const emailInputEl = document.createElement("input");
    emailInputEl.type = "email";
    emailInputEl.placeholder = "Enter your email";
    emailInputEl.className = "form-control mb-3";
    emailInputEl.required = true;

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "btn btn-danger w-100 mt-2";
    submitBtn.textContent = "Confirm Reservation";

    form.appendChild(emailInputEl);
    form.appendChild(submitBtn);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInputEl.value;
        submitReservation(email, totalPrice, reservation.selectedSeats, screeningId);
    });

    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(meta);
    wrapper.appendChild(description);
    wrapper.appendChild(seatLegend);
    wrapper.appendChild(totalPriceEl);
    wrapper.appendChild(form);

    return wrapper;
}

function createSeatPriceLegend(basePrice, cowboyRowSeatsPrice, couchRowSeatsPrice) {
    const legendWrapper = document.createElement("div");
    legendWrapper.className = "mb-4";

    const legendTitle = document.createElement("p");
    legendTitle.textContent = "Seat prices";
    legendTitle.className = "text-light mb-3 fw-semibold";

    const legendRow = document.createElement("div");
    legendRow.className = "d-flex gap-3 justify-content-between";

    const cowboySeat = createLegendItem("seat COWBOYROW", `${basePrice - cowboyRowSeatsPrice} DKK`);
    const standardSeat = createLegendItem("seat", `${basePrice} DKK`);
    const couchSeat = createLegendItem("seat COUCHROW", `${basePrice + couchRowSeatsPrice} DKK`);
    const reserved = createLegendItem("seat reserved", `reserved`);
    
    legendRow.appendChild(cowboySeat);
    legendRow.appendChild(standardSeat);
    legendRow.appendChild(couchSeat);
    legendRow.appendChild(reserved);
    const p = document.createElement("p");
    p.textContent = "A reservation fee of 40DKK if you purchase five or fewer tickets."
    p.classList.add("text-secondary")
    legendRow.appendChild(p)
    legendWrapper.appendChild(legendTitle);
    legendWrapper.appendChild(legendRow);

    return legendWrapper;
}

function createLegendItem(squareClasses, priceText) {
    const item = document.createElement("div");
    item.className = "d-flex flex-column align-items-center text-center";
    item.style.width = "80px";

    const square = document.createElement("div");
    square.className = squareClasses;
    square.style.width = "28px";
    square.style.height = "28px";
    square.style.borderRadius = "6px";
    square.style.marginBottom = "8px";

    const price = document.createElement("small");
    price.className = "text-light";
    price.textContent = priceText;

    item.appendChild(square);
    item.appendChild(price);

    return item;
}

async function submitReservation(customerEmail, price, selectedSeats, screeningId) {
    const reservation = {
        customerName: "",
        customerEmail,
        creationDate: new Date().toISOString(),
        price,
        screeningId,
        seatIds: selectedSeats.map(seat => seat.id)
    };

    try {
        const response = await postReservation(reservation);
        console.log(response, "response");

        if (response) {
            window.location.hash = "/confirmation/" + response.id;
        }
    } catch (error) {
        alert("could not send reservation", error);
    }
}

function createSeatElement(
    seat,
    seats,
    selectedSeats,
    reservation,
    totalPriceEl,
    basePrice,
    cowboyRowSeatsPrice = 0,
    couchRowSeatsPrice = 0
) {
    const button = document.createElement("button");
    button.className = "seat btn btn-sm";
    button.type = "button";

    if (seat.modularSeating === "COWBOYROW") {
        button.classList.add("COWBOYROW");
    } else if (seat.modularSeating === "COUCHROW") {
        button.classList.add("COUCHROW");
    }

    button.style.gridRow = seat.seatRow;
    button.style.gridColumn = seat.seatColumn;

    if (seat.reserved) {
        button.classList.add("reserved");
        button.disabled = true;
        return button;
    }

    button.addEventListener("click", () => {
        if (selectedSeats.has(seat.id)) {
            selectedSeats.delete(seat.id);
            reservation.selectedSeats = reservation.selectedSeats.filter(s => s.id !== seat.id);
            button.classList.remove("selected");
        } else {
            selectedSeats.add(seat.id);
            reservation.selectedSeats.push(seat);
            button.classList.add("selected");
        }

        totalPrice = priceCalculation(
            reservation.selectedSeats,
            basePrice,
            cowboyRowSeatsPrice,
            couchRowSeatsPrice
        );

        totalPriceEl.textContent = `Total: ${totalPrice}DKK`;
    });

    return button;
}

function priceCalculation(selectedSeats, basePrice, cowboyRowSeatsPrice, couchRowSeatsPrice) {
    let total = 0;

    for (const seat of selectedSeats) {
        let seatPrice = basePrice;

        if (seat.modularSeating === "COWBOYROW") {
            seatPrice -= cowboyRowSeatsPrice;
        } else if (seat.modularSeating === "COUCHROW") {
            seatPrice += couchRowSeatsPrice;
        }

        total += seatPrice;
    }
    if (selectedSeats.length > 0 && selectedSeats.length <= 5) {
        total = total + 40;
    }
    // group discount (11+ tickets)
    if (selectedSeats.length >= 10) {
        const discount = total * 0.07;
        total -= discount;
    }
    

    return Math.round(total);
}