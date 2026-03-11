import { login } from "../../api/admin.api.js";

export function createAdminLogin(app) {
    render(app);
}

const render = (app) => {
    const div = document.createElement("div");
    div.classList.add("admin-login-container");

    const h2 = document.createElement("h2");
    h2.textContent = "Admin Login";
    h2.classList.add("text-light");

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Username";
    usernameInput.classList.add("form-control", "mb-2");

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.classList.add("form-control", "mb-2");

    const error = document.createElement("p");
    error.textContent = "Wrong username or password";
    error.classList.add("text-danger");
    error.style.display = "none";

    const button = document.createElement("button");
    button.textContent = "Login";
    button.classList.add("btn", "btn-secondary");
    button.onclick = async () => {
        const success = await login(usernameInput.value, passwordInput.value);
        console.log(success, "Login attempt");
        if (success) {
            window.location.hash = "/admin/menu";
        } else {
            error.style.display = "block";
        }
    };

    passwordInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const success = await login(usernameInput.value, passwordInput.value);
            if (success) {
                window.location.hash = "/admin/menu";
            } else {
                error.style.display = "block";
            }
        }
    });

    div.appendChild(h2);
    div.appendChild(usernameInput);
    div.appendChild(passwordInput);
    div.appendChild(error);
    div.appendChild(button);
    app.appendChild(div);
} 