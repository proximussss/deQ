import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from './theme/ThemeProvider';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ModuleSelect from './components/modules/ModuleSelect';
import FlashcardModule from './components/flashcards/FlashcardModule';
import SessionLogs from './components/sessions/SessionLogs';
import PrivateRoute from './components/routing/PrivateRoute';

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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/modules" component={ModuleSelect} />
              <PrivateRoute exact path="/module/:moduleName" component={FlashcardModule} />
              <PrivateRoute exact path="/sessions" component={SessionLogs} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;