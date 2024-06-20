import "./App.css";
import { useState } from "react";
import { FaHome, FaTasks, FaUserFriends, FaAddressCard } from "react-icons/fa";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);

  function handleClick() {
    if (strong > 0) {
      setCount(count + 1);
      setStrong(strong - 1);
    }
  }

  return (
    <main>
      {page === 0 && (
        <div className="home-page">
          <div className="stats">
            <span>
              Ваши клики <br /> {count}
            </span>
            <span>
              Ваша сила <br /> {strong}
            </span>
          </div>
          <button onClick={handleClick}>rc</button>
        </div>
      )}
      {page === 1 && <div className="tasks-page">Страница заданий</div>}
      {page === 2 && (
        <div className="friends-page">Страница друзей</div>
      )}
      {page === 3 && (
        <div className="profile-page">Страница профиля</div>
      )}
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
  );
}
