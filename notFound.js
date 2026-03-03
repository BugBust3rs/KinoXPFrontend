export function createNotFound(app) {
  sideStart(app);
}

const sideStart = (app) => {
  app.innerHTML = `
        <div class="hero">
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn" data-link>Go Home</a>
        </div>
    `;
};
    