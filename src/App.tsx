import React from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Patients from "./pages/Patients";
import LoginLayout from "./layouts/LoginLayout";
import Polls from "./pages/Polls";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Patients />} />
        <Route path="/user-surveys/:userId" element={<Polls />} />
      </Route>
    </Routes>
  );
}

export default App;
