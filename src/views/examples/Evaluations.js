import React, { useEffect, useState } from "react";
import { getAllEvaluations, addEvaluation, updateEvaluation, deleteEvaluation } from "../../services/evaluationService";
import { Container } from "reactstrap";
import Header from "../../components/Headers/Header";
import "../../assets/css/gares.css";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericModal from "../../Generics/GenericModal";
import GenericTable from "../../Generics/GenericTable";
import GenericActionButtons from "../../Generics/GenericActionButtons";
import { FaBook } from "react-icons/fa"; // Icône pour les évaluations
import * as XLSX from "xlsx";

const Profile = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formValues, setFormValues] = useState({ nom: "", description: "", noteMax: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCriteres = evaluations.filter(evaluations =>
  Object.values(evaluations).some(
    val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  const fields = [
    { key: "nom", label: "Nom de l'Évaluation" },
    { key: "description", label: "Description" },
    { key: "noteMax", label: "noteMax" },
  ];

  useEffect(() => {
    refreshEvaluations();
  }, []);

  const refreshEvaluations = async () => {
    const data = await getAllEvaluations();
    setEvaluations(data);
  };

  const handleRowClick = (id) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  const handleAddEvaluation = async () => {
    if (!formValues.nom || !formValues.description || !formValues.noteMax) {
      return toast.error("Tous les champs sont requis.");
    }

    const response = await addEvaluation(formValues);
    if (response.error) return toast.error(response.error);

    refreshEvaluations();
    toast.success("Évaluation ajoutée avec succès !");
    closeModal();
  };

  const handleUpdateEvaluation = async () => {
    if (!formValues.nom || !formValues.description || !formValues.noteMax) {
      return toast.error("Tous les champs sont requis.");
    }

    const response = await updateEvaluation(selectedRow, formValues);
    if (response.error) return toast.error(response.error);

    refreshEvaluations();
    toast.success("Évaluation modifiée avec succès !");
    closeModal();
  };

  const handleDeleteEvaluation = async () => {
    if (!selectedRow) return toast.error("Sélectionnez une évaluation à supprimer.");
    const response = await deleteEvaluation(selectedRow);
    if (response.error) return toast.error(response.error);

    refreshEvaluations();
    toast.success("Évaluation supprimée !");
    setSelectedRow(null);
  };

  const handleViewEvaluation = () => {
    const evaluation = evaluations.find((e) => e.id === selectedRow);
    if (evaluation) {
      setFormValues({ nom: evaluation.nom, description: evaluation.description, noteMax: evaluation.noteMax });
      setModalMode("view");
      setModalOpen(true);
    }
  };

  const handleEditEvaluation = () => {
    const evaluation = evaluations.find((e) => e.id === selectedRow);
    if (evaluation) {
      setFormValues({ nom: evaluation.nom, description: evaluation.description, noteMax: evaluation.noteMax });
      setModalMode("edit");
      setModalOpen(true);
    }
  };

  const downloadPDF = () => {
    applyPlugin(jsPDF);
    const doc = new jsPDF();
    doc.autoTable({ html: "#evaluations-table" });
    doc.save("evaluations-list.pdf");
  };

  const exportToExcel = () => {
    const table = document.getElementById("evaluations-table");

    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluations");

    XLSX.writeFile(wb, "evaluations.xlsx");
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setFormValues({ nom: "", description: "", noteMax: "" });
  };

  const handleFieldChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header />
      <div className="capsule">
        <Container className="mt-5">
          <GenericActionButtons
            selectedRow={selectedRow}
            onAdd={() => {
              setModalMode("add");
              setModalOpen(true);
              setFormValues({ nom: "", description: "", noteMax: "" });
            }}
            onDownload={downloadPDF}
            onEdit={handleEditEvaluation}
            onDelete={handleDeleteEvaluation}
            onView={handleViewEvaluation}
            onExport={exportToExcel}
            onSearchChange={(value) => setSearchTerm(value)}
            title="Questionnaire d'Évaluation"
            icon={<FaBook />}
            description="La table ci-dessous contient la liste des évaluations"
          />

          <GenericTable
            data={filteredCriteres}
            columns={[
              { key: "nom", label: "Nom" },
              { key: "description", label: "Description" },
              { key: "noteMax", label: "noteMax" },
            ]}
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
            tableId="evaluations-table"
          />
        </Container>
      </div>

      <GenericModal
        isOpen={modalOpen}
        toggle={closeModal}
        mode={modalMode}
        fields={fields}
        values={formValues}
        onChange={handleFieldChange}
        onSave={modalMode === "edit" ? handleUpdateEvaluation : handleAddEvaluation}
      />

      <ToastContainer />
    </>
  );
};

export default Profile;
