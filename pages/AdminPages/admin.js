import { createAdminLogin } from "./AdminLogin.js";

export async function createAdmin(app) {
  // const isLoggedIn = await checkSession();
  createAdminLogin(app);
    // if (true) {
    //     window.location.hash = "/admin/menu"; // ← router will handle the rest
    // } else {
    //     createAdminLogin(app);
    // }
}