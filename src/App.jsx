import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTasks,
  FaUserFriends,
  FaAddressCard,
  FaEdit,
} from "react-icons/fa";
import { Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(100);
  const [page, setPage] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-youname"]);
  const [youname, setYouname] = useState("Анонимный пользователь");
  const [uid, setUid] = useState(0);
  const [open, setOpen] = useState(false);
  const servers = [
    "http://127.0.0.1:5000/",
    "https://6686c937-9050-4808-96d6-19b9b52146ce-00-2c4r1o8l4s6ez.sisko.replit.dev:5000/",
  ];

  let server;
  if (servers[0].includes(window.location.hostname)) {
    server = servers[0];
  } else {
    server = servers[1];
  }

  useEffect(() => {
    if (cookies.count) {
      setCount(cookies.count + 1);
      setUid(cookies.uid ? cookies.uid : 0);
    } else {
      confsUid();
    }
    setStrong(cookies.strong ? cookies.strong - 1 : 100);
    setYouname(cookies.youname ? cookies.youname : "Анонимный пользователь");
  }, []);

  useEffect(() => {
    console.log(uid);
    if (!cookies.count && uid !== 0) {
      setCount(0);
      confUid(uid);
    }
  }, [uid]);

  async function getUid() {
    try {
      const response = await axios.get(server);
      setOpen(true);
      return response.data;
    } catch (error) {
      removeCookie("uid");
      setOpen(false);
      return error;
    }
  }

  function confUid(auid) {
    axios.post(`${server}setuid/${parseInt(auid) + 1}`).then((response) => {
      console.log(auid);
      console.log(response.data);
    });
  }

  function confsUid() {
    getUid().then((result) => {
      setCookie("uid", result);
      setUid(result);
    });
  }

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
          <img
            src="/Klikier/coin.png"
            onClick={handleClick}
            className="mainbutton"
          />
        </div>
      )}
      {page === 1 && (
        <div className="tasks-page">
          <h2 className="taskheader">Ваши задания</h2>
          <div className="divader"></div>
          <ul>
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
            {open && <div>Ваш uid: {uid}</div>}
            {!open && (
              <Alert variant="danger">
                Внимание! В данный момент отключена серверная часть приложения!
                Но при этом вы всё равно можете продолжать пользоваться. Если
                это вызвало какие-то сбои, то пишите нам в поддержку, которая есть в нашем боте
              </Alert>
            )}
          </div>
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
