import axios from "axios";
import { useEffect, useState } from "react";
import { KDC_URL } from "../KDC_URL";

export const usePatients = (limit?: number) => {
  const [patients, setPatients] = useState([]);
  
  const fetchPatients = async () => {
    try {
      const apiUrl = `${KDC_URL}/api/v1/admin_panel/patients?limit=${limit}`;
      const { data } = await axios.get(apiUrl);
      const formattedData = data.map(
        (patient: { lastName: any; firstName: any; patronymic: any }) => {
          const { lastName, firstName, patronymic } = patient;
          const fullName = patronymic
            ? `${lastName} ${firstName} ${patronymic}`
            : `${lastName} ${firstName}`;
          return { ...patient, fullName };
        }
      );
      setPatients(formattedData);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [limit]);

  return { patients };
};
