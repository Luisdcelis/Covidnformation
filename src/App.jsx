import { MuiThemeProvider, StylesProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext.jsx";
import Admin from "./screens/Admin.jsx";
import Covid from "./screens/Covid.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Positivo from "./screens/Positivo.jsx";
import Pruebas from "./screens/Pruebas.jsx";
import Register from "./screens/Register.jsx";
import Sintomas from "./screens/Sintomas.jsx";
import theme from "./theme/index.js";

function App() {
  const { user, isLoading } = useUser();
  const [redirect, setRedirect] = useState(user !== null);
  useEffect(() => {
    if (!isLoading) {
      setRedirect(user !== null);
    }
  }, [isLoading, user]);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <UserProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route exact path="/login">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Redirect to="/home" />
                ) : (
                  <Login />
                )}
              </Route>
              <Route exact path="/register">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Redirect to="/home" />
                ) : (
                  <Register />
                )}
              </Route>
              <Route exact path="/home">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Home />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/covid">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Covid />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/sintomas">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Sintomas />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/positivo">
                {redirect && user.username === "admin" ? (
                  <Redirect to="/admin" />
                ) : redirect ? (
                  <Positivo />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route exact path="/pruebas">
                <Pruebas />
              </Route>
              <Route exact path="/admin">
                {redirect && user.username === "admin" ? (
                  <Admin />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route>
                <Redirect to="/home" />
              </Route>
            </Switch>
          </Router>
        </UserProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
