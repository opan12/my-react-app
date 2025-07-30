import { Navigate } from "react-router-dom";

function AdminHub() {
  const role = localStorage.getItem("role");
  if (role !== "Admin") return <Navigate to="/adminlogin" replace />;
  return <div>Admin Paneli İçeriği</div>;
}

export default AdminHub;
