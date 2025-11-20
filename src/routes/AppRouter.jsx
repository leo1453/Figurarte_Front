import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import About from "../views/About";
import Login from "../views/Login";
import Register from "../views/Register";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
