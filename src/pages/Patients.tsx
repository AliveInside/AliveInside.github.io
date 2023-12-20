import React, { FC, useContext, useEffect, useMemo } from "react";
import Table from "../components/Table/Table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { usePatients } from "../hooks/usePatients";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";
import { IPatient } from "../store/types";
import { PatientContext } from "../store/PatientStore";

const Patients: FC = () => {
  const [limit, setLimit] = React.useState(10);

  const { patients } = usePatients(limit);

  const { patient, dispatch } = useContext(PatientContext);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const handleDispatchPatient = (row: CellContext<IPatient, any>) => {
    dispatch({ patient: row.row.original });
    navigate(`/surveys/${row.row.original.firstName}`);
  };

  const columns = useMemo<ColumnDef<IPatient>[]>(
    () => [
      {
        header: "ФИО",
        cell: (row: CellContext<IPatient, any>) => (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDispatchPatient(row);
            }}
          >
            {row.renderValue()}
          </span>
        ),
        accessorKey: "fullName",
      },
      {
        header: "Дата рождения",
        cell: ({ getValue }) =>
          moment(new Date(getValue<any>())).format("DD.MM.YYYY"),
        accessorKey: "userBirthDate",
      },
      {
        header: "Пол",
        cell: (row) => row.renderValue(),
        accessorKey: "userGender",
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="page-header">Пациенты</div>
      <Table
        data={patients}
        columns={columns}
        showGlobalFilter
        filterFn={filterFns.contains}
      />
      <button onClick={handleShowMore}>Нажми если ты приемный</button>
    </div>
  );
};

export default Patients;
