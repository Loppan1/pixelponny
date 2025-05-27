import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/Login/Login";
import EmptyLayout from "./layouts/EmptyLayout";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import HorsePage from "./pages/HorsePage";
import Stables from "./components/Stables/Stables";
import StablePage from "./pages/StablePage";
import MyStablesPage from "./pages/MyStablesPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/horse/:id" element={<HorsePage />} />
        <Route path="/stables" element={<Stables />} />
        <Route path="/stables/:name" element={<StablePage />} />
        <Route path="/mystables" element={<MyStablesPage />} />
      </Route>
      <Route element={<EmptyLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/secret/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
