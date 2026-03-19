import { fetchMovies, updateMovie, deleteMovie, createMovie } from "../../api/movie.api.js";
import { createScreening } from "../../api/screening.api.js";

export function createAdminMovieList(app) {
    render(app);
}

const render = async (app) => {
    // hent film fra backend
    const movies = await fetchMovies();

    // rydder siden
    app.innerHTML = "";

    // laver en container
    const container = document.createElement("div");
    container.classList.add("mt-4");

    // laver en overskrift
    const h2 = document.createElement("h2");
    h2.textContent = "Admin Movies";
    h2.classList.add("mb-3");

    // laver en add-knap
    const addButton = createAddMovieButton(app); // tilføjet app som argument så modal kan genindlæse siden
    addButton.classList.add("mb-3");

    // lav table + tbody ved at kalde funktionen
    const { table, tbody } = createMovieTable();

    // gå gennem listen af film og hent info
    movies.forEach((movie) => {
        const row = createMovieRow(movie, tbody, app); // tilføjet tbody og app som argumenter
        tbody.appendChild(row);
    });

    // tilføjer til container
    container.appendChild(h2);
    container.appendChild(addButton);
    container.appendChild(table);

    // sætter container ind i app
    app.appendChild(container);
};

const createMovieTable = () => {
    // 1. lav table element
    const table = document.createElement("table");

    // 2. giv bootstrap-klasser
    table.classList.add("table", "table-dark", "table-striped", "table-hover");

    // 3. lav thead
    const thead = document.createElement("thead");

    // 4. lav header row
    const headerRow = document.createElement("tr");

    // 5. lav th for Title, Duration, Actions
    const titleHead = document.createElement("th");
    titleHead.textContent = "Title";

    const durationHead = document.createElement("th");
    durationHead.textContent = "Duration";

    const actionHead = document.createElement("th");
    actionHead.textContent = "Actions";
    actionHead.classList.add("action-column");

    headerRow.appendChild(titleHead);
    headerRow.appendChild(durationHead);
    headerRow.appendChild(actionHead);

    thead.appendChild(headerRow);

    // 6. lav tbody
    const tbody = document.createElement("tbody");

    // 7. append thead og tbody til table
    table.appendChild(thead);
    table.appendChild(tbody);

    // 8. returnér { table, tbody }
    return { table, tbody };
};

const createMovieRow = (movie, tbody, app) => { // tilføjet tbody og app som parametre
    const row = document.createElement("tr");

    // 2. lav td for title
    const titleCell = document.createElement("td");
    titleCell.textContent = movie.title;

    // 3. lav td for duration
    const durationCell = document.createElement("td");
    durationCell.textContent = movie.durationMinutes;



    // 4. lav td for category
    // 5. lav td for ageLimit

    // 6. lav actionsCell ved at kalde createActionButtons(movie)
    const actionsCell = createActionButtons(movie, row, app); // tilføjet row og app som argumenter


    // 7. append alle td'er til tr
    row.appendChild(titleCell);
    row.appendChild(durationCell);
    row.appendChild(actionsCell);

    // 8. returnér tr
    return row;
};

const createActionButtons = (movie, row, app) => { // tilføjet row og app som parametre
    const actionsCell = document.createElement("td");
    actionsCell.classList.add("action-column");

    const actionsWrapper = document.createElement("div");
    actionsWrapper.classList.add("actions-cell");

    const editButton = createEditButton(movie, app); // tilføjet app som argument
    const addScreeningButton = createAddScreeningButton(movie); // uændret
    const kebabMenu = createKebabMenu(movie, row); // tilføjet row som argument så delete kan fjerne rækken

    actionsWrapper.appendChild(editButton);
    actionsWrapper.appendChild(addScreeningButton);
    actionsWrapper.appendChild(kebabMenu);

    actionsCell.appendChild(actionsWrapper);

    return actionsCell;
};

const createAddMovieButton = (app) => { // tilføjet app som parameter
    const button = document.createElement("button");
    button.textContent = "Add Movie";
    button.classList.add("btn", "btn-outline-success", "me-2");
    button.addEventListener("click", () => openMovieModal(null, app)); // åbner modal i stedet for console.log
    return button;
};

const createEditButton = (movie, app) => { // tilføjet app som parameter
    const button = document.createElement("button");
    button.textContent = "Edit";
    button.classList.add("btn", "btn-outline-warning");
    button.addEventListener("click", () => openMovieModal(movie, app)); // åbner modal med film-data i stedet for console.log
    return button;
};

const createAddScreeningButton = (movie) => {
    const button = document.createElement("button");
    button.textContent = "Add Screening";
    button.classList.add("btn", "btn-outline-success");
    button.addEventListener("click", () => openScreeningModal(movie)); // åbner screening modal i stedet for console.log
    return button;
};

const createDeleteButton = (movie, row) => { // tilføjet row som parameter
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.classList.add("btn", "btn-outline-danger", "w-100");
    button.addEventListener("click", async () => {
        const confirmed = confirm(`Delete "${movie.title}"?`); // bekræftelsesdialog før sletning
        if (confirmed) {
            console.log(movie, "movie from dleete")
            await deleteMovie(movie.id); // kalder deleteMovie API
            row.remove(); // fjerner rækken fra tabellen uden at genindlæse siden
        }
    });
    return button;
};

