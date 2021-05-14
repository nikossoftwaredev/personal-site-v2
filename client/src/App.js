import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Todos from "./components/Todos";
import LogInPage from "./pages/LogInPage";
import Header from "./header/Header";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => {
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
