import React, { useEffect, useState } from "react";
import { getAllUsers, addUser, getAllRoles, deleteUser, getUserById, updateUser } from "../../services/userService";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { Container } from "reactstrap";
import Header from "../../components/Headers/Header";
import "../../assets/css/gares.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericModal from "../../Generics/GenericModal";
import GenericTable from "../../Generics/GenericTable";
import GenericActionButtons from "../../Generics/GenericActionButtons";
import { FaUser } from "react-icons/fa";
import * as XLSX from "xlsx";
import "../../assets/css/GenericTable.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");

  const [formValues, setFormValues] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    profil: "",
    role: "",
    lieuTravail: "",
  });

  useEffect(() => {
    refreshUsers();
    refreshRoles();
  }, []);

  const refreshUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const refreshRoles = async () => {
    const data = await getAllRoles();
    setRoles(data);
  };

  const handleRowClick = (id) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setFormValues({
      matricule: "",
      nom: "",
      prenom: "",
      email: "",
      profil: "",
      role: "",
      lieuTravail: "",
    });
  };

  const handleFieldChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddUser = async () => {
    if (!formValues.matricule || !formValues.nom || !formValues.prenom || !formValues.email || !formValues.role || !formValues.lieuTravail || !formValues.profil) {
      return toast.error("Tous les champs sont requis.");
    }

    try {
      const addedUser = await addUser({ ...formValues });
      if (addedUser.error) {
        toast.error(`Erreur : ${addedUser.error}`);
      } else {
        refreshUsers();
        toast.success("Utilisateur ajouté avec succès !");
        closeModal();
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'utilisateur !");
    }
  };

  const handleViewUser = async () => {
    if (selectedRow === null) return;
    const user = await getUserById(selectedRow);
    if (user.error) {
      toast.error(`Erreur : ${user.error}`);
    } else {
      setFormValues({ ...user });
      setModalOpen(true);
      setModalMode("view");
    }
  };

  const handleDeleteUser = async () => {
    if (selectedRow === null) return;
    const response = await deleteUser(selectedRow);
    if (response.error) {
      toast.error(`Erreur : ${response.error}`);
    } else {
      refreshUsers();
      toast.success("Utilisateur supprimé avec succès !");
      setSelectedRow(null);
    }
  };

  const handleUpdateUser = async () => {
    const response = await updateUser(selectedRow, { ...formValues });
    if (response.error) {
      toast.error(`Erreur : ${response.error}`);
    } else {
      refreshUsers();
      toast.success("Utilisateur mis à jour avec succès !");
      closeModal();
      setSelectedRow(null);
    }
  };

  const downloadPDF = () => {
    applyPlugin(jsPDF);
    const doc = new jsPDF();
    doc.autoTable({ html: "#users-table" });
    doc.save("utilisateurs.pdf");
  };

  const exportToExcel = () => {
    const table = document.getElementById("users-table");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Utilisateurs");
    XLSX.writeFile(wb, "utilisateurs.xlsx");
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(
      val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <div className="capsule">
        <Container className="mt-5">
          <GenericActionButtons
            selectedRow={selectedRow}
            onAdd={() => {
              setFormValues({
                matricule: "",
                nom: "",
                prenom: "",
                email: "",
                profil: "",
                role: "",
                lieuTravail: "",
              });
              setModalMode("add");
              setModalOpen(true);
            }}
            onEdit={() => {
              if (selectedRow === null) {
                toast.error("Aucun utilisateur sélectionné.");
                return;
              }
              const userToEdit = users.find(user => user.id === selectedRow);
              if (!userToEdit) {
                toast.error("Utilisateur non trouvé.");
                return;
              }
              setFormValues({ ...userToEdit });
              setModalMode("edit");
              setModalOpen(true);
            }}
            onView={handleViewUser}
            onDelete={handleDeleteUser}
            onExport={exportToExcel}
            onDownload={downloadPDF}
            onSearchChange={(value) => setSearchTerm(value)} // 🔍 ici
            title="Users"
            icon={<FaUser />}
            description="La table ci-dessous contient la liste des utilisateurs"
          />

          <GenericTable
            data={filteredUsers} // 🔍 données filtrées
            columns={[
              { key: "matricule", label: "Matricule" },
              { key: "nom", label: "Nom" },
              { key: "prenom", label: "Prénom" },
              { key: "email", label: "Email" },
              { key: "profil", label: "Profil" },
              { key: "role", label: "Rôle" },
              { key: "lieuTravail", label: "Lieu de travail" },
            ]}
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
            tableId="users-table"
          />
        </Container>
      </div>

      <GenericModal
        isOpen={modalOpen}
        toggle={closeModal}
        mode={modalMode}
        fields={[
          { key: "matricule", label: "Matricule" },
          { key: "nom", label: "Nom" },
          { key: "prenom", label: "Prénom" },
          { key: "email", label: "Email" },
          { key: "profil", label: "Profil" },
          { key: "role", label: "Rôle" },
          { key: "lieuTravail", label: "Lieu de travail" },
        ]}
        values={formValues}
        onChange={handleFieldChange}
        onSave={modalMode === "edit" ? handleUpdateUser : handleAddUser}
        roleOptions={roles}
        componentType="user"
      />

      <ToastContainer />
    </>
  );
};

export default Users;
