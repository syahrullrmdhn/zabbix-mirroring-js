import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SensorList from './SensorList'; // Pastikan path yang benar
import ProblemList from './ProblemList'; // Pastikan path yang benar

const HostDetails = () => {
  const { hostid } = useParams();
  const [sensors, setSensors] = useState([]);
  const [problems, setProblems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [error, setError] = useState(null);

  const formatSeverity = (severity) => {
    const severityMap = {
      "0": "Not Classified",
      "1": "Information",
      "2": "Warning",
      "3": "Average",
      "4": "High",
      "5": "Disaster",
    };
    return severityMap[severity] || "Unknown";
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchHostDetails = async () => {
      setLoadingSensors(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://103.130.198.201/zabbix/api_jsonrpc.php",
          {
            jsonrpc: "2.0",
            method: "item.get",
            params: {
              output: ["itemid", "name", "lastvalue", "units", "hostid"],
              filter: { hostid },
              monitored: true,
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
        setSensors(response.data.result || []);
      } catch (error) {
        console.error("Error fetching host details:", error);
        setError("Failed to fetch host details.");
      }
      setLoadingSensors(false);
    };

    const fetchHostProblems = async () => {
      setLoadingProblems(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://103.130.198.201/zabbix/api_jsonrpc.php",
          {
            jsonrpc: "2.0",
            method: "problem.get",
            params: {
              output: ["eventid", "severity", "acknowledged", "name", "clock"],
              selectAcknowledges: "extend",
              selectHosts: ["host"],
              filter: { hostids: hostid },
              recent: true,
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
        setProblems(response.data.result || []);
      } catch (error) {
        console.error("Error fetching host problems:", error);
        setError("Failed to fetch host problems.");
      }
      setLoadingProblems(false);
    };

    const fetchHostAlerts = async () => {
      setLoadingAlerts(true);
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
      setLoadingAlerts(false);
    };

    fetchHostDetails();
    fetchHostProblems();
    fetchHostAlerts();
  }, [hostid]);

  // AlertList component
  const AlertList = () => {
    if (loadingAlerts) {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-semibold hover:underline">
            Back to Hosts
          </Link>
          <h1 className="text-2xl font-bold">Host Details</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {error && <div className="text-red-500">{error}</div>}
        
        <SensorList sensors={sensors} loading={loadingSensors} error={error} />
        <ProblemList problems={problems} loading={loadingProblems} formatTime={formatTime} formatSeverity={formatSeverity} />
        <AlertList /> {/* Menampilkan AlertList di sini */}
      </main>
    </div>
  );
};

export default HostDetails;