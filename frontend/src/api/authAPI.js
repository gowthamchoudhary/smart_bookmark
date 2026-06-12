import apiClient from "./axios";

function getErrorMessage(error, fallback) {
  return error.response?.data?.detail || error.message || fallback;
}

export async function registerUser(
  email,
  username,
  password,
  profilePicture,
  bio,
) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  if (bio.trim()) {
    formData.append("bio", bio.trim());
  }
  if (profilePicture) {
    formData.append("profile_picture", profilePicture);
  }

  try {
    const { data } = await apiClient.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Registration failed"), {
      cause: error,
    });
  }
}

export async function loginUser(email, password) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  try {
    const { data } = await apiClient.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Login failed"), { cause: error });
  }
}

export async function getme() {
  try {
    const { data } = await apiClient.get("/auth/me");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unauthorized"), { cause: error });
  }
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    if (refreshToken) {
      await apiClient.post("/auth/logout", {
        refresh_token: refreshToken,
      });
    }
  } finally {
    logoutLocal();
  }
}

export function logoutLocal() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
