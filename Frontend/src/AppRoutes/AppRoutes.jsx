import { Routes, Route } from "react-router-dom";
import { Login } from "../UserAuth/Login/Login";
import { Home } from "../Pages/Home/Home";
import { Register } from "../UserAuth/Register/Register";
import { UserPanel } from "../UserAuth/UserPanel/UserPanel";
import { Contacts } from "../Pages/Contacts/Contacts";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/UserPanel" element={<UserPanel />} />
      <Route path="/Contactos" element={<Contacts />} />
    </Routes>
  );
};
