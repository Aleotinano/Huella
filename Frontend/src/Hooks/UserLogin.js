const API_URL = "http://localhost:8000";

export async function UserLogin({ username, password }) {
  try {
    const response = await fetch(`${API_URL}/Login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!username) {
      throw new Error("El nombre de usuario es requerido");
    }

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
