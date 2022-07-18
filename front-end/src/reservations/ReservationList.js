import React from "react";
import { Link } from "react-router-dom";

const ReservationList = ({ reservations }) => {
  return (
    <>
      <div>
        <ul>
          {reservations.map((reservation) => (
            <>
              <h5>
                {reservation.reservation_time}: {reservation.last_name},{" "}
                {reservation.first_name}
              </h5>
              <Link
                className="btn btn-dark mx-1 mb-2"
                to={`/reservations/${reservation.reservation_id}/seat`}
              >
                <span className="oi oi-people mr-2" />
                Seat
              </Link>
              <li>Party of: {reservation.people}</li>
              <li>Contact: {reservation.mobile_number}</li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReservationList;
