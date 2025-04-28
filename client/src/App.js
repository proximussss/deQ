import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./theme/ThemeProvider";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Components
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ModuleSelect from "./components/modules/ModuleSelect";
import FlashcardModule from "./components/flashcards/FlashcardModule";
import SessionLogs from "./components/sessions/SessionLogs";
import PrivateRoute from "./components/routing/PrivateRoute";

// Check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/modules"
                element={<PrivateRoute component={ModuleSelect} />}
              />
              <Route
                path="/module/:moduleName"
                element={<PrivateRoute component={FlashcardModule} />}
              />
              <Route
                path="/sessions"
                element={<PrivateRoute component={SessionLogs} />}
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
