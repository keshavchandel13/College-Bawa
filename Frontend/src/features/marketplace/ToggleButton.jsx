import React from "react";
export default function ToggleButtons({ showForm, handleBuyClick, handleSellClick }) {
  return (
    <div className="button-group">
      <button className={!showForm ? 'active' : ''} onClick={handleBuyClick}>Buy</button>
      <button className={showForm ? 'active' : ''} onClick={handleSellClick}>Sell</button>
    </div>
  );
}
