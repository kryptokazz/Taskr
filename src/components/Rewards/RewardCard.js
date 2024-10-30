// src/components/Rewards/RewardCard.jsx
import React from 'react';
import './RewardCard.css';

const RewardCard = ({ reward, handlePurchase }) => {
  return (
    <div className="reward-card">
      <img src={reward.image} alt={reward.title} className="reward-image" />
      <h2>{reward.title}</h2>
      <div className="price-container">
        <span className="price">${reward.price}</span>
        <button
          className={`buy-btn ${reward.isPurchased ? 'pending-btn' : 'buy-btn'}`}
          onClick={() => handlePurchase(reward.id)}
          disabled={reward.isPurchased}
        >
          {reward.isPurchased ? 'PENDING' : 'BUY'}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;

