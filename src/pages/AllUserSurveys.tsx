import React, { FC, useContext, useEffect, useMemo } from "react";
import Table from "../components/Table/Table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KDC_URL } from "../KDC_URL";
import { PatientContext } from "../store/PatientStore";
import { ISurvey } from "../store/types";
import Survey from "./Survey";

// type Survey = {
//   userId: string;
//   survey_type: string;
// };

const AllUserSurveys: FC = () => {
  // const { userId } = useParams<{ userId: string }>();
  // const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  const { surveys, patient, dispatch } = useContext(PatientContext);

  React.useEffect(() => {
    const fetchUserSurveys = async () => {
      console.log(`${KDC_URL}/api/v1/report/user/${patient.userId}/all`);
      try {
        const apiUrl = `${KDC_URL}/api/v1/report/user/${patient.userId}/all`;
        const { data } = await axios.post(apiUrl, { user_id: patient.userId });
        dispatch({ surveys: data.report });
      } catch (error) {
        console.error(
          "Error fetching pacients surveys:"
          // error.response.status
        );
      }
    };

    fetchUserSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("patient", JSON.stringify(patient));
  //   const newPatientData = window.localStorage.getItem("patient");
  //   const parsedFavouritesData = JSON.parse(newPatientData!) ?? [];
  //   dispatch({ patient: parsedFavouritesData });
  // }, [patient]);

  const handleDispatchSurvey = (row: CellContext<ISurvey, any>) => {
    dispatch({ survey: row.row.original });
    navigate(`/surveys/${patient.firstName}/${row.row.original.survey_name}`);
  };

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
