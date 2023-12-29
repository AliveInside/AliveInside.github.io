import { createContext } from "react";
import { PatientContextProps } from "../types";

const initialState = {
  patients: [],
  patient: {
    userSnils: "11",
    firstName: "",
    lastName: "",
    patronymic: "",
    userPhone: "",
    userId: 0,
    userRole: "",
    userBirthDate: "",
    userGender: "",
  },

  surveys: [],
  survey: {
    survey_name: " ",
    operations: [
      {
        id: 0,
        timestamp: "",
      },
    ],
  },
};

const PatientContext = createContext<PatientContextProps>({
  ...initialState,
  dispatch: () => {},
});

export { initialState, PatientContext };
