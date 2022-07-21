import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL as url, findReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const TableList = ({ table, loadDashboard }) => {
  const [reservation, setReservation] = useState([]);
  const { table_id, table_name, capacity, reservation_id } = table;

  useEffect(() => {
    const abortController = new AbortController();
    reservation_id && findReservation(reservation_id).then(setReservation);
    return () => abortController.abort();
  }, [table, reservation_id]);

  let statusColor, statusName;

  if (reservation_id === null) {
    statusColor = "success";
    statusName = "free";
  } else {
    statusColor = "danger";
    statusName = "occupied";
  }

  const endReservation = (event) => {
    event.preventDefault();

    window.confirm("Is this table ready to seat new guests?") &&
      axios.delete(`${url}/tables/${table_id}/seat`).then((res) => {
        res.status === 200 && loadDashboard();
      });
  };

  return (
    <div className="card my-2 ">
      <div className="card-header d-flex align-items-center">
        <h5 className="my-0">{table_name}</h5>
        <div className="my-0 ml-auto" data-table-id-status={table_id}>
          Status:{" "}
          <span className={`badge badge-pill badge-${statusColor}`}>
            {statusName}
          </span>
        </div>
      </div>
      <div className="card-body d-flex align-items-center">
        <h5 className="card-title my-0">
          {reservation_id
            ? `Reserved: ${reservation.last_name}, ${reservation.first_name} (${reservation.people})`
            : `Capacity: ${capacity}`}
        </h5>
        {reservation_id && (
          <button
            onClick={endReservation}
            className="btn btn-danger ml-auto"
            data-table-id-finish={table_id}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default TableList;
