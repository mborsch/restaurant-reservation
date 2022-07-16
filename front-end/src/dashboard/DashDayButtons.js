import React from "react";
import { today, previous, next } from "../utils/date-time";

function DashDayButtons({ date, setDate }) {
  const day = today();
  const prevDay = previous(date);
  const nextDay = next(date);

  return (
    <div className="buttons d-flex  ml-0">
      <button className="btn btn-dark" onClick={() => setDate(prevDay)}>
        <span className="oi oi-arrow-left mr-2"> </span>
        Previous Day
      </button>

      <button className="btn btn-dark mx-3" onClick={() => setDate(day)}>
        Today
      </button>

      <button className="btn btn-dark" onClick={() => setDate(nextDay)}>
        Next Day
        <span className="oi oi-arrow-right ml-2"> </span>
      </button>
    </div>
  );
}

export default DashDayButtons;
