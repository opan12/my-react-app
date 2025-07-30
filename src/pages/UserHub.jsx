import { Navigate } from "react-router-dom";

function UserHub() {
  const role = localStorage.getItem("role");
  if (role !== "User") return <Navigate to="/userlogin" replace />;
  return <div>Kullanıcı Paneli İçeriği</div>;
}

export default UserHub;
