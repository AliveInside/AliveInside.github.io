import axios from "axios";
import { useEffect, useState } from "react";
import { KDC_URL } from "../KDC_URL";

export const useSurveys = (userId: string | undefined) => {
  const [userSurveys, setUserSurveys] = useState([]);

  const fetchUserSurveys = async (user_id: string | undefined) => {
    try {
      const apiUrl = `${KDC_URL}/api/v1/report/user/${userId}/all`;
      const { data } = await axios.post(apiUrl, user_id);
      setUserSurveys(data);
    } catch (error) {
      console.error("Error fetching user surveys:", error);
    }
  };

  useEffect(() => {
    console.log(userId);
    fetchUserSurveys(userId);
  }, []);

  return { userSurveys };
};
