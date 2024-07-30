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
  FaGithub,
} from "react-icons/fa";
import { Button, Alert, ProgressBar, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { snackbar } from "mdui";
import "mdui/mdui.css";

export default function App() {
  // Объяснения переменных
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
  const [imagee, setImagee] = useState("/Klikier/Rcoin1.png");
  const server = "0.0.0.0:5000"; //! Это адресс сервера, из которого берутся данные
  const headers = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  useEffect(() => {
    // Восстанвление сохранений
    const storedUid = localStorage.getItem("uid");
    const storedStrong = localStorage.getItem("strong");
    const storedCount = localStorage.getItem("count");
    const storedYouname = localStorage.getItem("youname");
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
    // Проверка uid по сети
    if (storedCount) {
      setCount(parseInt(storedCount) + 1);
      setUid(storedUid ? parseInt(storedUid) : 0);
      if (isNaN(uid)) {
        confsUid();
      }
    } else {
      confsUid();
    }
    // Установка переменных в значения из сохранения
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
    if (storedMaxtore) {
      setMaxtore(parseInt(storedMaxtore));
    } else {
      localStorage.setItem("maxtore", 200);
    }
    setStrong(storedStrong ? parseInt(storedStrong) : 200);
    setImage(storedCount);
  }, []);

  // Отправка данных
  useEffect(() => {
    const data = {
      uid: uid,
      count: count,
      youname: youname,
      strong: strong,
    };
    axios.post(`${server}addinfo`, data, headers).catch((error) => {
      console.error(error);
    });
  }, [count, youname]);

  useEffect(() => {
    console.log(uid);
    if (!localStorage.getItem("count") && uid !== 0) {
      setCount(0);
      confUid(uid);
    }
  }, [uid]);

  async function getUid() {
    try {
      const response = await axios.get(server, headers);
      setOpen(true);
      return response.data;
    } catch (error) {
      setOpen(false);
      return error;
    }
  }

  function confUid(auid) {
    axios.post(`${server}setuid/${parseInt(auid) + 1}`, headers);
  }

  function confsUid() {
    getUid().then((result) => {
      setUid(result);
      if (open) {
        localStorage.setItem("uid", parseInt(result + 1));
      }
    });
  }

  function restoreEnergy() {
    const now = Math.floor(Date.now() / 1000);
    const lastRestoreTime = parseInt(localStorage.getItem("lastRestoreTime"));
    if (lastRestoreTime) {
      const timeSinceLastRestore = now - lastRestoreTime;
      const energyToRestore = Math.floor(timeSinceLastRestore / 10);

      if (energyToRestore > 0) {
        const currentEnergy = parseInt(localStorage.getItem("strong")) || 0;
        const restoredEnergy = currentEnergy + energyToRestore;
        if (restoredEnergy <= localStorage.getItem("maxtore")) {
          localStorage.setItem("strong", restoredEnergy);
          setStrong(restoredEnergy);
          localStorage.setItem("lastRestoreTime", now.toString());
        } else {
          localStorage.setItem("strong", localStorage.getItem("maxtore"));
          setStrong(localStorage.getItem("maxtore"));
          localStorage.setItem("lastRestoreTime", now.toString());
        }
      }
    } else {
      localStorage.setItem("strong", strong);
      localStorage.setItem("lastRestoreTime", now.toString());
    }
  }

  useEffect(() => {
    restoreEnergy();
    const intervalId = setInterval(() => {
      restoreEnergy();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  function handleClick() {
    if (strong > 0) {
      setCount(count + times);
      setStrong(strong - times > 0 ? strong - times : 0);
      setImage(count);
      createParticles();
      localStorage.setItem("count", count);
      localStorage.setItem("strong", strong - times > 0 ? strong - times : 0);
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
      parseInt(localStorage.getItem("count")) + times
    );
    if (url !== "") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
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

  function setImage(count) {
    if (count < 500) {
      setImagee("/Klikier/Rcoin1.png");
    } else if (count < 1000) {
      setImagee("/Klikier/Rcoin2.png");
    } else if (count < 5000) {
      setImagee("/Klikier/Rcoin3.png");
    } else {
      setImagee("/Klikier/Rcoin4.png");
    }
  }

  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.style.position = "absolute";
    particlesContainer.style.left = "50%";
    particlesContainer.style.top = "50%";
    particlesContainer.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");
      particle.textContent = "🐸";
      particle.style.position = "absolute";
      particle.style.fontSize = "20px";
      particle.style.userSelect = "none";
      particle.style.pointerEvents = "none";
      particle.style.animation = "fadeIn 1s ease-in-out";
      particlesContainer.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      let x = 0;
      let y = 0;

      const animation = particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "cubic-bezier(0, .9, .57, 1)",
          delay: Math.random() * 100,
        }
      );

      animation.onfinish = () => {
        particlesContainer.removeChild(particle);
        if (particlesContainer.childElementCount === 0) {
          document.body.removeChild(particlesContainer);
        }
      };
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const promodata = {
      code: code,
      uid: uid,
    };
    axios
      .post(`${server}promo`, promodata, headers)
      .then((response) => {
        if (!isNaN(parseFloat(response.data))) {
          if (parseInt(response.data) < 0) {
            if (
              parseInt(localStorage.getItem("count")) +
                parseInt(response.data) <
              0
            ) {
              window.location.reload();
              return;
            } else {
              localStorage.setItem("strong", localStorage.getItem("maxtore"));
              localStorage.setItem(
                "count",
                parseInt(localStorage.getItem("count")) + response.data
              );
              window.location.reload();
            }
          } else {
            localStorage.setItem("strong", localStorage.getItem("maxtore"));
            localStorage.setItem(
              "count",
              parseInt(localStorage.getItem("count")) + response.data
            );
            window.location.reload();
          }
        } else {
          snackbar({ message: response.data });
        }
      })
      .catch((error) => {
        console.error(error);
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
          <img src={imagee} onClick={handleClick} className="mainbutton" />
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
                    subscribe(50, "https://t.me/rcoinoff");
                    window.location.reload();
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
                    subscribe(50, "https://discord.gg/F4tgFEkQ9E");
                    window.location.reload();
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
                    subscribe(25, "https://t.me/almazniy_golub");
                    window.location.reload();
                  }}
                >
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 1000 монет (награда – 100 монет){" "}
              {!phand && (
                <Button onClick={() => taskup("phand", 100, 1000)}>
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 5000 монет (награда – 1000 монет){" "}
              {!pfhand && (
                <Button onClick={() => taskup("pfhand", 1000, 5000)}>
                  Выполнить
                </Button>
              )}
            </li>
            <li>
              Набрать 10000 монет (награда – 5000 монет){" "}
              {!pffhand && (
                <Button onClick={() => taskup("pffhand", 5000, 10000)}>
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
              <span className="maxtore">{maxtore}</span>
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
                placeholder="Введите промокод или код для покупки"
                data-bs-theme="dark"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button variant="secondary" type="submit">
                <FaAngleRight />
              </Button>
            </Form>
            <div>
              <span>Версия: 1.7</span>
              <span style={{ margin: 10 + "px" }}></span>
              <a href="https://github.com/fedor772/Klikier" target="_blank">
                <FaGithub />
                Исходный код
              </a>
            </div>
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
