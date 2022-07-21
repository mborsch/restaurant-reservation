import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashDayButtons from "./DashDayButtons";
import NoReservations from "../reservations/NoReservations";
import ReservationList from "../reservations/ReservationList";

import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables()
      .then((tables) => {
        return tables;
      })
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-md-flex mb-3">
        <DashDayButtons date={date} setDate={setDate} />
      </div>
      {/*JSON.stringify(reservations)*/}
      <div className="group">
        {reservations.length === 0 ? (
          <NoReservations date={date} />
        ) : (
          <ReservationList reservations={reservations} />
        )}
      </div>
      <div className="group container col-9">
        <h3>Tables:</h3>
        <div className="group-item">
          {tables.map((table) => (
            <TableList
              key={table.table_id}
              table={table}
              loadDashboard={loadDashboard}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
