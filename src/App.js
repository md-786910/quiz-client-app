import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./admin/auth/Login";
import Register from "./admin/auth/Register";
import Quizz from "./admin/quiz/Quizz";
import "./App.css";
import UserLogin from "./client/auth/UserLogin";
import UserRegister from "./client/auth/UserRegister";
import TestPage from "./components/client/TestPage";
import Header from "./page/Header";
import HomePage from "./page/HomePage";

function App() {
  const [d, setD] = useState();
  const [e, setE] = useState();
  const checkAdmin = (props) => {
    setD(props);
  };
  const checkUser = (props) => {
    setE(props);
  };

  return (
    <>
      <Header check={d} check1={e} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/register" element={<Register />} />
        <Route
          path="/admin/login"
          element={<Login checkAdmin={checkAdmin} />}
        />
        <Route path="/admin/create" element={<Quizz />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route
          path="/user/login"
          element={<UserLogin checkUser={checkUser} />}
        />
        <Route path="/user/testPage" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
