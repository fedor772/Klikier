import "./App.css";
import { useState, useEffect } from "react";
import { FaHome, FaTasks, FaUserFriends, FaAddressCard } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (cookies.count) {
      setCount(cookies.count + 1);
    }
    if (cookies.strong) {
      setStrong(cookies.strong - 1);
    }
    setShowPromo(cookies.showPromo);
  }, []);

  function handleClick() {
    if (strong > 0) {
      setCount(count + 1);
      setStrong(strong - 1);
      setCookie("count", count);
      setCookie("strong", strong);
    }
  }

  function rewardvideo() {
    setPage(1);
    setCount(count + 50);
    setCookie("count", count + 49);
    setShowPromo(false);
    setCookie("showPromo", false);
  }

  function Stats() {
    return (
      <div className="stats">
        <span>
          Ваши клики <br /> {count}
        </span>
        <span>
          Ваша сила <br /> {strong}
        </span>
      </div>
    );
  }

  return (
    <main>
      {page === 0 && (
        <div className="home-page">
          <Stats />
          <button onClick={handleClick} className="mainbutton">
            rc
          </button>
        </div>
      )}
      {page === 1 && (
        <div className="tasks-page">
          <header>Ваши задания</header>
          <ul>
            {showPromo && (
              <li id="promovideo">
                Посмотреть промо ролик (награда 50 кликов){" "}
                <Button onClick={() => setPage(4)} className="taskbutton">
                  Выполнить
                </Button>
              </li>
            )}
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
      {page === 3 && (
        <div className="profile-page">
          <div className="container">
            <img src="/Klikier/person.png" className="photo" />
            <h2>Анонимный пользователь</h2>
            <Stats />
          </div>
        </div>
      )}
      {page === 4 && (
        <div className="promo-page">
          <div class="myvideo">
            <iframe src="/Klikier/promo.mp4" className="video"></iframe>
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
