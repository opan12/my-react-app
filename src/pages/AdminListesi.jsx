import React, { useEffect, useState } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const AdminListesi = () => {
  const [musteriler, setMusteriler] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get("https://localhost:7185/api/Admin/musteriliste")
      .then((response) => {
        setMusteriler(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri alınırken hata oluştu:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7185/notificationHub") // Hub url'ini doğru yaz
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("SignalR bağlantısı kuruldu"))
      .catch((e) => console.log("SignalR bağlantı hatası:", e));

    connection.on("VeriGuncellendi", () => {
      fetchData(); // Veri güncellendiğinde tekrar yükle
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Müşteri Başvuruları</h2>
      {loading ? (
        <p>Yükleniyor...</p>
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
              <th>Kayıt Zaman</th>
              <th>Kayıt Yapan</th>
              <th>Kayıt Durum</th>
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
                <td>{item.kayit_Zaman}</td>
                <td>{item.kayit_Yapan}</td>
                <td>{item.kayit_Durum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminListesi;
