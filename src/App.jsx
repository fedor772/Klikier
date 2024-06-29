import "./App.css";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaTasks,
  FaUserFriends,
  FaAddressCard,
  FaEdit,
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-youname"]);
  const [youname, setYouname] = useState("Анонимный пользователь");
  const server = "http://127.0.0.1:5000/";

  useEffect(() => {
    setCount(cookies.count ? cookies.count + 1 : confUid());
    setStrong(cookies.strong ? cookies.strong - 1 : 100);
    setShowPromo(cookies.showPromo);
    setYouname(cookies.youname ? cookies.youname : "Анонимный пользователь");
  }, []);

  async function getUid() {
    try {
      const response = await axios.get(server);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  function confUid() {
    return 0;
  }

  getUid().then((result) => {
    console.log(result);
  });

  useEffect(() => {
    const strongInterval = setInterval(() => {
      if (strong < 100) {
        setStrong((prevStrong) => prevStrong + 1);
      }
    }, 10000); 
    return () => clearInterval(strongInterval);
  }, [strong]);

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

  function asksave() {
    let localname = prompt("Введите своё имя");
    setYouname(localname);
    setCookie("youname", localname);
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
          <img src="/Klikier/coin.png" onClick={handleClick} className="mainbutton" />
        </div>
      )}
      {page === 1 && (
        <div className="tasks-page">
          <h2 className="taskheader">Ваши задания</h2>
          <div className="divader"></div>
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
            <h2 className="youname">{youname}</h2>
            <Button onClick={asksave}>
              Изменить <FaEdit />
            </Button>
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
          {page === 0 && <div className="primary"></div>}
        </span>
        <span onClick={() => setPage(1)}>
          <FaTasks />
          <span className="label">Задания</span>
          {page === 1 && <div className="primary"></div>}
        </span>
        <span onClick={() => setPage(2)}>
          <FaUserFriends />
          <span className="label">Друзья</span>
          {page === 2 && <div className="primary"></div>}
        </span>
        <span onClick={() => setPage(3)}>
          <FaAddressCard />
          <span className="label">Профиль</span>
          {page === 3 && <div className="primary"></div>}
        </span>
      </nav>
    </main>
  );
}
