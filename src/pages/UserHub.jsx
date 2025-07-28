import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MusteriForm from "./pages/MusteriForm";
import Liste from "./pages/Liste";

function UserHub() {
  return (
    <div className="d-flex flex-column vh-100" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/userhub/form">Kullanıcı Paneli</NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/userhub/form"
                  className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}
                >
                  Başvuru Formu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/userhub/liste"
                  className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}
                >
                  Başvurularım
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 overflow-auto container py-3">
        <Routes>
          <Route path="form" element={<MusteriForm />} />
          <Route path="liste" element={<Liste />} />
          <Route path="*" element={<p>Sayfa bulunamadı.</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default UserHub;
