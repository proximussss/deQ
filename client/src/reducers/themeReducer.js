import { TOGGLE_THEME } from "../actions/types";

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_THEME:
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", newDarkMode);
      return {
        ...state,
        darkMode: newDarkMode,
      };
    default:
      return state;
  }
}
