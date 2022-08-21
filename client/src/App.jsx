import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/Alert";
import ComponentRoutes from "./components/routes/ComponentRoutes";
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
        <ComponentRoutes />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
