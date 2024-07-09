import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTasks,
  FaAddressCard,
  FaEdit,
  FaRegWindowClose,
  FaHotel,
  FaAngleRight,
  FaRedo,
} from "react-icons/fa";
import { Button, Alert, ProgressBar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { snackbar } from "mdui";
import "mdui/mdui.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [strong, setStrong] = useState(200);
  const [page, setPage] = useState(0);
  const [youname, setYouname] = useState("Анонимный пользователь");
  const [uid, setUid] = useState(0);
  const [open, setOpen] = useState(true);
  const [offchan, setOffchan] = useState(false);
  const [dsserv, setDsserv] = useState(false);
  const [doptg, setDoptg] = useState(false);
  const [phand, setPhand] = useState(false);
  const [pfhand, setPfhand] = useState(false);
  const [pffhand, setPffhand] = useState(false);
  const [times, setTimes] = useState(1);
  const [bett, setBett] = useState(100);
  const [bets, setBets] = useState(75);
  const [maxtore, setMaxtore] = useState(200);
  const [code, setCode] = useState("");
  const [codeadd, setCodeadd] = useState("");
  const [respromo, setRespromo] = useState("");
  const [respromoadd, setRespromoadd] = useState("");
  const server =
    "https://6686c937-9050-4808-96d6-19b9b52146ce-00-2c4r1o8l4s6ez.sisko.replit.dev:5000/";

  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    const storedStrong = localStorage.getItem("strong");
    const storedYouname = localStorage.getItem("youname");
    const storedUid = localStorage.getItem("uid");
    const storedTimes = localStorage.getItem("times");
    const storedBett = localStorage.getItem("bett");
    const storedBets = localStorage.getItem("bets");
    const storedMaxtore = localStorage.getItem("maxtore");
    const storedOffchan = localStorage.getItem("offchan") === "true";
    const storedDsserv = localStorage.getItem("dsserv") === "true";
    const storedDoptg = localStorage.getItem("doptg") === "true";
    const storedPhand = localStorage.getItem("phand") === "true";
    const storedPfhand = localStorage.getItem("pfhand") === "true";
    const storedPffhand = localStorage.getItem("pffhand") === "true";

    if (storedCount) {
      setCount(parseInt(storedCount) + 1);
      setUid(storedUid ? parseInt(storedUid) : 0);
      if (isNaN(uid)) {
        confsUid();
      }
    } else {
      confsUid();
    }
    setStrong(storedStrong ? parseInt(storedStrong) : 200);
    setYouname(storedYouname ? storedYouname : "Анонимный пользователь");
    setOffchan(storedOffchan);
    setDsserv(storedDsserv);
    setDoptg(storedDoptg);
    setPhand(storedPhand);
    setPfhand(storedPfhand);
    setPffhand(storedPffhand);
    setTimes(storedTimes ? parseInt(storedTimes) : 1);
    setBett(storedBett ? parseInt(storedBett) : 100);
    setBets(storedBets ? parseInt(storedBets) : 75);
    setMaxtore(storedMaxtore ? parseInt(storedMaxtore) : 200);
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
    if (!localStorage.getItem("count") && uid !== 0) {
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
        localStorage.setItem("uid", parseInt(result + 1));
      }
    });
  }

  useEffect(() => {
    const strongInterval = setInterval(() => {
      if (strong < maxtore) {
        setStrong((prevStrong) => prevStrong + 1);
        localStorage.setItem("strong", strong);
      }
    }, 10000);
    return () => clearInterval(strongInterval);
  }, [strong]);

  function handleClick() {
    if (strong > 0) {
      setCount(count + times);
      setStrong(strong - times > 0 ? strong - times : 0);
      localStorage.setItem("count", count);
      localStorage.setItem("strong", strong);
    } else {
      snackbar({ message: "Недостаточно силы" });
    }
  }

  function asksave() {
    let localname = prompt("Введите своё имя");
    setYouname(localname);
    localStorage.setItem("youname", localname);
  }

  function reset() {
    let confirmname = prompt("Введите имя, которое у вас указано в профиле");
    if (confirmname == youname) {
      localStorage.clear();
      window.location.reload();
    } else {
      snackbar({ message: "Вы ввели неправильное имя" });
    }
  }

  function subscribe(times, url) {
    localStorage.setItem(
      "count",
      parseInt(localStorage.getItem("count")) + times,
    );
    window.location = url;
  }

  function taskup(hand, times, needs) {
    if (parseInt(localStorage.getItem("count")) >= needs) {
      localStorage.setItem(hand, true);
      window.location.reload();
      subscribe(times, "");
    } else {
      snackbar({ message: "Недостаточно монет для получения награды" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const promodata = {
      code: code,
      uid: uid,
    };
    axios
      .post(`${server}promo`, promodata)
      .then((response) => {
        console.log(response.data);
        setRespromo(response.data);
        if (response.data == "Успешно") {
          localStorage.setItem("strong", strong + 50);
          subscribe(100, "");
        }
      })
      .catch((error) => {
        console.error(error);
        setRespromo(error);
      });
  }

  function Stats() {
    return (
      <div className="stats">
        <span>
          Монеты
          <br />
          {count}
        </span>
        <span>
          Сила
          <br />
          {strong}
        </span>
      </div>
    );
  }

  return (
    <main>
      {page === 0 && (
        <div className="home-page">
          <div style={{ height: 20 + "px" }}></div>
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
                    localStorage.setItem("offchan", true);
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
                    localStorage.setItem("dsserv", true);
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
                    localStorage.setItem("doptg", true);
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
                <Button onClick={() => taskup("phand", 100, 1000)}>
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 5000 кликов (награда – 1000 кликов){" "}
              {!pfhand && (
                <Button onClick={() => taskup("pfhand", 1000, 5000)}>
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 10000 кликов (награда – 5000 кликов){" "}
              {!pffhand && (
                <Button onClick={() => taskup(pfhand, 5000, 10000)}>
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
      {page === 2 && (
        <div className="shop-page">
          <h2 style={{ margin: 10 + "px" }}>Магазин</h2>
          <div className="divader"></div>
          <div className="stats">Ваша текущая статистика:</div>
          <Stats />
          <div className="stats">
            <span>
              За 1 клик
              <br />
              {times}
            </span>
            <span>
              Максимальная сила
              <br />
              {maxtore}
            </span>
          </div>
          <div className="divader"></div>
          <ul>
            <li>
              Улучшить на 1 количество монет за один клик <br /> Цена: {bett}{" "}
              монет{" "}
              <Button
                onClick={() => {
                  if (count >= bett) {
                    localStorage.setItem("count", count - bett);
                    localStorage.setItem("times", times + 1);
                    localStorage.setItem("bett", bett + 100);
                    window.location.reload();
                  } else {
                    snackbar({ message: "Недостаточно монет для улучшения" });
                  }
                }}
              >
                Выполнить
              </Button>
            </li>
            <li>
              Улучшить на 100 максимальную силу за один клик <br /> Цена: {bets}{" "}
              монет{" "}
              <Button
                onClick={() => {
                  if (count >= bets) {
                    localStorage.setItem("count", count - bets);
                    localStorage.setItem("maxtore", maxtore + 100);
                    localStorage.setItem("bets", bett + 75);
                    window.location.reload();
                  } else {
                    snackbar({ message: "Недостаточно монет для улучшения" });
                  }
                }}
              >
                Выполнить
              </Button>
            </li>
          </ul>
        </div>
      )}
      {page === 3 && (
        <div className="profile-page">
          <div className="container">
            <mdui-avatar
              style={{ width: 100 + "px", height: 100 + "px" }}
              src="Klikier/person.png"
            ></mdui-avatar>
            <h2 className="youname">{youname}</h2>
            <Button onClick={asksave}>
              Изменить <FaEdit />
            </Button>
            <Stats />
            <ProgressBar
              now={strong}
              max={maxtore}
              data-bs-theme="dark"
              style={{ marginBottom: 20 + "px" }}
            />
            {open && <div>Ваш uid: {uid}</div>}
            {!open && (
              <Alert variant="danger">
                Внимание! В данный момент отключена серверная часть приложения!
                Если вы начали регистрацию именно в этот момент, вам нужно
                сбросить все данные cookies. Для большей информации обратитесь в
                нашу техподдержку
              </Alert>
            )}
            <div className="d-flex" style={{ margin: 20 + "px" }}>
              <Button variant="danger" className="reset" onClick={reset}>
                Сбросить весь прогресс <FaRegWindowClose />
              </Button>
              <div style={{ margin: 1 + "px" }}></div>
              <Button
                variant="success"
                onClick={() => window.location.reload()}
              >
                <FaRedo />
              </Button>
            </div>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Введите промокод"
                data-bs-theme="dark"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button variant="secondary" type="submit">
                <FaAngleRight />
              </Button>
            </Form>
            <div>{respromo}</div>
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
          <FaHotel />
          <span className="label">Магазин</span>
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
