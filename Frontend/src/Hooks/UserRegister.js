const API_URL = "http://localhost:8000";

export async function UserRegister({ username, password, email }) {
  if (!username || !password || !email) {
    throw new Error("Todos los campos son requeridos.");
  }

  try {
    const response = await fetch(`${API_URL}/Register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password, email }), // Incluye email
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al registrarse");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
