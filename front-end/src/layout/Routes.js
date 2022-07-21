import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "../reservations/ReservationCreate";
import TableCreate from "../tables/TableCreate";
import SeatForm from "../seat/SeatForm";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const [date, setDate] = useState(query.get("date") || today());

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatForm />
      </Route>

      <Route exact={true} path="/reservations/new">
        <ReservationCreate setDate={setDate} />
      </Route>
      <Route exact={true} path="/tables/new">
        <TableCreate />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
