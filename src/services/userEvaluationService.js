const API_BASE_URL = 'http://localhost:8080/api/userevaluations';

// 🔍 1. Récupérer toutes les évaluations
export const getAllUserEvaluations = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Erreur lors de la récupération des évaluations');
  return response.json();
};

// ➕ 2. Ajouter une nouvelle UserEvaluation
export const addUserEvaluation = async (evaluationData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(evaluationData),
  });
  if (!response.ok) throw new Error('Erreur lors de l’ajout de l’évaluation');
  return response.json();
};

// ❌ 3. Supprimer une évaluation
export const deleteUserEvaluation = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression de l’évaluation');
};

// ✏️ 4. Modifier une évaluation
export const updateUserEvaluation = async (id, evaluationData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(evaluationData),
  });
  if (!response.ok) throw new Error("Erreur lors de la modification de l’évaluation");
  return response.json();
};

// 🔢 5. Compter le nombre total d'évaluations
export const countUserEvaluations = async () => {
  const response = await fetch(`${API_BASE_URL}/count`);
  if (!response.ok) throw new Error("Erreur lors du comptage des évaluations");
  return response.json(); // Cela renverra un nombre (ex: 12)
};
