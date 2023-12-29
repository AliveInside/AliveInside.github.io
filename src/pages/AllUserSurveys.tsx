import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../store/PatientStore";
import { ISurvey } from "../store/types";
import { useUserSurveys } from "../hooks/useUserSurveys";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AllUserSurveys: FC = () => {
  const navigate = useNavigate();
  const [hasSurveyChanged, setHasSurveyChanged] = useState(false);

  // получаем опрос, пациента и диспатч из контекста
  const { survey, patient, dispatch } = useContext(PatientContext);

  // функция для получения пациента с локал стора
  const { getItem } = useLocalStorage("patient");

  // функция для сохранения опроса в локал стор
  const { setItem } = useLocalStorage("survey");

  // достаем пациента из локал стора и диспатчим его
  const dispatchParsedpatient = () => {
    const parsedData = getItem(patient);
    dispatch({ patient: parsedData });
  };

  // диспатчим пациента при первом рендере
  useEffect(() => {
    dispatchParsedpatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // получаем опросы с бэка
  const { surveys } = useUserSurveys();

  // функция для диспатча опроса в контекст
  const handleDispatchSurvey = (row: CellContext<ISurvey, any>) => {
    dispatch({ survey: row.row.original });
    setHasSurveyChanged(true);
  };

  // при изменении опроса, сохраняем его в локальное хранилище + переходим по ссылке
  useEffect(() => {
    if (hasSurveyChanged && survey) {
      setItem(survey);
      navigate(`/surveys/${patient.firstName}/${survey.survey_name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [survey, hasSurveyChanged]);

  const columns = useMemo<ColumnDef<ISurvey>[]>(
    () => [
      {
        header: "Тип опроса",
        cell: (row: CellContext<ISurvey, any>) => (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDispatchSurvey(row)}
          >
            {row.renderValue()}
          </span>
        ),
        accessorKey: "survey_name",
      },
      {
        header: "Дата заполнения",
        cell: ({ getValue }) =>
          moment(getValue<any>()[0].timestamp).format("DD.MM.YYYY"),
        accessorKey: "operations",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="container">
      <div className="page-header">
        Опросы пользователя {patient.firstName} {patient.lastName}
        {patient.userId}
      </div>
      <Table
        data={surveys}
        columns={columns}
        showGlobalFilter
        filterFn={filterFns.contains}
      />
    </div>
  );
};

export default AllUserSurveys;
