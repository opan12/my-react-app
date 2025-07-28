import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  try {
    const res = await fetch("https://localhost:7185/api/Token/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <-- burada cookie için önemli
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    });

      if (res.ok) {
        setMessage("Giriş başarılı!");
        navigate("/userhub"); // yönlendirme burası

      } else {
        const errorText = await res.text();
        setMessage("Giriş başarısız: " + errorText);
      }
    } catch (err) {
      setMessage("Hata oluştu: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Giriş Yap</h2>
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
        />
        <button type="submit" style={styles.button}>
          Giriş Yap
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

export default Login;
