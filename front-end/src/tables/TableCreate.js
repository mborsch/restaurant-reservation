import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

const TableCreate = () => {
  const history = useHistory();
  //  const { reservation_id } = useParams();
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const [error, setError] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    createTable(table)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  };

  return (
    <>
      <h1>New Table</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="oi oi-table mr-2"></span>
              Table Name
            </span>
          </div>
          <label className="sr-only" htmlFor="table_name">
            Table Name
          </label>
          <input
            className="form-control"
            placeholder=""
            aria-label="table name"
            id="table_name"
            type="text"
            name="table_name"
            onChange={(e) => {
              setTable((cur) => ({
                ...cur,
                table_name: e.target.value,
              }));
            }}
            value={table.table_name}
            maxLength="50"
            minLength="2"
            required
          />
          <label className="sr-only" htmlFor="capacity">
            Capacity
          </label>
          <input
            className="form-control"
            placeholder="table capacity"
            aria-label="table capacity"
            id="capacity"
            type="number"
            name="capacity"
            onChange={(e) => {
              setTable((cur) => ({
                ...cur,
                capacity: e.target.value,
              }));
            }}
            value={table.capacity}
            min="1"
            required
          />
        </div>

        <button
          className="btn btn-secondary mr-1 mb-3"
          to="/"
          onClick={() => history.goBack()}
        >
          <span className="oi oi-x mr-2" />
          Cancel
        </button>

        <button className="btn btn-primary mx-1 mb-3" type="submit">
          <span className="oi oi-check mr-2" />
          Submit
        </button>
      </form>
    </>
  );
};

export default TableCreate;
