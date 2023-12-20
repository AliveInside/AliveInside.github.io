import React, { useMemo } from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Patients from "./pages/Patients";
import LoginLayout from "./layouts/LoginLayout";
import Survey from "./pages/Survey";
import AllUserSurveys from "./pages/AllUserSurveys";
import { useCustomState } from "./hooks/useCustomState";
import { PatientContextProps } from "./store/types";
import { PatientContext, initialState } from "./store/PatientStore";

function App() {
  const [state, dispatch] = useCustomState<PatientContextProps>({
    ...initialState,
    dispatch: () => {},
  });

  const context = useMemo<PatientContextProps>(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <PatientContext.Provider value={context}>
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Patients />} />
          <Route path="/surveys/:userId" element={<AllUserSurveys />} />
          <Route path="/surveys/:userId/:surveyName" element={<Survey />} />
        </Route>
      </Routes>
    </PatientContext.Provider>
  );
}

export default App;
