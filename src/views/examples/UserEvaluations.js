import React, { useEffect, useState } from "react";
import {
  getAllUserEvaluations,
  addUserEvaluation,
  deleteUserEvaluation,
  updateUserEvaluation,
} from "../../services/userEvaluationService";
import { getAllUsers } from "../../services/userService";
import { getAllEvaluations } from "../../services/evaluationService";
import { Container } from "reactstrap";
import Header from "../../components/Headers/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericTable from "../../Generics/GenericTable";
import GenericModal from "../../Generics/GenericModal";
import GenericActionButtons from "../../Generics/GenericActionButtons";
import { FaUserCheck } from "react-icons/fa";

const UserEvaluationsPage = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [formValues, setFormValues] = useState({
    evaluateurId: "",
    evalueId: "",
    remarques: "",
  });

  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionNotes, setQuestionNotes] = useState([]);
  const [questionNoteModalOpen, setQuestionNoteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedNote, setSelectedNote] = useState("");

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEvaluationDetails, setSelectedEvaluationDetails] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredevaluations = evaluations.filter(evaluations =>
  Object.values(evaluations).some(
    val => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  const fields = [
    {
      key: "evaluateurId",
      label: "Évaluateur",
      type: "select",
      options: users.map((u) => ({ label: `${u.matricule} - ${u.nom}`, value: u.id })),
    },
    {
      key: "evalueId",
      label: "Évalué",
      type: "select",
      options: users.map((u) => ({ label: `${u.matricule} - ${u.nom}`, value: u.id })),
    },
    { key: "remarques", label: "Remarques" },
    {
      key: "ajouterQuestions",
      label: "Questions",
      type: "custom",
      render: () => (
        <button className="btn btn-outline-primary" onClick={() => setQuestionNoteModalOpen(true)}>
          Gérer les questions ({questionNotes.length})
        </button>
      ),
    },
  ];

  useEffect(() => {
    loadEvaluations();
    loadUsers();
    loadQuestions();
  }, []);

  const loadEvaluations = async () => {
    try {
      const data = await getAllUserEvaluations();
      const transformed = data.map((evalItem) => ({
        ...evalItem,
        id: evalItem.id,
        evaluateurNom: `${evalItem.evaluateur?.prenom || ""} ${evalItem.evaluateur?.nom || ""}`,
        evalueNom: `${evalItem.evalue?.prenom || ""} ${evalItem.evalue?.nom || ""}`,
      }));
      setEvaluations(transformed);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Erreur chargement utilisateurs");
    }
  };

  const loadQuestions = async () => {
    try {
      const data = await getAllEvaluations();
      setQuestions(data);
    } catch {
      toast.error("Erreur chargement questions");
    }
  };

  const handleSave = async () => {
    const { evaluateurId, evalueId, remarques } = formValues;

    if (!evaluateurId || !evalueId || questionNotes.length === 0) {
      return toast.error("Tous les champs sont requis.");
    }

    const payload = {
      evaluateurId: parseInt(evaluateurId),
      evalueId: parseInt(evalueId),
      questionIds: questionNotes.map((qn) => qn.questionId),
      notes: questionNotes.map((qn) => qn.note),
      remarques,
    };

    try {
      if (modalMode === "add") {
        await addUserEvaluation(payload);
        toast.success("Évaluation ajoutée !");
      } else {
        await updateUserEvaluation(selectedRow, payload);
        toast.success("Évaluation modifiée !");
      }
      loadEvaluations();
      closeModal();
    } catch {
      toast.error("Erreur lors de l’enregistrement.");
    }
  };

  const handleDelete = async () => {
    if (selectedRow === null) return toast.error("Aucune évaluation sélectionnée.");
    try {
      await deleteUserEvaluation(selectedRow);
      toast.success("Évaluation supprimée !");
      loadEvaluations();
      setSelectedRow(null);
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const handleView = () => {
    if (selectedRow === null) return toast.error("Aucune évaluation sélectionnée.");
    const selected = evaluations.find((e) => e.id === selectedRow);
    if (!selected) return toast.error("Évaluation introuvable.");
    setSelectedEvaluationDetails(selected);
    setDetailsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedRow === null) return toast.error("Aucune évaluation sélectionnée.");
    const evalData = evaluations.find((e) => e.id === selectedRow);
    if (!evalData) return toast.error("Évaluation introuvable.");

    setModalMode("edit");
    setFormValues({
      evaluateurId: evalData.evaluateur?.id || "",
      evalueId: evalData.evalue?.id || "",
      remarques: evalData.remarques || "",
    });

    const notes = evalData.reponses?.map((rep) => ({
      questionId: rep.question?.id,
      note: rep.note,
    })) || [];

    setQuestionNotes(notes);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setFormValues({ evaluateurId: "", evalueId: "", remarques: "" });
    setQuestionNotes([]);
  };

  const handleRowClick = (id) => setSelectedRow((prev) => (prev === id ? null : id));
  const handleFieldChange = (key, value) => setFormValues((prev) => ({ ...prev, [key]: value }));

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
              setFormValues({ evaluateurId: "", evalueId: "", remarques: "" });
              setQuestionNotes([]);
            }}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            onSearchChange={(value) => setSearchTerm(value)}  // 🔍 Ajouté ici

            title="Évaluations des utilisateurs"
            icon={<FaUserCheck />}
            description="Voici la liste des évaluations réalisées entre utilisateurs."
            hideExport
          />

          <GenericTable
            data={filteredevaluations}
            columns={[
              { key: "evaluateurNom", label: "Évaluateur" },
              { key: "evalueNom", label: "Évalué" },
              { key: "noteTotale", label: "Note Totale" },
              { key: "remarques", label: "Remarques" },
              { key: "dateEvaluation", label: "Date" },
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
        onSave={handleSave}
      />

      {questionNoteModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter des questions</h5>
                <button type="button" className="btn-close" onClick={() => setQuestionNoteModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-control mb-2"
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                >
                  <option value="">Sélectionner une question</option>
                  {questions.map((q) => (
                    <option key={q.id} value={q.id}>{q.nom}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Note"
                  className="form-control mb-2"
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!selectedQuestion || selectedNote === "") return;
                    setQuestionNotes((prev) => [...prev, {
                      questionId: parseInt(selectedQuestion),
                      note: parseInt(selectedNote),
                    }]);
                    setSelectedQuestion("");
                    setSelectedNote("");
                  }}
                >
                  Ajouter
                </button>

                <ul className="mt-3">
                  {questionNotes.map((qn, index) => {
                    const question = questions.find((q) => q.id === qn.questionId);
                    return (
                      <li key={index}>
                        {question?.nom} - Note: {qn.note}
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => setQuestionNotes((prev) => prev.filter((_, i) => i !== index))}
                        >
                          Supprimer
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setQuestionNoteModalOpen(false)}>
                  Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEvaluationDetails && (
        <div className={`modal fade ${detailsModalOpen ? "show d-block" : ""}`} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails de l'évaluation</h5>
                <button type="button" className="btn-close" onClick={() => setDetailsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Évaluateur :</strong> {selectedEvaluationDetails?.evaluateur?.matricule} - {selectedEvaluationDetails?.evaluateur?.nom}</p>
                <p><strong>Évalué :</strong> {selectedEvaluationDetails?.evalue?.matricule} - {selectedEvaluationDetails?.evalue?.nom}</p>

                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Nom de la question</th>
                      <th>Description</th>
                      <th>Note</th>
                      <th>Note maximale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEvaluationDetails?.reponses?.map((rep, i) => (
                      <tr key={i}>
                        <td>{rep?.question?.nom}</td>
                        <td>{rep?.question?.description}</td>
                        <td>{rep?.note}</td>
                        <td>{rep?.question?.noteMax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p><strong>Note totale :</strong> {selectedEvaluationDetails?.noteTotale}</p>
                <p><strong>Remarques :</strong> {selectedEvaluationDetails?.remarques}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDetailsModalOpen(false)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserEvaluationsPage;
