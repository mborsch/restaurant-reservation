import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as url, findReservation, listTables } from "../utils/api";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

const SeatForm = () => {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [tableId, setTableId] = useState(null);
  const [errors, setErrors] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    findReservation(reservation_id).then(setReservation);
    return () => abortController.abort();
  }, []);

  const changeHandler = (event) => {
    const { value } = event.target;
    return value ? setTableId(value) : setTableId(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (tableId !== "0") {
      return axios
        .put(`${url}/tables/${tableId}/seat`, {
          data: { reservation_id: reservation_id },
        })
        .then((res) => res.status === 200 && history.push("/"))
        .catch((err) => {
          setErrors({ message: err.response.data.error });
        });
    }
  };

  return (
    <div className="row justify-content-center">
      <h1 className="text-center py-4">Seat Reservation</h1>
      <ErrorAlert error={errors} />
      <form className="col-lg-10" onSubmit={submitHandler}>
        <h3>
          {reservation.last_name} Party of: {reservation.people}
        </h3>
        <div className="form-group">
          <label htmlFor="select_table"></label>
          <select
            onChange={changeHandler}
            className="form=control"
            id="select_table"
            name="table_id"
          >
            <option key={0} value={0}>
              Please select an option:
            </option>
            {tables.map((table, index) => {
              return (
                <option key={index} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              );
            })}
          </select>
        </div>
        <div className="btns mt-2">
          <button className="btn btn-primary mr-2" type="submit">
            Submit
          </button>

          <button
            onClick={() => history.goBack()}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeatForm;