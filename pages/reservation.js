

export function createReservation(app, screeningId) {
    console.log("hej");
    
  app.innerHTML = `
        <div class="hero">
            <h2>reservation page ${screeningId}</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn" data-link>Go Home</a>
        </div>
    `;
}

