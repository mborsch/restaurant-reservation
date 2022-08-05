import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as url } from "../utils/api";

const ReservationList = ({ reservations }) => {
  const history = useHistory();

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
              {reservation.status === "booked" ? (
                <div>
                  <Link
                    className="btn btn-dark mr-6 my-2 pl-2 mx-2"
                    to={`/reservations/${reservation.reservation_id}/seat`}
                  >
                    <span className="oi oi-people mr-2" />
                    Seat
                  </Link>
                  <Link
                    className="btn btn-dark mr-6 my-2 pl-2 mx-2 d-md-inline"
                    to={`/reservations/${reservation.reservation_id}/edit`}
                  >
                    <span className="oi oi-pencil mr-2" />
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger d-block my-2  d-md-inline mx-2"
                    data-reservation-id-cancel={reservation.reservation_id}
                    onClick={() => {
                      window.confirm(
                        "Do you want to cancel this reservation? This cannot be undone."
                      ) &&
                        axios
                          .put(
                            `${url}/reservations/${reservation.reservation_id}/status`,
                            {
                              data: { status: "cancelled" },
                            }
                          )
                          .then((res) => {
                            res.status === 200 && history.push("/");
                          });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
            {/*  <p>Contact: {reservation.mobile_number}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
