import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Header from "components/Headers/Header.js";
import Dashboard from "components/Dashboard/Dashboard";
import { getAllUserEvaluations } from "../services/userEvaluationService";
import { getAllUsers } from "../services/userService";
import { getAllEvaluations } from "../services/evaluationService";

// 🟡 Enregistrement de Chart.js avec toutes les échelles nécessaires
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,   // ✅ important pour éviter l’erreur de scale
  PointElement,
  Tooltip,
  Legend,
  Title
);

const ITEMS_PER_PAGE = 5;

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: "#5e72e4", font: { size: 14 } },
    },
    tooltip: {
      backgroundColor: "#f6f9fc",
      titleColor: "#32325d",
      bodyColor: "#525f7f",
    },
  },
  scales: {
    y: {
      ticks: { color: "#8898aa" },
      grid: { color: "#e9ecef" },
    },
    x: {
      ticks: { color: "#8898aa" },
      grid: { color: "transparent" },
    },
  },
};

const Index = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evals = await getAllUserEvaluations();
        const usrs = await getAllUsers();
        const qs = await getAllEvaluations();

        setEvaluations(evals);
        setUsers(usrs);
        setQuestions(qs);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterByMonth = (evals, monthStr) =>
    !monthStr ? evals : evals.filter((e) => e.dateEvaluation.startsWith(monthStr));

  const filteredEvaluations = filterByMonth(evaluations, selectedMonth);

  const sortedUsers = [...users].sort((a, b) => b.id - a.id);
  const sortedQuestions = [...questions].sort((a, b) => b.id - a.id);

  const paginatedUsers = sortedUsers.slice(
    (currentUserPage - 1) * ITEMS_PER_PAGE,
    currentUserPage * ITEMS_PER_PAGE
  );
  const paginatedQuestions = sortedQuestions.slice(
    (currentQuestionPage - 1) * ITEMS_PER_PAGE,
    currentQuestionPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Dashboard
          loading={loading}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          filteredEvaluations={filteredEvaluations}
          paginatedUsers={paginatedUsers}
          paginatedQuestions={paginatedQuestions}
          totalUserPages={Math.ceil(sortedUsers.length / ITEMS_PER_PAGE)}
          totalQuestionPages={Math.ceil(sortedQuestions.length / ITEMS_PER_PAGE)}
          currentUserPage={currentUserPage}
          setCurrentUserPage={setCurrentUserPage}
          currentQuestionPage={currentQuestionPage}
          setCurrentQuestionPage={setCurrentQuestionPage}
          chartOptions={chartOptions}
        />
      </Container>
    </>
  );
};

export default Index;
