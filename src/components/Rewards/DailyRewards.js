// src/components/Rewards/DailyReward.jsx
import React, { useState, useEffect, useContext } from 'react';
import './DailyReward.css';
import { AuthContext } from '../../context/AuthContext';

const DailyReward = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [lastClaimDate, setLastClaimDate] = useState(localStorage.getItem('lastClaimDate') || '');
  const [streak, setStreak] = useState(parseInt(localStorage.getItem('streakCount')) || 0);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastClaimDate === today) {
      setIsClaimed(true);
    }
  }, [lastClaimDate]);

  const handleClaim = () => {
    const today = new Date().toDateString();
    if (lastClaimDate === today) return;

    let newStreak = streak;
    if (lastClaimDate) {
      const lastDate = new Date(lastClaimDate);
      const diffTime = Math.abs(new Date() - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    // Update wallet
    const newWallet = auth.user.wallet + 10; // Daily reward amount
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        wallet: newWallet,
      },
    });
    localStorage.setItem('wallet', newWallet);
    localStorage.setItem('lastClaimDate', today);
    localStorage.setItem('streakCount', newStreak);
    setStreak(newStreak);
    setLastClaimDate(today);
    setIsClaimed(true);

    alert('Daily reward claimed! +$10');
  };

  return (
    <div className="daily-reward">
      <h2>Daily Sign-In Bonus</h2>
      <button
        className={`claim-reward-btn ${isClaimed ? 'claimed' : ''}`}
        onClick={handleClaim}
        disabled={isClaimed}
      >
        {isClaimed ? 'Reward Claimed' : 'Claim Reward'}
      </button>
      <div className="streak-container">
        <span className="streak-text">Streak: {streak} {streak === 1 ? 'day' : 'days'}</span>
      </div>
    </div>
  );
};

export default DailyReward;

