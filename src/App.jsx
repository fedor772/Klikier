import "./App.css";
import { useState } from "react";
import { FaHome, FaTasks, FaUserFriends, FaAddressCard } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);
  const [showPromo, setShowPromo] = useState(true);

  function handleClick() {
    if (strong > 0) {
      setCount(count + 1);
      setStrong(strong - 1);
    }
  }

  function rewardvideo() {
    setPage(1);
    setCount(count + 50);
    setShowPromo(false);
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
          <button onClick={handleClick} className="mainbutton">
            rc
          </button>
        </div>
      )}
      {page === 1 && (
        <div className="tasks-page">
          <header>Ваши задания</header>
          <ul>
            {showPromo && (<li id="promovideo">
              Посмотреть промо ролик (награда 50 кликов) {" "}
              <Button onClick={() => setPage(4)} className="taskbutton">
                Выполнить
              </Button>
            </li>)}
            <li>Пригласить одного друга</li>
            <li>Пригласить 5 друзей</li>
          </ul>
        </div>
      )}
      <style type="text/css">
        {`
    ul {
      padding: 0px;
    }
    `}
      </style>
      {page === 2 && <div className="friends-page">Страница друзей</div>}
      {page === 3 && <div className="profile-page">Страница профиля</div>}
      {page === 4 && (
        <div className="promo-page">
          <div class="myvideo">
            <iframe src="/Klikier/public/promo.mp4" className="video"></iframe>
          </div>
          <Button onClick={rewardvideo}>Получить награду</Button>
        </div>
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
