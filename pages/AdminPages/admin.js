import { checkSession } from "../../api/admin.api.js";
import { createAdminLogin } from "./AdminLogin.js";
let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

export function getAuthenticated() {
  return isAuthenticated;
}

export function setAuthenticated(value) {
  isAuthenticated = value;
  sessionStorage.setItem("isAuthenticated", value);
}

export async function createAdmin(app) {
    console.log("isAuthenticated:", isAuthenticated);
  console.log("sessionStorage:", sessionStorage.getItem("isAuthenticated"));
  if (!isAuthenticated) {
    const isLoggedIn = await checkSession();
    if (isLoggedIn) {
      isAuthenticated = true;
      window.location.hash = "/admin/menu";
      return;
    }
    createAdminLogin(app);
  } else {
    window.location.hash = "/admin/menu";
  }
  
}
