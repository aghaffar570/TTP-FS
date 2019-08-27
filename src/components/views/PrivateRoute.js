import React, { useContext, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../providers/AuthContext"
import firebase from '../../config/firebase'


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute
