import React from "react";
import { Link } from "react-router-dom";

const ReservationList = ({ reservations }) => {
  return (
    <div className="container col-lg-9">
      <div className="d-flex flex-column w-500 justify-content-center">
        {reservations.map((reservation) => (
          <div className="card card-bg my-2 d-flex align-items-center">
            <div className="card-header d-flex align-items-center">
              <h5 className="my-0 mr-2">
                {reservation.reservation_time}: {reservation.last_name},{" "}
                {reservation.first_name}
              </h5>
              <div className="d-flex justify-content-end">
                <p className="ml-auto my-0">Party of: {reservation.people} </p>
              </div>
              <div
                className="my-0 ml-1 justify-content-end"
                data-reservation-id-status={reservation.reservation_id}
              >
                {"  "}Status:{" "}
                <span className={`badge badge-pill badge-info`}>
                  {reservation.status}
                </span>
              </div>
            </div>

            <div className="d-inline-block ml-auto justify-content-end mr-3">
              {reservation.status === "seated" ? null : (
                <Link
                  className="btn btn-dark mr-6 my-2 pl-2 mx-2"
                  to={`/reservations/${reservation.reservation_id}/seat`}
                >
                  <span className="oi oi-people mr-2" />
                  Seat
                </Link>
              )}
              <button className="btn btn-danger d-lcok d-md-inline mx-2">
                Cancel
              </button>
            </div>
            {/*  <p>Contact: {reservation.mobile_number}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
