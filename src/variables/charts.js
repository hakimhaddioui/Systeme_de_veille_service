// src/variables/charts.js
import moment from "moment";

// Ligne : 8 dernières évaluations
export function getLineChartData(evaluations) {
  const last8 = [...evaluations]
    .sort((a, b) => new Date(b.dateEvaluation) - new Date(a.dateEvaluation))
    .slice(0, 8);

  return {
    labels: last8.map(e => e.evalue?.matricule || "Inconnu"),
    datasets: [
      {
        label: "Note totale",
        data: last8.map(e => e.noteTotale || 0),
        borderColor: "#5e72e4",
        backgroundColor: "#5e72e4",
        tension: 0.3,
        fill: false,
      },
    ],
  };
}

// Barres : moyennes mensuelles
export function getBarChartData(evaluations) {
  const byMonth = {};
  evaluations.forEach(e => {
    const month = moment(e.dateEvaluation).format("MMMM YYYY");
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(e.noteTotale || 0);
  });

  return {
    labels: Object.keys(byMonth),
    datasets: [
      {
        label: "Moyenne mensuelle",
        data: Object.values(byMonth).map(notes =>
          (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2)
        ),
        backgroundColor: "#2dce89",
      },
    ],
  };
}
