import { useContext, useEffect } from "react";
import { KDC_URL } from "../KDC_URL";
import axios from "axios";
import { PatientContext } from "../store/PatientStore";
import { useLocalStorage } from "./useLocalStorage";

export const useUserSurveys = () => {
  const { surveys, patient, dispatch } = useContext(PatientContext);

  const { getItem } = useLocalStorage("patient");
  const parsedPatient = getItem(patient);

  useEffect(() => {
    const fetchUserSurveys = async () => {
      try {
        const apiUrl = `${KDC_URL}/api/v1/report/user/${parsedPatient.userId}/all`;
        const { data } = await axios.post(apiUrl, {
          user_id: parsedPatient.userId,
        });
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

  return { surveys };
};
