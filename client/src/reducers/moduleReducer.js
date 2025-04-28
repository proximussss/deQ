import { GET_MODULES, MODULE_ERROR, GET_MODULE_STATS } from "../actions/types";

const initialState = {
  modules: [],
  currentModule: null,
  stats: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MODULES:
      return {
        ...state,
        modules: payload,
        loading: false,
      };
    case GET_MODULE_STATS:
      return {
        ...state,
        stats: payload,
        loading: false,
      };
    case MODULE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
