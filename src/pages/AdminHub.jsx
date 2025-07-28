import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import AdminListesi from "./AdminListesi";
import LogList from "./LogList";


function AdminHub() {
  return (
    <div className="d-flex flex-column vh-100" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/adminhub/adminliste">Admin Paneli</NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/adminhub/adminliste"
                  className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}
                >
                  Başvuru Listesi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adminhub/loglist"
                  className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}
                >
                  Log Listesi
                </NavLink>
              </li>
              {/* İstersen başka admin sayfaları buraya ekle */}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 overflow-auto container py-3">
        <Routes>
          <Route path="adminliste" element={<AdminListesi />} />
          <Route path="loglist" element={<LogList />} />
          <Route path="*" element={<p>Sayfa bulunamadı.</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminHub;
