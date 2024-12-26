import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HostList = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHosts = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://103.130.198.201/zabbix/api_jsonrpc.php",
          {
            jsonrpc: "2.0",
            method: "host.get",
            params: {
              output: ["hostid", "name"],
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
        setHosts(response.data.result);
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
      setLoading(false);
    };

    fetchHosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">Zabbix Host Monitoring</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {loading ? (
          <div className="text-center mt-10 text-gray-500 text-lg">Loading hosts...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {hosts.map((host) => (
              <Link
                to={`/host/${host.hostid}`}
                key={host.hostid}
                className="block bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold text-blue-600">{host.name}</h2>
                <p className="text-gray-500 text-sm">Host ID: {host.hostid}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HostList;
