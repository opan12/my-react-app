import React, { useEffect, useState } from "react";

const LogList = () => {
  const [logs, setLogs] = useState([]);
 useEffect(() => {
    fetch("https://localhost:7185/api/Log/logkayit")
    .then(response => response.json())
    .then(data => setLogs(data))
    .catch(error => console.error("Error fetching logs:", error));
 }, []);

 return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Log Listesi</h1>
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Tarih</th>
                    <th className="border border-gray-300 p-2">Kullanıcı</th>

                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td className="border border-gray-300 p-2">{log.id}</td>
                        <td className="border border-gray-300 p-2">{log.tarih}</td>
                        <td className="border border-gray-300 p-2">{log.kullanici}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};
export default LogList;