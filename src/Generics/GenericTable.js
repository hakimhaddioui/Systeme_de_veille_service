// components/GenericTable.js
import React from "react";
import "../assets/css/GenericTable.css";

const GenericTable = ({
  data,
  columns,
  selectedRow,
  onRowClick,
  tableId = "data-table",
}) => {
  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
      <table className="table" id={tableId}>
        <thead>
          <tr>
            <th></th>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick(item.id)}
                className={selectedRow === item.id ? "selected" : ""}
                style={selectedRow === item.id ? { backgroundColor: "#e0e0e0" } : {}}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRow === item.id}
                    onChange={() => onRowClick(item.id)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key}>{item[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                Aucune donnée disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
