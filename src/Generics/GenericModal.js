// Generics/GenericModal.js
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "reactstrap";
import { getAllGares } from "../services/stationService";
import "../assets/css/GenericModal.css";

const GenericModal = ({
  isOpen,
  toggle,
  mode,
  fields,
  values,
  onChange,
  onSave,
  roleOptions,
}) => {
  const [lieuType, setLieuType] = useState(
    values.lieuTravail?.toLowerCase().includes("siège") ? "siège" : "gare"
  );
  const [gareOptions, setGareOptions] = useState([]);

  useEffect(() => {
    const hasLieuTravailField = fields.some((f) => f.key === "lieuTravail");
    if (hasLieuTravailField) {
      const fetchGares = async () => {
        const data = await getAllGares();
        const noms = data.map((g) => g.nom);
        setGareOptions(noms);
      };
      fetchGares();
    }
  }, [fields]);

  const handleLieuTypeChange = (e) => {
    const selectedType = e.target.value;
    setLieuType(selectedType);
    if (selectedType === "siège") {
      onChange("lieuTravail", "central");
    } else {
      onChange("lieuTravail", gareOptions.length > 0 ? gareOptions[0] : "");
    }
  };

  const modalTitle = {
    add: "Ajouter un élément",
    edit: "Modifier un élément",
    view: "Détails de l'élément",
  }[mode] || "Détails";

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="view-modal">
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>
        {fields.map((field) => {
          if (field.key === "lieuTravail") {
            return (
              <div key={field.key} className="mb-3">
                <Label className="modal-label">Lieu de travail</Label>
                <div className="radio-group-centered">
                  <Label
                    check
                    className={`radio-option ${
                      lieuType === "siège" ? "active" : ""
                    }`}
                  >
                    <Input
                      type="radio"
                      name="lieuType"
                      value="siège"
                      checked={lieuType === "siège"}
                      onChange={handleLieuTypeChange}
                      disabled={mode === "view"}
                    />
                    Siège
                  </Label>
                  <Label
                    check
                    className={`radio-option ${
                      lieuType === "gare" ? "active" : ""
                    }`}
                  >
                    <Input
                      type="radio"
                      name="lieuType"
                      value="gare"
                      checked={lieuType === "gare"}
                      onChange={handleLieuTypeChange}
                      disabled={mode === "view"}
                    />
                    Gare
                  </Label>
                </div>
                <Input
                  type="select"
                  name="lieuTravail"
                  value={values[field.key]}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="modal-input"
                  disabled={mode === "view"}
                >
                  {lieuType === "siège"
                    ? ["central", "regional"].map((option, index) => (
                        <option key={index} value={option}>
                          {`SIÈGE ${option.toUpperCase()}`}
                        </option>
                      ))
                    : (gareOptions || []).map((gare, index) => (
                        <option key={index} value={gare}>
                          {`GARE : ${gare.toUpperCase()}`}
                        </option>
                      ))}
                </Input>
              </div>
            );
          }

          if (field.key === "role") {
            return (
              <div key={field.key} className="mb-3">
                <Label htmlFor={field.key} className="modal-label">
                  {field.label}
                </Label>
                {mode === "view" ? (
                  <div className="view-field">{values[field.key]}</div>
                ) : (
                  <Input
                    type="select"
                    name={field.key}
                    value={values[field.key]}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className="modal-input"
                    disabled={mode === "view"}
                  >
                    {(roleOptions || []).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                )}
              </div>
            );
          }

          if (field.key === "reponses" && Array.isArray(field.options)) {
            return (
              <div key={field.key} className="mb-3">
                <Label className="modal-label">Notes par question</Label>
                {field.options.map((q, idx) => (
                  <div
                    key={q.id}
                    style={{
                      marginBottom: "12px",
                      background: "#f7f7f7",
                      padding: "8px",
                      borderRadius: "5px",
                    }}
                  >
                    <strong>{q.label}</strong>
                    <Input
                      type="number"
                      min={0}
                      max={q.max || 5}
                      value={values.reponses?.find(r => r.questionId === q.id)?.note || 0}
                      onChange={(e) => {
                        const updated = values.reponses?.filter(r => r.questionId !== q.id) || [];
                        updated.push({
                          questionId: q.id,
                          note: parseInt(e.target.value) || 0,
                        });
                        onChange("reponses", updated);
                      }}
                      className="modal-input"
                    />
                  </div>
                ))}
              </div>
            );
          }

          if (field.type === "custom" && typeof field.render === "function") {
            return (
              <div key={field.key} className="mb-3">
                <Label className="modal-label">{field.label}</Label>
                {field.render()}
              </div>
            );
          }

          return (
            <div key={field.key} className="mb-3">
              <Label htmlFor={field.key} className="modal-label">
                {field.label}
              </Label>
              {mode === "view" ? (
                <div className="view-field">
                  {Array.isArray(values[field.key])
                    ? values[field.key].join(", ")
                    : values[field.key]}
                </div>
              ) : field.type === "select" || field.type === "multiselect" ? (
                <Input
                  type="select"
                  name={field.key}
                  multiple={field.type === "multiselect"}
                  value={values[field.key]}
                  onChange={(e) => {
                    const value = field.type === "multiselect"
                      ? Array.from(e.target.selectedOptions, (opt) => opt.value)
                      : e.target.value;
                    onChange(field.key, value);
                  }}
                  className="modal-input"
                  disabled={field.readOnly || mode === "view"}
                >
                  {(field.options || []).map((option, index) => (
                    <option key={index} value={option.value || option}>
                      {option.label || option}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input
                  type={field.type || "text"}
                  name={field.key}
                  value={values[field.key]}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="modal-input"
                  disabled={field.readOnly || mode === "view"}
                  {...field}
                />
              )}
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        {mode !== "view" && (
          <Button color="primary" onClick={onSave}>
            Sauvegarder
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GenericModal;
