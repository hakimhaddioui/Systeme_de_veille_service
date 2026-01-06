
const API_URL_AUTH = "http://localhost:8080/api";

export const login = async (matricule, motDePasse) => {
  try {
    const response = await fetch(`${API_URL_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matricule, motDePasse }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erreur API:", error);
    throw error; 
  }
};
