import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Get Organization Structure Data
 * @param {string} projectCode
 */
export const getOrgStructureData = (projectCode) => {
  return axios.get(
    `${BASE_URL}/GetComponentList/GetOrgStructureData`,
    {
      params: {
        projectCode
      }
    }
  );
};
