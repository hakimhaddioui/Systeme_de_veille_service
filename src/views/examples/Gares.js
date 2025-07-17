import React, { useEffect, useState } from "react"; 
import { getAllGares, addGare, updateGare, deleteGare } from "../../services/stationService"; 
import { Container } from "reactstrap"; 
import Header from "../../components/Headers/Header"; 
import "../../assets/css/gares.css"; 
import { jsPDF } from "jspdf"; 
import { applyPlugin } from "jspdf-autotable"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import GenericModal from "../../Generics/GenericModal"; 
import GenericTable from "../../Generics/GenericTable"; 
import GenericActionButtons from "../../Generics/GenericActionButtons"; // chemin à ajuster 
import * as XLSX from "xlsx";
import {  FaTrain } from "react-icons/fa";


const Maps = () => {
  const [gares, setGares] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formValues, setFormValues] = useState({ nom: "", emplacement: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filtereGares = gares.filter(gares =>
  Object.values(gares).some(
    val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  const fields = [
    { key: "nom", label: "Nom de la Gare" },
    { key: "emplacement", label: "Emplacement" },
  ];

  useEffect(() => {
    refreshGares();
  }, []);

  const refreshGares = async () => {
    const data = await getAllGares();
    setGares(data);
  };

  const handleRowClick = (id) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  const handleAddGare = async () => {
    if (!formValues.nom || !formValues.emplacement) {
      return toast.error("Tous les champs sont requis.");
    }

    const response = await addGare(formValues);
    if (response.error) return toast.error(response.error);

    refreshGares();
    toast.success("Gare ajoutée avec succès !");
    closeModal();
  };

  const handleUpdateGare = async () => {
    if (!formValues.nom || !formValues.emplacement) {
      return toast.error("Tous les champs sont requis.");
    }

    const response = await updateGare(selectedRow, formValues);
    if (response.error) return toast.error(response.error);

    refreshGares();
    toast.success("Gare modifiée avec succès !");
    closeModal();
  };

  const handleDeleteGare = async () => {
    if (!selectedRow) return toast.error("Sélectionnez une gare à supprimer.");
    const response = await deleteGare(selectedRow);
    if (response.error) return toast.error(response.error);

    refreshGares();
    toast.success("Gare supprimée !");
    setSelectedRow(null);
  };

  const handleViewGare = () => {
    const gare = gares.find((g) => g.id === selectedRow);
    if (gare) {
      setFormValues({ nom: gare.nom, emplacement: gare.emplacement });
      setModalMode("view");
      setModalOpen(true);
    }
  };

  const handleEditGare = () => {
    const gare = gares.find((g) => g.id === selectedRow);
    if (gare) {
      setFormValues({ nom: gare.nom, emplacement: gare.emplacement });
      setModalMode("edit");
      setModalOpen(true);
    }
  };

  const downloadPDF = () => {
    applyPlugin(jsPDF);
    const doc = new jsPDF();
    doc.autoTable({ html: "#gares-table" });
    doc.save("gares-list.pdf");
  };

  const exportToExcel = () => {
    const table = document.getElementById("gares-table"); // Récupère le tableau HTML

    const ws = XLSX.utils.table_to_sheet(table); // Convertit le tableau HTML en un sheet

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gares"); // Feuille nommée "Gares"

    // Sauvegarder sous "gares.xlsx"
    XLSX.writeFile(wb, "gares.xlsx");
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setFormValues({ nom: "", emplacement: "" });
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
              setFormValues({ nom: "", emplacement: "" });
            }}
            onDownload={downloadPDF}
            onEdit={handleEditGare}
            onDelete={handleDeleteGare}
            onView={handleViewGare}
            onExport={exportToExcel}
            onSearchChange={(value) => setSearchTerm(value)}
            title="Gares" // Exemple de titre
            icon={<FaTrain />} // Icône "FaBuilding" pour les gares
            description = "La table ci-desous contient la liste des gares de l' ONCF"
          />

          <GenericTable
            data={filtereGares}
            columns={[
              { key: "nom", label: "Nom" },
              { key: "emplacement", label: "Emplacement" },
            ]}
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
            tableId="gares-table"
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
        onSave={modalMode === "edit" ? handleUpdateGare : handleAddGare}
      />

      <ToastContainer />
    </>
  );
};

export default Maps;
