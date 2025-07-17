
const API_URL = "http://localhost:8080/api/gares";  


export const getAllGares = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des gares");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erreur API:", error);
    return [];  
  }
};

export const addGare = async (gare) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gare), // Sérialiser les données en JSON
    });

    // Si la réponse n'est pas ok (statut 400 par exemple)
    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");

      // Vérifier si la réponse est en JSON
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json(); // Tente de lire la réponse JSON
        throw new Error(errorData.message || "Erreur lors de l'ajout de la gare");
      } else {
        // Si la réponse est en texte brut (par exemple, une erreur)
        const errorText = await response.text(); // Lire la réponse comme texte brut
        throw new Error(errorText || "Erreur inconnue lors de l'ajout de la gare");
      }
    }

    // Si la requête est réussie, retourner les données de la gare ajoutée
    const data = await response.json();
    return data;

  } catch (error) {
    // Ici on ne fait rien, pas de console.error ni de log
    return { error: error.message }; // Retourner l'erreur sous forme de message
  }
};

export const deleteGare = async (gareId) => {
  try {
    const response = await fetch(`${API_URL}/${gareId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");

      // Vérifier si la réponse est en JSON
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json(); // Tente de lire la réponse JSON
        throw new Error(errorData.message || "Erreur lors de la suppression de la gare");
      } else {
        // Si la réponse est en texte brut (par exemple, une erreur)
        const errorText = await response.text(); // Lire la réponse comme texte brut
        throw new Error(errorText || "Erreur inconnue lors de la suppression de la gare");
      }
    }

    // Si la requête est réussie, retourner les données de la gare supprimée
    return { success: true };

  } catch (error) {
    return { error: error.message }; // Retourner l'erreur sous forme de message
  }
};

export const getGareById = async (gareId) => {
  try {
    const response = await fetch(`${API_URL}/${gareId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");

      // Vérifier si la réponse est en JSON
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la récupération des détails de la gare");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur inconnue lors de la récupération des détails de la gare");
      }
    }

    const data = await response.json(); // Récupérer les détails de la gare
    return data;

  } catch (error) {
    return { error: error.message }; // Retourner l'erreur sous forme de message
  }
};

export const updateGare = async (gareId, gare) => {
  try {
    const response = await fetch(`${API_URL}/${gareId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gare),
    });

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification de la gare");
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur inconnue lors de la modification de la gare");
      }
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getGareCount = async () => {
  try {
    const response = await fetch(`${API_URL}/gares/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", 
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};

