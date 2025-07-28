import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://localhost:7185/api/Admin/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie için önemli
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        setMessage("Giriş başarılı!");
        navigate("/adminhub"); // yönlendirme
      } else {
        const errorText = await res.text();
        setMessage("Giriş başarısız: " + errorText);
      }
    } catch (err) {
      setMessage("Hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
          required
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "100px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #aaa",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  message: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    fontWeight: "bold",
  },
};

export default AdminLogin;
