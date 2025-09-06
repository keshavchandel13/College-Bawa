import React from "react";

export default function ToggleButtons({ showForm, handleBuyClick, handleSellClick }) {
  return (
    <div className="button-group">
      <button 
        type="button" 
        className={!showForm ? 'active' : ''} 
        onClick={handleBuyClick}
      >
        Buy
      </button>
      <button 
        type="button" 
        className={showForm ? 'active' : ''} 
        onClick={handleSellClick}
      >
        Sell
      </button>
    </div>
  );
}
