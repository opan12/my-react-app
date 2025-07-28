import React, { useEffect, useState } from "react";
import axios from "axios";

const Liste = () => {
  const [musteriler, setMusteriler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hata, setHata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHata("");
      try {
        // Artık MusteriNo header’ı yok, sadece withCredentials ekliyoruz
        const response = await axios.get(
          "https://localhost:7185/api/User/kisiselliste",
          {
            withCredentials: true, // <-- çok önemli!
          }
        );
        setMusteriler(response.data);
      } catch (error) {
        setHata("Sonuç alınamadı: " + (error.response?.data || "Sunucu hatası"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Müşteri Başvuruları</h2>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : hata ? (
        <p style={{ color: "red" }}>{hata}</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Müşteri No</th>
              <th>Başvuru Durumu</th>
              <th>Başvuru Tipi</th>
              <th>Başvuru Tarihi</th>
              <th>Hata Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {musteriler.map((item, index) => (
              <tr key={index}>
                <td>{item.musteriNo}</td>
                <td>{item.basvuruDurum}</td>
                <td>{item.basvurutipi}</td>
                <td>{item.basvuruTarihi}</td>
                <td>{item.hataAciklama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Liste;
