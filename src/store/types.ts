export interface IPatient {
  userSnils: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  userPhone: string;
  userId: number;
  userRole: string;
  userBirthDate: string;
  userGender: string;
}

export type IOperation = {
  id: number;
  timestamp: string;
};

export interface IAnswers {
  answers: {
    question: string;
    number: number;
    answer: string;
  };
}

export interface ISurvey {
  survey_name: string;
  operations: IOperation[];
}

export type initialStateProps = {
  patients: IPatient[];
  patient: IPatient;
  surveys: ISurvey[];
  survey: ISurvey;
};

export type PatientContextDispatchProps = {
  dispatch: (state: Partial<initialStateProps>) => void;
};

export type PatientContextProps = initialStateProps &
  PatientContextDispatchProps;

export type PatientProviderProps = {
  children: React.ReactNode;
};
