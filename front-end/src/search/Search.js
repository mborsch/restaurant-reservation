import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "../reservations/ReservationList";
import ErrorAlert from "../layout/ErrorAlert";

const Search = () => {
  const [reservations, setReservations] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState(null);

  const changeHandler = (e) => setSearchInput(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    listReservations({ mobile_number: searchInput }, abortController.signal)
      .then(setReservations)
      .catch((err) => {
        setErrors({ message: err.message });
      });
  };

  return (
    <div className="row justify-content-center">
      <form className="col-lg-10" onSubmit={submitHandler}>
        <h1 className="text-center py-4">Search Reservation By Phone</h1>

        <ErrorAlert error={errors} />
        <div className="form-group">
          <label htmlFor="mobile_number">Search by mobile number</label>
          <input
            name="mobile_number"
            className="form-control"
            onChange={changeHandler}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Search
        </button>
        {reservations.length ? (
          <ReservationList reservations={reservations} />
        ) : (
          <h5 className="mt-3">No reservations found</h5>
        )}
      </form>
    </div>
  );
};

export default Search;
