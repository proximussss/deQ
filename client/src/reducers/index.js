import { combineReducers } from "redux";
import authReducer from "./authReducer";
import moduleReducer from "./moduleReducer";
import cardReducer from "./cardReducer";
import sessionReducer from "./sessionReducer";
import alertReducer from "./alertReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  auth: authReducer,
  module: moduleReducer,
  card: cardReducer,
  session: sessionReducer,
  alert: alertReducer,
  theme: themeReducer,
});
