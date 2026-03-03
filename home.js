export function createHome(app) {
  sideStart(app);
}

const sideStart = (app) => {
  app.innerHTML = `
        <div class="hero">
             <h2>Welcome to Task Manager</h2>
             <p>Manage your tasks efficiently and stay productive!</p>
             <a href="#/tasks" class="btn" data-link>View Tasks</a>
         </div>
        `;
};
