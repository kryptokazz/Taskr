// src/components/Habits/HabitList.js
import React, { useState, useEffect } from 'react';
import HabitItem from './HabitItem';
import HabitForm from './HabitForm';

const HabitList = () => {
  // Initialize with dummy data
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: 'Drink Water',
      reward: 10,
      compulsory: true,
      approved: true,
      completed: false,
    },
    {
      id: 2,
      title: 'Exercise',
      reward: 20,
      compulsory: false,
      approved: true,
      completed: false,
    },
  ]);

  const addHabit = habit => setHabits([...habits, { ...habit, id: habits.length + 1 }]);

  const updateHabit = updatedHabit => {
    setHabits(habits.map(habit => (habit.id === updatedHabit.id ? updatedHabit : habit)));
  };

  return (
    <div>
      <HabitForm addHabit={addHabit} />
      <div className="habit-list">
        {habits.map(habit => (
          <HabitItem key={habit.id} habit={habit} updateHabit={updateHabit} />
        ))}
      </div>
    </div>
  );
};

export default HabitList;

