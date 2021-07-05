import React, { createContext, useReducer } from "react";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <SignUp />
      </Route>

      <Route exact path="/logout">
        <Logout />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <Routing />
      </UserContext.Provider>
    </main>
  );
};

export default App;
