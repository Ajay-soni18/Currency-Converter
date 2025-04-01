import React from "react";
import { RefreshCw } from "lucide-react";

function Header({ onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Currency Converter</h1>
      <button
        onClick={onRefresh}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Refresh rates"
      >
        <RefreshCw className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

export default Header;
