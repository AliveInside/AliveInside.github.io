import { useContext, useEffect, useState } from "react";
import { KDC_URL } from "../KDC_URL";
import axios from "axios";
import { PatientContext } from "../store/PatientStore";
import moment from "moment";
import { IAnswers } from "../store/types";
import { useLocalStorage } from "./useLocalStorage";

export const useSurvey = () => {
  const { survey } = useContext(PatientContext);

  const { getItem } = useLocalStorage("survey");
  const parsedSurvey = getItem(survey);

  const [answers, setAnswers] = useState<IAnswers[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const apiUrl = `${KDC_URL}/api/v1/report/operation/${parsedSurvey.operations[0].id}`;
        const { data } = await axios.get(apiUrl);
        setAnswers(data.answers);
        setTime(moment(data.timestamp).format("DD.MM.YYYY"));
      } catch (e) {
        console.error("Error fetching survey's data:", e);
      }
    };

    fetchSurvey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { answers, time };
};
