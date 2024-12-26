import axios from "axios";

const API_URL = "http://103.130.198.201/zabbix/api_jsonrpc.php";
const API_TOKEN = "958cf12154c9ec038ec4e985122398ce11488304b035ab4a0359b4bb98100ccd";

// Fetch hosts
export const fetchHosts = async () => {
  const response = await axios.post(API_URL, {
    jsonrpc: "2.0",
    method: "host.get",
    params: {
      output: ["hostid", "name"], // Get host ID and name
    },
    auth: API_TOKEN,
    id: 1,
  });
  return response.data.result;
};

// Fetch items for a given host
export const fetchItems = async (hostid) => {
  const response = await axios.post(API_URL, {
    jsonrpc: "2.0",
    method: "item.get",
    params: {
      hostids: hostid,
      output: ["itemid", "name", "status", "lastclock"], // Include lastclock
    },
    auth: API_TOKEN,
    id: 1,
  });
  return response.data.result;
};

// Fetch history of a specific item
export const fetchHistory = async (itemid) => {
  const response = await axios.post(API_URL, {
    jsonrpc: "2.0",
    method: "history.get",
    params: {
      itemids: itemid,
      output: ["clock", "value"], // Get timestamp and value
      limit: 10, // Limit to the last 10 records
      sortfield: "clock",
      sortorder: "DESC", // Sort descending by time
    },
    auth: API_TOKEN,
    id: 1,
  });
  return response.data.result;
};
