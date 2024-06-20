import './App.css'
import { useState, useEffect } from 'react';
import { FaHome, FaTasks, FaUserFriends, FaAddressCard } from "react-icons/fa";
import React from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);
  useEffect(() => {
    console.log('Page была изменена:', page);
  }, [page]); 

  function handleClick() {
    if (strong > 0) {
      setCount(count + 1);
      setStrong(strong - 1);
    }
  }
  
  return (
    <main>
      <div className="stats">
        <span>Ваши клики <br /> {count}</span>
        <span>Ваша сила <br /> {strong}</span>
      </div>
      <button onClick={handleClick}>rc</button>
      <nav>
        <span onClick={() => setPage(0)}>
          <FaHome />
          <span className="label">Главная</span>
        </span>
        <span onClick={() => setPage(1)}>
          <FaTasks />
          <span className="label">Задания</span>
        </span>
        <span onClick={() => setPage(2)}>
          <FaUserFriends />
          <span className="label">Друзья</span>
        </span>
        <span onClick={() => setPage(3)}>
          <FaAddressCard />
          <span className="label">Профиль</span>
        </span>
      </nav>
    </main>
  )
}