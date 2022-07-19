import react, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";
import { API_BASE_URL as url } from "../utils/api";

const ReservationCreate = ({ setDate }) => {
  const history = useHistory();
  //  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [reservationsError, setReservationsError] = useState(null);

  const [error, setError] = useState(null);
  /*
    useEffect(() => {

    })
    */

  const createReservation = (reservation) => {
    axios
      .post(`${url}/reservations`, { data: reservation })
      .then((res) => {
        res.status === 201 &&
          history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch((err) => {
        setReservationsError({ message: err.response.data.error });
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setReservationsError(null);
    reservation.people = Number(reservation.people);

    createReservation(reservation);
    setDate(reservation.reservation_date.slice(0, 10));
  };

  return (
    <>
      <h1>Create Reservation</h1>
      <ErrorAlert error={reservationsError} />

      <form onSubmit={submitHandler}>
        {/* first and last name fields */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="oi oi-person mr-2"></span>
              Name
            </span>
          </div>
          <label className="sr-only" htmlFor="first_name">
            First Name
          </label>
          <input
            className="form-control"
            placeholder="First Name"
            aria-label="First name"
            id="first_name"
            type="text"
            name="first_name"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                first_name: e.target.value,
              }));
            }}
            value={reservation.first_name}
            maxLength="50"
            required
          />
          <label className="sr-only" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="form-control"
            placeholder="Last Name"
            aria-label="Last name"
            id="last_name"
            type="text"
            name="last_name"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                last_name: e.target.value,
              }));
            }}
            value={reservation.last_name}
            maxLength="50"
            required
          />
        </div>
        {/* mobile number field */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-phone mr-2"></span>
              Mobile Number
            </span>
          </div>
          <label className="sr-only" htmlFor="mobile_number">
            Mobile Number
          </label>
          <input
            className="form-control"
            placeholder="xxx-xxx-xxxx"
            aria-label="Mobile number"
            id="mobile_number"
            type="tel"
            name="mobile_number"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                mobile_number: e.target.value,
              }));
            }}
            value={reservation.mobile_number}
            required
          />
        </div>
        {/* reservation date */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-calendar mr-2"></span>
              Date
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_date">
            Reservation Date
          </label>
          <input
            className="form-control"
            aria-label="Reservation Date"
            id="reservation_date"
            type="date"
            name="reservation_date"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                reservation_date: e.target.value,
              }));
            }}
            value={reservation.reservation_date}
            required
          />
        </div>
        {/* Reservation Time */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-clock mr-2"></span>
              Time
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_time">
            Reservation Time
          </label>
          <input
            className="form-control"
            aria-label="Reservation Time"
            id="reservation_time"
            type="time"
            name="reservation_time"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                reservation_time: e.target.value,
              }));
            }}
            value={reservation.reservation_time}
            required
          />
        </div>
        {/* people */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-people mr-2"></span>
              Number of People
            </span>
          </div>
          <label className="sr-only" htmlFor="people">
            Number of People
          </label>
          <input
            className="form-control"
            aria-label="Number of People"
            id="people"
            type="number"
            name="people"
            onChange={(e) => {
              setReservation((cur) => ({
                ...cur,
                people: e.target.value,
              }));
            }}
            value={reservation.people}
            min="1"
            required
          />
        </div>
        {/* cancel and submit buttons */}

        <button
          className="btn btn-secondary mr-1 mb-3"
          to="/"
          onClick={() => history.goBack()}
        >
          <span className="oi oi-circle-x mr-2" />
          Cancel
        </button>
        <button className="btn btn-primary mx-1 mb-3" type="submit">
          <span className="oi oi-circle-check mr-2" />
          Submit
        </button>
      </form>
    </>
  );
};

export default ReservationCreate;
