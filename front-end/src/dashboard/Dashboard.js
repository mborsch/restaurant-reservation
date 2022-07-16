import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashDayButtons from "./DashDayButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DashDayButtons date={date} setDate={setDate} />
      {/*JSON.stringify(reservations)*/}
      <div className="d-md-flex mb-3">
        {reservations.map((reservation) => (
          <>
            <h5>
              {reservation.first_name} {reservation.last_name}
            </h5>
            <ul>
              <li>Party of: {reservation.people}</li>
              <li>
                On: {reservation.reservation_date} at:{" "}
                {reservation.reservation_time}
              </li>
              <li>Contact: {reservation.mobile_number}</li>
            </ul>
          </>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
