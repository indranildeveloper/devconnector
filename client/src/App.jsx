import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Landing,
  Footer,
  Register,
  Login,
  Alert,
  Dashboard,
  PrivateRoute,
} from "./components";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import "./scss/style.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={<PrivateRoute component={<Dashboard />} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
