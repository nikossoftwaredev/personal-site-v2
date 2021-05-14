import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Todos from "./components/Todos";
import LogInPage from "./pages/LogInPage";
import Header from "./header/Header";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import RegisterPage from "./pages/RegisterPage";
import { apiGET, getApiResource } from "./redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutPage from "./pages/LogoutPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGET("authenticate"));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LogInPage />
        </Route>
        <Route exact path="/logout">
          <LogoutPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/todos">
          <Todos />
        </Route>
        <Route exact path="/projects">
          <ProjectsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
