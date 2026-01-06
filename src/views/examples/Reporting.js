import React, { useEffect, useState, useRef } from "react";
import {
  Container, Row, Col, Card, CardHeader, CardBody,
  Input, Button, Table, Spinner, FormGroup, Label
} from "reactstrap";
import { Line, Doughnut } from 'react-chartjs-2';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import moment from "moment";
import Select from "react-select";
import { getAllUserEvaluations } from "../../services/userEvaluationService";
import { getAllUsers } from "../../services/userService";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, ArcElement,
  Tooltip, Legend
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale,
  PointElement, LineElement, ArcElement,
  Tooltip, Legend
);

const Reporting = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [userFilter, setUserFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const lineRef = useRef(null);
  const doughnutRef = useRef(null);

  useEffect(() => {
    (async () => {
      const evals = await getAllUserEvaluations();
      const usrs = await getAllUsers();
      setEvaluations(evals);
      setUsers(usrs);
      setLoading(false);
    })();
  }, []);

  const filtered = evaluations.filter(e => {
    const d = e.dateEvaluation;
    const dateValid = (!startDate || d >= startDate) && (!endDate || d <= endDate);
    const roleValid = !roleFilter || e.evalue?.role === roleFilter;
    const userValid = !userFilter || e.evalue?.matricule === userFilter.value;
    const scoreValid = (!minScore || e.noteTotale >= +minScore) && (!maxScore || e.noteTotale <= +maxScore);
    return dateValid && roleValid && userValid && scoreValid;
  });

  const avgScore = filtered.length ? (filtered.reduce((s,e)=>s+e.noteTotale,0)/filtered.length).toFixed(2) : 0;
  const best = filtered.slice().sort((a,b)=>b.noteTotale - a.noteTotale)[0]?.evalue?.nom || "-";
  const worst = filtered.slice().sort((a,b)=>a.noteTotale - b.noteTotale)[0]?.evalue?.nom || "-";

  const dates = filtered.map(e => moment(e.dateEvaluation).format("MMM DD"));
  const scores = filtered.map(e => e.noteTotale);
  const lineData = {
    labels: dates,
    datasets: [{
      label: "Score",
      data: scores,
      borderColor: "#5e72e4",
      backgroundColor: "rgba(94,114,228,0.4)",
      tension: 0.3,
      fill: true,
    }],
  };

  const roles = [...new Set(filtered.map(e => e.evalue?.role || "Non défini"))];
  const doughnutData = {
    labels: roles,
    datasets: [{
      label: "Nb évaluations",
      data: roles.map(role => filtered.filter(e => (e.evalue?.role || "Non défini") === role).length),
      backgroundColor: ["#5e72e4", "#11cdef", "#2dce89", "#fb6340", "#f5365c"],
    }],
  };

// Reporting.js

const exportGlobalPDF = () => {
  const doc = new jsPDF("landscape");

  // PAGE 1 - COUVERTURE
  const logo = new Image();
  logo.src = require("../../assets/img/brand/Logo-oncf.png");
  doc.addImage(logo, "PNG", 120, 20, 50, 55);
  doc.setFontSize(22);
  doc.text("Rapport d’Évaluation", 115, 90);
  doc.setFontSize(16);
  doc.text(`Application SVS - Système de veille service`, 90, 100);
  doc.setFontSize(12);
  doc.text(`Généré le : ${moment().format("YYYY-MM-DD HH:mm")}`, 120, 110);
  doc.addPage();

  // PAGE 2 - Résumé Exécutif (tableau stylisé)
  doc.setFontSize(16);
  doc.setTextColor(44, 62, 80);
  doc.text("Résumé Exécutif", 14, 30);
  doc.setFontSize(12);
  autoTable(doc, {
    startY: 40,
    head: [["Élément", "Valeur"]],
    body: [
      ["Période analysée", `${startDate || '...'} → ${endDate || '...'}`],
      ["Filtres appliqués", `rôle = ${roleFilter || 'tous'} | utilisateur = ${userFilter?.label || 'tous'}`],
      ["Moyenne des scores", avgScore],
      ["Utilisateur le plus performant", best],
      ["Score le plus bas", worst],
      ["Total d’évaluations", filtered.length],
    ],
    styles: { halign: "center", fontSize: 11 },
    headStyles: { fillColor: [94, 114, 228], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    tableLineColor: 200,
    tableLineWidth: 0.2
  });

  doc.addPage();

  // PAGE 3 - Graphiques avec légendes
  doc.setTextColor(44, 62, 80);
  doc.setFontSize(16);
  doc.text("Visualisation des performances", 14, 25);

  const canvasLine = lineRef.current.firstChild;
  const imgLine = canvasLine.toDataURL("image/png", 2.0);
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text("Évolution des scores", 53, 35);
  doc.addImage(imgLine, "PNG", 14, 40, 130, 110);
  doc.setFontSize(10);
  doc.text("Les pics indiquent des évaluations intensives, les creux un manque d’activité.", 20, 155);

  const canvasDoughnut = doughnutRef.current.firstChild;
  const imgDoughnut = canvasDoughnut.toDataURL("image/png", 1.0);
  doc.setFontSize(14);
  doc.text("Répartition des rôles", 189, 35);
  doc.addImage(imgDoughnut, "PNG", 150, 40, 130, 100);
  doc.setFontSize(10);
  const doughnutLegendY = 155;
  doc.text("Ce graphique montre la proportion d’évaluations par rôle.", 170, doughnutLegendY);

  // Proportions des rôles
  let y = doughnutLegendY + 10;
  const countsByRole = {};
  filtered.forEach(e => {
    const role = e.evalue?.role || "Non défini";
    countsByRole[role] = (countsByRole[role] || 0) + 1;
  });
  Object.entries(countsByRole).forEach(([role, count]) => {
    doc.text(`${role} : ${count} évaluations`, 195, y);
    y += 6;
  });

  // PAGE 4 - Tableau principal
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80);
  doc.text("Détail des évaluations", 14, 25);
  autoTable(doc, {
    startY: 30,
    head: [["Utilisateur", "Rôle", "Date", "Score"]],
    body: filtered.map(e => [
      `${e.evalue?.nom} ${e.evalue?.prenom}`,
      e.evalue?.role || "-",
      moment(e.dateEvaluation).format("YYYY-MM-DD"),
      e.noteTotale
    ]),
  });

  // Mot de conclusion (sous tableau)
  const afterTableY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Ce rapport a été généré automatiquement par le système de reporting SVS.", 14, afterTableY);
  doc.text("Signature : ___________________", 220, afterTableY + 20);

    // Ajouter un en-tête à partir de la 2ème page
  const totalPagesBefore = doc.getNumberOfPages();
  for (let i = 2; i <= totalPagesBefore; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text("Rapport d’évaluation - SVS - ONCF", 120, 10);
  }

  // Citation en bas de chaque page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("« L’avenir se lit sur nos lignes »", 120, 200);
  }

  doc.save("Reporting_global.pdf");
};


  if (loading) return <Spinner className="my-5" />;

  return (
    <Container fluid className="mt-4">
      <h2>Reporting avancé</h2>

      {/* Filtres */}
      <Card className="mb-4"><CardBody>
        <Row>
          {[{ lbl: "Début", t: "date", v: startDate, s: setStartDate },
            { lbl: "Fin", t: "date", v: endDate, s: setEndDate },
            { lbl: "Min Score", t: "number", v: minScore, s: setMinScore },
            { lbl: "Max Score", t: "number", v: maxScore, s: setMaxScore },
          ].map((f, i) => (
            <Col md="2" key={i}><FormGroup>
              <Label>{f.lbl}</Label>
              <Input type={f.t} value={f.v} onChange={e => f.s(e.target.value)} />
            </FormGroup></Col>
          ))}
          <Col md="3"><FormGroup>
            <Label>Utilisateur</Label>
            <Select
              options={users.map(u => ({ value: u.matricule, label: `${u.nom} ${u.prenom}` }))}
              isClearable value={userFilter}
              onChange={setUserFilter}
              placeholder="taper matricule ou nom..."
            />
          </FormGroup></Col>
          <Col md="2"><FormGroup>
            <Label>Rôle</Label>
            <Input type="text" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} />
          </FormGroup></Col>
        </Row>
        <Row><Col className="mt-3">
          <Button color="info" onClick={exportGlobalPDF}>📄 Export global PDF</Button>{' '}
          <Button color="success" onClick={() => {
            const ws = XLSX.utils.json_to_sheet(filtered.map(e => ({
              Utilisateur: `${e.evalue?.nom} ${e.evalue?.prenom}`,
              Rôle: e.evalue?.role,
              Date: e.dateEvaluation,
              Score: e.noteTotale
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Reporting");
            XLSX.writeFile(wb, "Reporting.xlsx");
          }}>📥 Export Excel</Button>
        </Col></Row>
      </CardBody></Card>

      {/* KPIs */}
      <Row className="mb-4">
        {[{ l: "🔢 Moyenne", v: avgScore },
          { l: "🏆 Meilleur", v: best },
          { l: "❌ Moins bon", v: worst },
          { l: "📊 Nb évals", v: filtered.length }
        ].map((k, i) => (
          <Col md="3" key={i}>
            <Card body className="text-center bg-light shadow-sm">
              <h5>{k.l}</h5><h3>{k.v}</h3>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Graphiques */}
      <Row className="mb-4">
        <Col md="6">
          <Card><CardHeader>Évolution des scores</CardHeader><CardBody>
            <div ref={lineRef}><Line data={lineData} /></div>
          </CardBody></Card>
        </Col>
        <Col md="6">
          <Card><CardHeader>Répartition des rôles</CardHeader><CardBody>
            <div ref={doughnutRef}><Doughnut data={doughnutData} /></div>
          </CardBody></Card>
        </Col>
      </Row>

      {/* Tableau */}
      <Card><CardHeader>Détails des évaluations</CardHeader><CardBody>
        <Table responsive bordered>
          <thead><tr>
            <th>Utilisateur</th><th>Rôle</th><th>Date</th><th>Score</th>
          </tr></thead>
          <tbody>
            {filtered.map((e, i) =>
              <tr key={i}>
                <td>{e.evalue?.nom} {e.evalue?.prenom}</td>
                <td>{e.evalue?.role}</td>
                <td>{moment(e.dateEvaluation).format("YYYY-MM-DD")}</td>
                <td>{e.noteTotale}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardBody></Card>
    </Container>
  );
};

export default Reporting;
