import axios from "axios";
import { useContext, useEffect } from "react";
import { KDC_URL } from "../KDC_URL";
import { PatientContext } from "../store/PatientStore";

export const usePatients = (limit?: number) => {
  const { patients, dispatch } = useContext(PatientContext);

  const fetchPatients = async () => {
    try {
      const apiUrl = `${KDC_URL}/api/v1/admin_panel/patients?limit=${limit}&order_direction=ASC`;
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

      dispatch({ patients: formattedData });
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return { patients };
};
