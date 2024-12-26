import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <img src="https://abhinawa.labsyahrul.tech/assets/images/logos/abh-red.png" alt="Logo" className="h-12 w-12 mr-4" />
        <h1 className="text-3xl font-bold tracking-wide">Zabbix Monitoring</h1>
      </div>
    </header>
  );
};

export default Header;
