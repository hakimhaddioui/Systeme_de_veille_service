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

  const exportGlobalPDF = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Rapport Reporting global", 14, 10);
    doc.text(`Période : ${startDate || '...'} → ${endDate || '...'}`, 14, 18);
    doc.text(`Filtres: rôle = ${roleFilter || 'tous'} | utilisateur = ${userFilter?.label || 'tous'}`, 14, 26);

    autoTable(doc, {
      startY: 32,
      head: [["Utilisateur", "Rôle", "Date", "Score"]],
      body: filtered.map(e => [
        `${e.evalue?.nom} ${e.evalue?.prenom}`,
        e.evalue?.role || "-",
        moment(e.dateEvaluation).format("YYYY-MM-DD"),
        e.noteTotale
      ]),
    });

    doc.addPage();
    const canvasLine = lineRef.current.firstChild;
    const imgLine = canvasLine.toDataURL("image/png", 1.0);
    doc.text("Evolution des scores", 14, 15);
    doc.addImage(imgLine, "PNG", 14, 20, 130, 80);

    const canvasDoughnut = doughnutRef.current.firstChild;
    const imgDoughnut = canvasDoughnut.toDataURL("image/png", 1.0);
    doc.text("Répartition des rôles", 150, 15);
    doc.addImage(imgDoughnut, "PNG", 150, 20, 130, 80);

    doc.save("Reporting_global.pdf");
  };

  if (loading) return <Spinner className="my-5" />;

  return (
    <Container fluid className="mt-4">
      <h2>📊 Reporting avancé</h2>

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
