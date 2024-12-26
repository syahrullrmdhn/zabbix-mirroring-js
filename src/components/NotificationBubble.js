import React from "react";

const NotificationBubble = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center space-x-4">
      <span className="font-semibold">{message}</span>
      <button
        className="text-white hover:text-gray-200 transition"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default NotificationBubble;
