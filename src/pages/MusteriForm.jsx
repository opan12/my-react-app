import { useState } from "react";

function MusteriForm() {
  const [formData, setFormData] = useState({
    basvurutipi: "",
  });

  const [hatalar, setHatalar] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7185/api/User/musteriform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // session cookie için önemli
        body: JSON.stringify({
          basvurutipi: Number(formData.basvurutipi),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setHatalar(errorData.errors || {});
        return;
      }

      const data = await res.json();
      console.log("Başarılı:", data);
      setHatalar({});
    } catch (error) {
      console.error("İstek hatası:", error);
      alert("Sunucu hatası oluştu.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Müşteri Başvuru Formu</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Müşteri No input kaldırıldı */}

            {/* Başvuru Tipi */}
            <div className="mb-3">
              <label className="form-label">Başvuru Tipi</label>
              <input
                type="number"
                className={`form-control ${hatalar.Basvurutipi ? "is-invalid" : ""}`}
                placeholder="Başvuru Tipi"
                value={formData.basvurutipi}
                onChange={(e) => setFormData({ basvurutipi: e.target.value })}
                required
              />
              {hatalar.Basvurutipi && (
                <div className="invalid-feedback">{hatalar.Basvurutipi.join(", ")}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MusteriForm;
