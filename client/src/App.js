import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import TodoList from "./components/TodoList";
import LogInPage from "./pages/LogInPage";
import Header from "./header/Header";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import RegisterPage from "./pages/RegisterPage";
import { apiGET } from "./redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import LogoutPage from "./pages/LogoutPage";
import { BackgroundImageDiv, ContainerDiv } from "./styles/genericStyles";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGET({ path: "authenticate" }));
  }, [dispatch]);

  return (
    <div className="App">
      <BackgroundImageDiv src="url(images/background-login.jpg)">
        <Header />
        <Switch>
          <ContainerDiv>
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
              <TodoList />
            </Route>
            <Route exact path="/projects">
              <ProjectsPage />
            </Route>
          </ContainerDiv>
        </Switch>
      </BackgroundImageDiv>
    </div>
  );
};

export default App;
