import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import MusteriForm from "./pages/MusteriForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Liste from "./pages/Liste";
import AdminListesi from "./pages/AdminListesi";
import LogList from "./pages/LogList";
import AdminHub from "./pages/AdminHub";
import UserHub from "./pages/UserHub";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  // Rol bilgisini basitçe localStorage'dan alıyoruz, backend session/cookie ile yapabilirsin
  const role = localStorage.getItem("role"); // "admin" veya "user"

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Navbar sadece giriş/üye sayfası harici gösterilsin */}
      {!isAuthPage && role === "Admin" && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/adminhub">
              Admin Paneli
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/adminliste" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                    Başvuru Listesi
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/loglist" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                    Log Listesi
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {!isAuthPage && role === "User" && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/userhub">
              Kullanıcı Paneli
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/liste" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                    Liste
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/form" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                    Başvuru Formu
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-grow-1 overflow-auto container py-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin rotaları */}
          {role === "Admin" && (
            <>
              <Route path="/adminhub" element={<AdminHub />} />
              <Route path="/adminliste" element={<AdminListesi />} />
              <Route path="/loglist" element={<LogList />} />
            </>
          )}

          {/* User rotaları */}
          {role === "User" && (
            <>
              <Route path="/userhub" element={<UserHub />} />
              <Route path="/liste" element={<Liste />} />
              <Route path="/form" element={<MusteriForm />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
