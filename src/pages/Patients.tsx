import React, { FC, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import mData from "../MOCK_DATA.json";
import { ColumnDef } from "@tanstack/react-table";

type Item = {
  name: string;
  born: string;
  gender: string;
};

const Patients: FC = () => {
  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Пациент",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Дата рождения",
        cell: (row) => row.renderValue(),
        accessorKey: "born",
      },
      {
        header: "Пол",
        cell: (row) => row.renderValue(),
        accessorKey: "gender",
      },
    ],
    []
  );

  console.log(columns);

  return (
    <div className="container">
      <div className="page-header">Пациенты</div>
      <SearchBar />
      <Table data={mData} columns={columns} />
    </div>
  );
};

export default Patients;
