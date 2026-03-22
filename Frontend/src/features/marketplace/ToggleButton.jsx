import React from "react";
export default function ToggleButtons({ showForm, handleBuyClick, handleSellClick }) {
  return (
    <div className="flex justify-center gap-3 mb-6">
      <button
        onClick={handleBuyClick}
        className={`px-4 py-2 rounded-full text-sm ${
          !showForm ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        Buy
      </button>

      <button
        onClick={handleSellClick}
        className={`px-4 py-2 rounded-full text-sm ${
          showForm ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        Sell
      </button>
    </div>
  );
}