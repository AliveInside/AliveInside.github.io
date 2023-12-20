import { CellContext, ColumnDef, filterFns } from "@tanstack/react-table";
import Table from "../components/Table/Table";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { KDC_URL } from "../KDC_URL";
import axios from "axios";
import { PatientContext } from "../store/PatientStore";
import moment from "moment";

interface IAnswers {
  answers: {
    question: string;
    number: number;
    answer: string;
  };
}
const Survey = () => {
  // нужно получить id опроса из всего списка опросов (то есть from AllUserSurveys)

  const { survey } = useContext(PatientContext);

  const [answers, setAnswers] = useState<IAnswers[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const apiUrl = `${KDC_URL}/api/v1/report/operation/${survey.operations[0].id}`;
        const { data } = await axios.get(apiUrl);
        console.log(data.answers);
        setAnswers(data.answers);
        setTime(data.timestamp);
      } catch (e) {
        console.error("Error fetching survey's data:", e);
        console.log("survey", survey.operations[0].id);
      }
    };

    fetchSurvey();
  }, []);

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
        // filterFn={filterFns.contains}
      />
    </div>
  );
};

export default Survey;
