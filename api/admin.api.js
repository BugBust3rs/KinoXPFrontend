const BASE_URL = "http://localhost:8080/admin";

export async function login(username, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
    });
    return res.ok;
}

export async function checkSession() {
    try {
        const res = await fetch(`${BASE_URL}/session`, {
            credentials: "include"
        });
        if (!res.ok) return false;
        const data = await res.json();
        return data.active;
    } catch (e) {
        return false;
    }
}

export async function logout() {
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
    });
    window.location.hash = "/login";
}