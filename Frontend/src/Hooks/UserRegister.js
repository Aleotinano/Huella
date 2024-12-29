const API_URL = "http://localhost:3000";

export async function UserRegister({ username, password }) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!username || !password) {
      throw new Error("El nombre de usuario y la contraseña son requeridos.");
    }
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    return data; // Devuelve los datos obtenidos del servidor
  } catch (error) {
    throw error; // Propaga el error para manejarlo en el componente
  }
}
