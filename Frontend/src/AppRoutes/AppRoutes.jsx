import { Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Home } from "../Pages/Home/Home";
import { Register } from "../Pages/Register/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
};
