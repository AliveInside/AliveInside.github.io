import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { usePatients } from "../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";
import { IPatient } from "../store/types";
import { PatientContext } from "../store/PatientStore";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Patients: FC = () => {
  const [limit, setLimit] = useState(10);
  const [hasPatientChanged, setHasPatientChanged] = useState(false);

  // функция, для сохранения пациента в локал стор
  const { setItem } = useLocalStorage("patient");

  // получаем пациентов с бэка
  const { patients } = usePatients(limit);

  // получаем пациента и диспатч из контекста
  const { patient, dispatch } = useContext(PatientContext);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  // функция для диспатча пациента в контекст
  const handleDispatchPatient = (row: CellContext<IPatient, any>) => {
    dispatch({ patient: row.row.original });
    setHasPatientChanged(true);
  };

  // при изменении пациента, сохраняем его в локальное хранилище + переходим по ссылке
  useEffect(() => {
    if (hasPatientChanged && patient) {
      setItem(patient);
      navigate(`/surveys/${patient.firstName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient, hasPatientChanged]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
