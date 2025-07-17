import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import {
  FaPlus,
  FaDownload,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaFileExcel,
  FaTrain,
} from "react-icons/fa";
import "../assets/css/GenericActionButtons.css";

const GenericActionButtons = ({
  selectedRow,
  onAdd,
  onDownload,
  onEdit,
  onDelete,
  onView,
  onExport,
  onSearchChange,
  title = "Title",
  icon = <FaTrain />,
  description = "Description",
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch && onSearchChange) {
      onSearchChange(""); // réinitialiser la recherche si on la masque
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="action-buttons-container mb-3 p-3 rounded">
      <div className="d-flex align-items-start">
        {icon && <div className="mr-3 icon-custom">{icon}</div>}
        <div>
          <h5 className="title-custom">{title}</h5>
          <p className="description-custom">{description}</p>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3 flex-wrap align-items-center">
        {showSearch && (
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher..."
            className="mx-2 mb-2"
            style={{ maxWidth: 250 }}
          />
        )}

        <Button color="secondary" className="mx-2 mb-2" onClick={handleSearchClick}>
          🔍
        </Button>

        {!selectedRow ? (
          <>
            <Button color="success" className="mx-2 mb-2" onClick={onAdd}>
              <FaPlus /> Ajouter
            </Button>
            <Button color="info" className="mx-2 mb-2" onClick={onDownload}>
              <FaDownload /> PDF
            </Button>
            <Button color="primary" className="mx-2 mb-2" onClick={onExport}>
              <FaFileExcel /> Excel
            </Button>
          </>
        ) : (
          <>
            <Button color="warning" className="mx-2 mb-2" onClick={onEdit}>
              <FaEdit /> Modifier
            </Button>
            <Button color="danger" className="mx-2 mb-2" onClick={onDelete}>
              <FaTrashAlt /> Supprimer
            </Button>
            <Button color="secondary" className="mx-2 mb-2" onClick={onView}>
              <FaEye /> Voir
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GenericActionButtons;
