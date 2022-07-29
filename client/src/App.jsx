import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Landing, Footer, Register, Login } from "./components";

import "./scss/style.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
