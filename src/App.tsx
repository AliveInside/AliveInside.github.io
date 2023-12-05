import React from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Patients from "./pages/Patients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Patients />} />
      </Route>
    </Routes>
  );
}

export default App;
