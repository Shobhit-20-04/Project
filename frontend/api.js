export const API_URL = "http://127.0.0.1:8000/api";

export const loginUser = async (username, password) => {
  try {
    let response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    console.error("Login error", error);
  }
};

export const fetchCallHistory = async () => {
  try {
    let response = await fetch(`${API_URL}/callhistory/`);
    return response.json();
  } catch (error) {
    console.error("Fetch Call History error", error);
  }
};
