// src/components/Rewards/Badges.jsx
import React, { useState, useEffect } from 'react';
import './Badges.css';

const Badges = () => {
  const [badges, setBadges] = useState([
    { id: 1, name: 'First Step', image: 'badge1.png', earned: false },
    { id: 2, name: 'Streaker', image: 'badge2.png', earned: false },
    { id: 3, name: 'Champion', image: 'badge3.png', earned: false },
    // Add more badges as needed
  ]);

  useEffect(() => {
    const streak = parseInt(localStorage.getItem('streakCount')) || 0;
    const updatedBadges = badges.map(badge => {
      if (badge.id === 1) {
        return { ...badge, earned: true }; // First Step badge earned by default
      }
      if (badge.id === 2 && streak >= 5) { // Example: Streak of 5 days
        return { ...badge, earned: true };
      }
      if (badge.id === 3 && streak >= 10) { // Example: Streak of 10 days
        return { ...badge, earned: true };
      }
      return badge;
    });
    setBadges(updatedBadges);
  }, []);

  return (
    <div className="badges-section">
      <h2>Your Badges</h2>
      <div className="badges-list">
        {badges.map(badge => (
          <div key={badge.id} className={`badge ${badge.earned ? 'earned' : ''}`}>
            <img src={badge.image} alt={badge.name} />
            <span>{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;

