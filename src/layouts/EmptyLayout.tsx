import { Outlet } from "react-router-dom";
import "./layouts.css";

const EmptyLayout = () => {
  return (
    <main className="empty-layout">
      <Outlet />
    </main>
  );
};

export default EmptyLayout;