const createKebabMenu = (movie, row) => { // tilføjet row som parameter
    const wrapper = document.createElement("div");
    wrapper.classList.add("kebab-wrapper");

    const kebabButton = document.createElement("button");
    kebabButton.textContent = "⋯";
    kebabButton.classList.add("btn", "btn-outline-secondary", "kebab-button");

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("kebab-menu", "d-none");

    const deleteButton = createDeleteButton(movie, row); // tilføjet row som argument
    dropdownMenu.appendChild(deleteButton);

    kebabButton.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("d-none");
    });

    document.addEventListener("click", () => {
        dropdownMenu.classList.add("d-none");
    });

    dropdownMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    wrapper.appendChild(kebabButton);
    wrapper.appendChild(dropdownMenu);

    return wrapper;
};

const openMovieModal = (movie = null, app) => {
    document.getElementById("movie-modal")?.remove();

    const isEdit = movie !== null;

    const overlay = document.createElement("div");
    overlay.id = "movie-modal";
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        display: flex; align-items: center; justify-content: center; z-index: 9999;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
        background: #1f2430; border: 1px solid #444; border-radius: 12px;
        padding: 2rem; min-width: 400px; color: white;
    `;

    modal.innerHTML = `
        <h4 class="mb-4">${isEdit ? "Edit Movie" : "Add Movie"}</h4>
        <div class="mb-3">
            <label class="form-label">Title</label>
            <input id="m-title" class="form-control bg-dark text-white border-secondary" value="${isEdit ? movie.title : ""}">
        </div>
        <div class="mb-3">
            <label class="form-label">Duration (minutes)</label>
            <input id="m-duration" type="number" class="form-control bg-dark text-white border-secondary" value="${isEdit ? movie.durationMinutes : ""}">
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea id="m-description" class="form-control bg-dark text-white border-secondary" rows="3">${isEdit ? movie.description : ""}</textarea>
        </div>
        <div class="mb-3">
            <label class="form-label">Category</label>
            <input id="m-category" class="form-control bg-dark text-white border-secondary" value="${isEdit ? movie.category : ""}">
        </div>
        <div class="mb-3">
            <label class="form-label">Age Limit</label>
            <input id="m-agelimit" type="number" class="form-control bg-dark text-white border-secondary" value="${isEdit ? movie.ageLimit : ""}">
        </div>
        <div class="mb-3">
            <label class="form-label">Poster Image</label>
            <input type="file" id="m-image" accept="image/*" class="form-control bg-dark text-white border-secondary">
            
        </div>
        <div class="d-flex gap-2 justify-content-end mt-4">
            <button id="m-cancel" class="btn btn-secondary">Cancel</button>
            <button id="m-save" class="btn btn-success">${isEdit ? "Save Changes" : "Create Movie"}</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // ✅ Track base64 string in this scope so the save handler can access it
    let base64String = isEdit ? movie.poster ?? null : null;

    // ✅ Wire up the image input after the modal is in the DOM
    document.getElementById("m-image").addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result; // updates the shared variable
            const preview = document.getElementById("m-preview");
            preview.src = base64String;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    });

    document.getElementById("m-cancel").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

    document.getElementById("m-save").addEventListener("click", async () => {
        const data = {
            title: document.getElementById("m-title").value,
            durationMinutes: parseInt(document.getElementById("m-duration").value),
            description: document.getElementById("m-description").value,
            category: document.getElementById("m-category").value,
            ageLimit: parseInt(document.getElementById("m-agelimit").value),
            image: base64String, 
        };

        if (isEdit) {
            await updateMovie(movie.id, data);
        } else {
            await createMovie(data);
        }

        overlay.remove();
        render(app);
    });
};

const openScreeningModal = (movie) => {
    document.getElementById("screening-modal")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "screening-modal";
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        display: flex; align-items: center; justify-content: center; z-index: 9999;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
        background: #1f2430; border: 1px solid #444; border-radius: 12px;
        padding: 2rem; min-width: 400px; color: white;
    `;

    modal.innerHTML = `
        <h4 class="mb-4">Add Screening — ${movie.title}</h4>
        <div class="mb-3">
            <label class="form-label">Hall ID</label>
            <input id="s-hall" type="number" class="form-control bg-dark text-white border-secondary" value="1">
        </div>
        <div class="mb-3">
            <label class="form-label">Start Time</label>
            <input id="s-start" type="datetime-local" class="form-control bg-dark text-white border-secondary">
        </div>
        <div class="mb-3">
            <label class="form-label">Base Price</label>
            <input id="s-price" type="number" step="0.01" class="form-control bg-dark text-white border-secondary" value="90">
        </div>
        <div class="mb-3 form-check">
            <input id="s-3d" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="s-3d">3D</label>
        </div>
        <div class="d-flex gap-2 justify-content-end mt-4">
            <button id="s-cancel" class="btn btn-secondary">Cancel</button>
            <button id="s-save" class="btn btn-success">Create Screening</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById("s-cancel").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

    document.getElementById("s-save").addEventListener("click", async () => {
        const data = {
            movieId: movie.id,
            hallId: parseInt(document.getElementById("s-hall").value),
            startTime: document.getElementById("s-start").value,
            basePrice: parseFloat(document.getElementById("s-price").value),
            is3D: document.getElementById("s-3d").checked,
        };

        await createScreening(data);
        overlay.remove();
    });
};