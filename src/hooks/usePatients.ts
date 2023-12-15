import axios from "axios";
import { useEffect, useState } from "react";
import { KDC_URL } from "../KDC_URL";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const apiUrl = `${KDC_URL}/api/v1/admin_panel/patients`;
      const { data } = await axios.get(apiUrl);
      setPatients(data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients };
};
