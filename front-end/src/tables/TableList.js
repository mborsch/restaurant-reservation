import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const TableList = ({ tables }) => {
  return (
    <div>
      <ul>
        {tables.map((table) => (
          <>
            <h5>{table.table_name}</h5>
            <h6>Capacity: {table.capacity}</h6>
          </>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
