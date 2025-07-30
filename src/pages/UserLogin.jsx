import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://localhost:7185/api/Token/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        localStorage.setItem("role", "User");
        setMessage("Giriş başarılı!");
        navigate("/userhub");
      } else {
        const err = await res.text();
        setMessage("Giriş başarısız: " + err);
      }
    } catch (error) {
      setMessage("Hata oluştu: " + error.message);
    }
  };

  return (
    <div>
      <h2>Kullanıcı Girişi</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserLogin;
