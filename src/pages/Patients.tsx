import React, { FC, useMemo } from "react";
import Table from "../components/Table/Table";
import { ColumnDef } from "@tanstack/react-table";
import { usePatients } from "../hooks/usePatients";
import moment from "moment";
import { filterFns } from "../components/Table/filterFn";

type Patient = {
  userSnils: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  userPhone: string;
  userId: number;
  userRole: string;
  userBirthDate: string;
  userGender: string;
};

const Patients: FC = () => {
  const { patients } = usePatients();

  const columns = useMemo<ColumnDef<Patient>[]>(
    () => [
      {
        header: "Фамилия",
        cell: (row) => row.renderValue(),
        accessorKey: "lastName",
      },

      {
        header: "Имя",
        cell: (row) => row.renderValue(),
        accessorKey: "firstName",
      },

      {
        header: "Отчество",
        cell: (row) => row.renderValue(),
        accessorKey: "patronymic",
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
      {/* <SearchBar /> */}
      <Table
        data={patients}
        columns={columns}
        showGlobalFilter
        filterFn={filterFns.contains}
      />
    </div>
  );
};

export default Patients;
