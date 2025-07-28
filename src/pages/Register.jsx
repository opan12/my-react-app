import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    ad: "",
    soyad: "",
    TCKimlikNO: "",
    dogumtarihi: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7185/api/Token/kayitolustur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (res.ok) {
        setMessage("✅ Kayıt başarılı, lütfen mailinizi kontrol edin.");
        navigate("/userhub"); // yönlendirme burası

      } else {
        const errorData = await res.json();
        setMessage("❌ Kayıt başarısız: " + JSON.stringify(errorData));
      }
    } catch (err) {
      setMessage("⚠️ Hata oluştu: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Ad"
          value={registerData.ad}
          onChange={(e) => setRegisterData({ ...registerData, ad: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Soyad"
          value={registerData.soyad}
          onChange={(e) => setRegisterData({ ...registerData, soyad: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="TCKimlik NO "
          value={registerData.TCKimlikNO}
          onChange={(e) => setRegisterData({ ...registerData, TCKimlikNO: e.target.value })}
          required
          maxLength={11}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Doğum Tarihi"
          value={registerData.dogumtarihi}
          onChange={(e) => setRegisterData({ ...registerData, dogumtarihi: e.target.value })}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Kayıt Ol
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
    backgroundColor: "#2196f3",
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

export default Register;
