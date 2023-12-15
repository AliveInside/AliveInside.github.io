import React, { FC, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useSurveys } from "../hooks/useSurveys";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KDC_URL } from "../KDC_URL";

type Survey = {
  userId: string;
  survey_name: string;
};

const UserSurveys: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  //const { userSurveys } = useSurveys(userId);
  const [test, setTest] = useState([]);

  React.useEffect(() => {
    const fetchUserSurveys = async () => {
      try {
        const apiUrl = `${KDC_URL}/api/v1/report/user/${userId}/all`;
        const { data } = await axios.post(apiUrl, { user_id: userId });
        setTest(data.report);
        console.log(data.report);
      } catch (error) {
        console.error("Error fetching user surveys:", error);
      }
    };
    fetchUserSurveys();
  }, []);
  const columns = useMemo<ColumnDef<Survey>[]>(
    () => [
      {
        header: "Название опроса",
        cell: (row) => row.renderValue(),
        accessorKey: "survey_name",
      },
      {
        header: "Дата заполнения",
        cell: ({ getValue }) =>
          moment(getValue<any>()[0].timestamp).format("DD-MM-YYYY"),
        accessorKey: "operations",
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="page-header">Опросы пользователя {userId}</div>
      <Table
        data={test}
        columns={columns}
        showGlobalFilter
        filterFn={filterFns.contains}
      />
    </div>
  );
};

export default UserSurveys;
