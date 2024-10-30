// src/components/Rewards/Rewards.js
// src/components/Rewards/Rewards.jsx
import React, { useState, useEffect, useContext } from 'react';
import DailyReward from './DailyReward';
import Badges from './Badges';
import RewardCard from './RewardCard';
import './Rewards.css'; // Create a specific CSS file for Rewards
import { AuthContext } from '../../context/AuthContext';

const Rewards = () => {
  const { auth } = useContext(AuthContext);
  const [rewards, setRewards] = useState([
    {
      id: 1,
      title: 'PLAY STATION 5',
      image: 'GS5.png', // Ensure images are in the public folder or imported
      price: 1500,
      isPurchased: false,
    },
    {
      id: 2,
      title: 'LOLLIES JAR',
      image: 'Candy.png',
      price: 500,
      isPurchased: false,
    },
    // Add more rewards as needed
  ]);

  // Load purchased rewards from localStorage
  useEffect(() => {
    const purchased = JSON.parse(localStorage.getItem('purchases')) || [];
    setRewards(prevRewards =>
      prevRewards.map(reward => ({
        ...reward,
        isPurchased: purchased.includes(reward.id),
      }))
    );
  }, []);

  const handlePurchase = (id) => {
    const selectedReward = rewards.find(reward => reward.id === id);
    if (!selectedReward) return;

    // Check if already purchased
    if (selectedReward.isPurchased) return;

    // Check if user has enough points (wallet)
    if (auth.user.wallet < selectedReward.price) {
      alert('Insufficient funds to make this purchase.');
      return;
    }

    // Confirm purchase
    if (window.confirm(`Are you sure you want to purchase ${selectedReward.title} for $${selectedReward.price}?`)) {
      // Deduct points
      const updatedWallet = auth.user.wallet - selectedReward.price;
      // Update Auth Context
      auth.setAuth({
        ...auth,
        user: {
          ...auth.user,
          wallet: updatedWallet,
        },
      });
      // Update localStorage
      localStorage.setItem('wallet', updatedWallet);
      // Update purchases
      const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
      purchases.push(id);
      localStorage.setItem('purchases', JSON.stringify(purchases));
      // Update state
      setRewards(prevRewards =>
        prevRewards.map(reward =>
          reward.id === id ? { ...reward, isPurchased: true } : reward
        )
      );
      alert('Purchase successful!');
    }
  };

  return (
    <div className="rewards-container">
      <DailyReward />
      <Badges />
      <div className="rewards-list">
        {rewards.map(reward => (
          <RewardCard key={reward.id} reward={reward} handlePurchase={handlePurchase} />
        ))}
      </div>
    </div>
  );
};

export default Rewards;

