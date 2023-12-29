import { ColumnDef } from "@tanstack/react-table";
import Table from "../components/Table/Table";
import { useContext, useEffect, useMemo } from "react";
import { PatientContext } from "../store/PatientStore";
import { filterFns } from "../components/Table/filterFn";
import { useSurvey } from "../hooks/useSurvey";
import { IAnswers } from "../store/types";

const Survey = () => {
  // получаем опрос и диспатч из контекста
  const { survey, dispatch } = useContext(PatientContext);

  // получаем опрос из локал стора
  useEffect(() => {
    const surveyData = window.localStorage.getItem("survey");

    if (surveyData) {
      dispatch({ survey: JSON.parse(surveyData) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // получаем данные для опроса с бэка
  const { answers, time } = useSurvey();

  const columns = useMemo<ColumnDef<IAnswers>[]>(
    () => [
      {
        header: "Вопрос",
        cell: (row) => row.renderValue(),
        // cell: (row: CellContext<string, any>) => (
        //   <span style={{ cursor: "pointer" }}>{row.renderValue()}</span>
        // ),
        accessorKey: "question",
      },
      {
        header: "Ответ",
        cell: (row) => row.renderValue(),
        // cell: ({ getValue }) => getValue<any>()[0].answer,
        accessorKey: "answer",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="container">
      <div className="page-header">
        {survey.survey_name} от {time}
      </div>
      <Table
        data={answers}
        columns={columns}
        showGlobalFilter
        filterFn={filterFns.contains}
      />
    </div>
  );
};

export default Survey;
