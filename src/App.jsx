import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTasks,
  FaUserFriends,
  FaAddressCard,
  FaEdit,
  FaRegWindowClose,
} from "react-icons/fa";
import { Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { snackbar } from "mdui/functions/snackbar.js";
import "mdui/mdui.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(200);
  const [page, setPage] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-youname"]);
  const [youname, setYouname] = useState("Анонимный пользователь");
  const [uid, setUid] = useState(0);
  const [open, setOpen] = useState(true);
  const [offchan, setOffchan] = useState(false);
  const [dsserv, setDsserv] = useState(false);
  const [doptg, setDoptg] = useState(false);
  const [phand, setPhand] = useState(false);
  const [pfhand, setPfhand] = useState(false);
  const [pffhand, setPffhand] = useState(false);
  const server =
    "https://6686c937-9050-4808-96d6-19b9b52146ce-00-2c4r1o8l4s6ez.sisko.replit.dev:5000/";

  useEffect(() => {
    if (cookies.count) {
      setCount(cookies.count + 1);
      setUid(cookies.uid ? cookies.uid : 0);
    } else {
      confsUid();
    }
    setStrong(cookies.strong ? cookies.strong - 1 : 200);
    setYouname(cookies.youname ? cookies.youname : "Анонимный пользователь");
    setOffchan(cookies.offchan);
    setDsserv(cookies.dsserv);
    setDoptg(cookies.doptg);
    setPhand(cookies.phand);
    setPfhand(cookies.pfhand);
    setPffhand(cookies.pffhand);
  }, []);

  useEffect(() => {
    const data = {
      uid: uid,
      count: count,
      strong: strong,
      youname: youname,
    };
    axios
      .post(`${server}addinfo`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [count, strong, youname]);

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
      setUid(result);
      if (open) {
        setCookie("uid", result);
      }
    });
  }

  useEffect(() => {
    const strongInterval = setInterval(() => {
      if (strong < 200) {
        setStrong((prevStrong) => prevStrong + 1);
        setCookie("strong", strong);
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
    } else {
      snackbar({ message: "Недостаточно силы" });
    }
  }

  function asksave() {
    let localname = prompt("Введите своё имя");
    setYouname(localname);
    setCookie("youname", localname);
  }

  function reset() {
    let confirmname = prompt("Введите имя, которое у вас указано в профиле");
    if (confirmname == youname) {
      removeCookie("uid");
      removeCookie("count");
      removeCookie("strong");
      removeCookie("youname");
      removeCookie("offchan");
      removeCookie("dsserv");
      removeCookie("doptg");
      removeCookie("phand");
      removeCookie("pfhand");
      removeCookie("pffhand");
      window.location.reload();
    }
  }

  function subscribe(times, url) {
    setCookie("count", count + times);
    window.location = url;
  }

  function taskup(hand, times, needs) {
    if (count >= needs) {
      setCookie(hand, true);
      window.location.reload();
      subscribe(times, "");
    } else {
      snackbar({ message: "Недостаточно кликов для получения награды" });
    }
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
          <h2 style={{ margin: 10 + "px" }}>Ваши задания</h2>
          <div className="divader"></div>
          <ul>
            <li>
              Подписаться на наш официальный канал (награда – 50 кликов){" "}
              {!offchan && (
                <Button
                  onClick={() => {
                    setCookie("offchan", true);
                    window.location.reload();
                    subscribe(50, "https://t.me/rcoinoff");
                  }}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Подписаться на наш дискорд сервер (награда – 50 кликов){" "}
              {!dsserv && (
                <Button
                  onClick={() => {
                    setCookie("dsserv", true);
                    window.location.reload();
                    subscribe(50, "https://discord.com/invite/wMtjyJ2y");
                  }}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Подписаться на дополнительный канал создателя (награда – 25
              кликов){" "}
              {!doptg && (
                <Button
                  onClick={() => {
                    setCookie("doptg", true);
                    window.location.reload();
                    subscribe(25, "https://t.me/almazniy_golub");
                  }}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 1000 кликов (награда – 100 кликов){" "}
              {!phand && (
                <Button
                  onClick={()  => taskup("phand", 100, 1000)}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 5000 кликов (награда – 1000 кликов){" "}
              {!pfhand && (
                <Button
                  onClick={() => taskup("pfhand", 1000, 5000)}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 10000 кликов (награда – 5000 кликов){" "}
              {!pffhand && (
                <Button
                  onClick={() => taskup(pfhand, 5000, 10000)}
                >
                  Выполнить
                </Button>
              )}
            </li>
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
            <img
              src="/Klikier/person.png"
              style={{ width: 100 + "px", height: 100 + "px" }}
            />
            <h2 className="youname">{youname}</h2>
            <Button onClick={asksave}>
              Изменить <FaEdit />
            </Button>
            <Stats />
            {open && <div>Ваш uid: {uid}</div>}
            {!open && (
              <Alert variant="danger">
                Внимание! В данный момент отключена серверная часть приложения!
                Если вы начали регистрацию именно в этот момент, вам нужно
                сбросить все данные cookies. Для большей информации обратитесь в
                нашу техподдержку
              </Alert>
            )}
            <Button
              variant="danger"
              className="reset"
              style={{ marginTop: 20 + "px" }}
              onClick={reset}
            >
              Сбросить весь прогресс <FaRegWindowClose />
            </Button>
          </div>
        </div>
      )}
      <div style={{ height: 100 + "px" }}></div>
      <nav>
        <span onClick={() => setPage(0)}>
          <FaHome />
          <span className="label">Главная</span>
          {page === 0 && (
            <div style={{ width: 50 + "px" }} className="primary"></div>
          )}
        </span>
        <span onClick={() => setPage(1)}>
          <FaTasks />
          <span className="label">Задания</span>
          {page === 1 && (
            <div style={{ width: 50 + "px" }} className="primary"></div>
          )}
        </span>
        <span onClick={() => setPage(2)}>
          <FaUserFriends />
          <span className="label">Друзья</span>
          {page === 2 && (
            <div style={{ width: 50 + "px" }} className="primary"></div>
          )}
        </span>
        <span onClick={() => setPage(3)}>
          <FaAddressCard />
          <span className="label">Профиль</span>
          {page === 3 && (
            <div style={{ width: 50 + "px" }} className="primary"></div>
          )}
        </span>
      </nav>
    </main>
  );
}
