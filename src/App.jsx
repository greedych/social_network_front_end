import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import User from "./pages/user";
import SideBar from "./components/sideBar";
import MainLayout from "./layout/mainLayout";
import AuthLayout from "./layout/authLayout";
import EditUser from "./pages/editUser";
import Explore from "./pages/explore";
import Main from "./pages/main";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="user/edit" element={<EditUser />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
