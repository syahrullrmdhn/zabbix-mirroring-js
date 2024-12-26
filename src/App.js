import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HostList from "./components/HostList";
import HostDetails from "./components/HostDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostList />} />
        <Route path="/host/:hostid" element={<HostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
