import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertList = ({ hostid }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://103.130.198.201/zabbix/api_jsonrpc.php",
          {
            jsonrpc: "2.0",
            method: "alert.get",
            params: {
              output: [
                "alertid",
                "actionid",
                "alerttype",
                "clock",
                "error",
                "esc_step",
                "eventid",
                "mediatypeid",
                "message",
                "retries",
                "sendto",
                "status",
                "subject",
                "userid",
                "p_eventid",
                "acknowledgeid"
              ],
              filter: {
                hostid: hostid // Filter berdasarkan hostid jika diperlukan
              },
              sortfield: "clock",
              sortorder: "DESC"
            },
            auth: "958cf12154c9ec038ec4e985122398ce11488304b035ab4a0359b4bb98100ccd",
            id: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setAlerts(response.data.result || []);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setError("Failed to fetch alerts.");
      }
      setLoading(false);
    };

    fetchAlerts();
  }, [hostid]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500 text-lg">Loading alerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Alerts</h2>
      {Array.isArray(alerts) && alerts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2">Alert ID</th>
                <th className="px-4 py-2">Action ID</th>
                <th className="px-4 py-2">Alert Type</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Send To</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.alertid} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{alert.alertid}</td>
                  <td className="px-4 py-2 border-b">{alert.actionid}</td>
                  <td className="px-4 py-2 border-b">{alert.alerttype}</td>
                  <td className="px-4 py-2 border-b">{new Date(alert.clock * 1000).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">{alert.message || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{alert.status || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{alert.sendto || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No alerts found for this host.</p>
      )}
    </section>
  );
};

export default AlertList;