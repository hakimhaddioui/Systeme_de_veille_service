// src/services/evaluationService.js

const API_URL = "http://localhost:8080/api/evaluations";  // Assurez-vous que l'URL est correcte

// Récupérer toutes les évaluations
export const getAllEvaluations = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des évaluations");
        }

        const data = await response.json();
        return data;  // Retourner les évaluations
    } catch (error) {
        console.error("Erreur API:", error);
        return [];  // Retourner un tableau vide en cas d'erreur
    }
};

// Ajouter une évaluation
export const addEvaluation = async (evaluation) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(evaluation), // Sérialiser les données en JSON
        });

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'ajout de l'évaluation");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Erreur inconnue lors de l'ajout de l'évaluation");
            }
        }

        const data = await response.json();
        return data;  // Retourner l'évaluation ajoutée
    } catch (error) {
        return { error: error.message };  // Retourner l'erreur sous forme de message
    }
};

// Supprimer une évaluation
export const deleteEvaluation = async (evaluationId) => {
    try {
        const response = await fetch(`${API_URL}/${evaluationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la suppression de l'évaluation");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Erreur inconnue lors de la suppression de l'évaluation");
            }
        }

        return { success: true };  // Retourner la réussite de la suppression
    } catch (error) {
        return { error: error.message };  // Retourner l'erreur sous forme de message
    }
};

// Récupérer une évaluation par ID
export const getEvaluationById = async (evaluationId) => {
    try {
        const response = await fetch(`${API_URL}/${evaluationId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la récupération des détails de l'évaluation");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Erreur inconnue lors de la récupération des détails de l'évaluation");
            }
        }

        const data = await response.json();  // Récupérer les détails de l'évaluation
        return data;
    } catch (error) {
        return { error: error.message };  // Retourner l'erreur sous forme de message
    }
};

// Mettre à jour une évaluation
export const updateEvaluation = async (evaluationId, evaluation) => {
    try {
        const response = await fetch(`${API_URL}/${evaluationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(evaluation),
        });

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type");

            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la modification de l'évaluation");
            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Erreur inconnue lors de la modification de l'évaluation");
            }
        }

        return await response.json();  // Retourner les données modifiées
    } catch (error) {
        return { error: error.message };  // Retourner l'erreur sous forme de message
    }
};

// Récupérer le nombre d'évaluations
export const getEvaluationCount = async () => {
    try {
        const response = await fetch(`${API_URL}/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du nombre d'évaluations");
        }

        const data = await response.json();
        return data;  // Retourner le nombre d'évaluations
    } catch (error) {
        console.error("Erreur API:", error);
        return null;  // Retourner null en cas d'erreur
    }
};
