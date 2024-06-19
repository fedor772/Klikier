import './App.css'
import { useState } from 'react';
import { FaHome, FaTasks, FaUserFriends, FaAddressCard } from "react-icons/fa";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);

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
        <span>
          <FaHome />
          <span className="label">Главная</span>
        </span>
        <span>
          <FaTasks />
          <span className="label">Задания</span>
        </span>
        <span>
          <FaUserFriends />
          <span className="label">Друзья</span>
        </span>
        <span>
          <FaAddressCard />
          <span className="label">Профиль</span>
        </span>
      </nav>
    </main>
  )
}