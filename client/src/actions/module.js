import axios from "axios";
import { GET_MODULES, MODULE_ERROR, GET_MODULE_STATS } from "./types";
import { setAlert } from "./alert";

// Get all modules
export const getModules = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/modules");

    dispatch({
      type: GET_MODULES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: err.response?.data.msg || "Error loading modules",
    });
  }
};

// Get module stats
export const getModuleStats = (moduleName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/modules/${moduleName}/stats`);

    dispatch({
      type: GET_MODULE_STATS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MODULE_ERROR,
      payload: err.response?.data.msg || "Error loading module stats",
    });
  }
};
