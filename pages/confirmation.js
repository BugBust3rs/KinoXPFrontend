export function createConfirmation(app, reservationId) {
    app.innerHTML = `
        <div class="hero">
            <h2>SUCCESS</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn" data-link>Go Home</a>
        </div>
    `;
}
