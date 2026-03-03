export function createAdmin(app) {
  render(app);
}

const render = (app) => {
  app.innerHTML = `
         <h2>About KinoXP</h2>
         <p>KinoXP is a simple application to help you organize your daily movies.</p>
         <p>Built with HTML, CSS, and JavaScript.</p>
     `;
};
