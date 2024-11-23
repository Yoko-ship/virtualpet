import React, { useEffect, useState } from "react";
import mishka from "../components/assets/10886061.jpg";
import sobaka from "../components/assets/adorable-shiba-inu-dog-studio.jpg";
import legenda from "../components/assets/fun-3d-cartoon-tiger-dancing.jpg";
import apple from "../components/assets/i.png";
import pear from "../components/assets/pear.png";
import orange from "../components/assets/orange.png";
import ananas from "../components/assets/ananas.png";
import banan from "../components/assets/banan.png";
import vinograd from "../components/assets/vinograd.png";
import watermelon from "../components/assets/watermelon.png";
import hpImage from "../components/assets/health.png";
import hungryImage from "../components/assets/power.png";
import pettingImage from "../components/assets/pawprint.png";
import gifImage from "../components/assets/sprinklefest.mp4";
import catFlexing from "../components/assets/cat.mp4";
import "../components/main.css";
import "../components/css/LogIn.css";
import axios from "axios";

function Main() {
  const [petName, setPetName] = useState("");
  const [charisma, setCharisma] = useState(() => {
    const savedCharisma = localStorage.getItem("charisma");
    return savedCharisma ? Number(savedCharisma) : 0;
  });
  const [charismaShow, setCharismaShow] = useState(charisma);

  const [intellect, setIntellect] = useState(() => {
    const savedIntellect = localStorage.getItem("intellect");
    return savedIntellect ? Number(savedIntellect) : 0;
  });
  const [intellectShow, setIntellectShow] = useState(intellect);
  const [strength, setStrength] = useState(() => {
    const savedStrength = localStorage.getItem("strength");
    return savedStrength ? Number(savedStrength) : 0;
  });
  const [showStrength, setShowStrength] = useState(strength);
  const [imageNumber, setImageNumber] = useState(Number);
  const imageArrays = [
    apple,
    pear,
    orange,
    ananas,
    banan,
    vinograd,
    watermelon,
  ];
  var [randomImage, setRandomImage] = useState();
  var [secondRandom, setSecondRandom] = useState();
  var [thirdRandom, setThirdRandom] = useState();
  var [hungry, setHungry] = useState(() => {
    const savedHungry = localStorage.getItem("hungry");
    return savedHungry ? Number(savedHungry) : 100;
  });
  const [hp, setHp] = useState(() => {
    const savedHp = localStorage.getItem("hp");
    return savedHp ? Number(savedHp) : 100;
  });
  const [hpShow, setHpShow] = useState(hp);
  const [hungryShow, setHungryShow] = useState(hungry);
  const [petting, setPetting] = useState(false);
  const [lvl, setLvl] = useState(() => {
    const savedLvl = localStorage.getItem("lvl");
    return savedLvl ? Number(savedLvl) : 0;
  });
  const [lvlShow, setLvlShow] = useState(lvl);
  const [exp, setExp] = useState(() => {
    const savedExp = localStorage.getItem("exp");
    return savedExp ? Number(savedExp) : 0;
  });
  const [expShow, setExpShow] = useState(exp + "/100");
  const [token, setToken] = useState("");

  const handleHungry = () => {
    const interval = setTimeout(() => {
      setHungry((prevElement) => {
        const newValue = prevElement > 0 ? prevElement - 5 : 0;
        localStorage.setItem("hungry", newValue);
        setHungryShow(newValue);
        return newValue;
      });
      return () => clearTimeout(interval);
    }, 60000);
  };

  const handleHp = () => {
    const interval = setTimeout(() => {
      if (hungry <= 10) {
        setHp((prevElement) => {
          const newValue = prevElement > 0 ? prevElement - 5 : 0;
          localStorage.setItem("hp", newValue);
          setHpShow(newValue);
          return newValue;
        });
      }
      return () => clearTimeout(interval);
    }, 60000);
  };

  const showRandomedImages = () => {
    const randomArrays = Math.floor(Math.random() * imageArrays.length);
    const show_img = imageArrays[randomArrays];
    const secondRandomArrays = Math.floor(Math.random() * imageArrays.length);
    const show_second_img = imageArrays[secondRandomArrays];
    const thirdRandomArrays = Math.floor(Math.random() * imageArrays.length);
    const show_third_img = imageArrays[thirdRandomArrays];

    if (
      show_img !== show_second_img &&
      show_img !== show_third_img &&
      show_second_img !== show_third_img
    ) {
      setRandomImage(show_img);
      setSecondRandom(show_second_img);
      setThirdRandom(show_third_img);
    } else {
      setRandomImage(apple);
      setSecondRandom(banan);
      setThirdRandom(watermelon);
    }
  };

  const setupCharacters = (petName, imageNumber) => {
    setPetName(petName);
    setStrength(strength);
    setImageNumber(imageNumber);
  };

  const getData = () => {
    axios
      .get("http://localhost:3000/", {})
      .then((response) => {
        const pet_name = response.data[0].ИМЯ;
        const pet_charisma = response.data[0].Харизма;
        const pet_intellect = response.data[0].Интеллект;
        const pet_strength = response.data[0].Сила;
        const pet_image = response.data[0].img;
        setupCharacters(pet_name, pet_image);
        setCharisma(() => {
          const savedCharisma = localStorage.getItem("charisma");
          return savedCharisma ? Number(savedCharisma) : pet_charisma;
        });
        setIntellect(() => {
          const savedIntellect = localStorage.getItem("intellect");
          return savedIntellect ? Number(savedIntellect) : pet_intellect;
        });
        setStrength(() => {
          const savedStrength = localStorage.getItem("strength");
          return savedStrength ? Number(savedStrength) : pet_strength;
        });
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err.message);
      });
  };

  const deleteButton = () => {
    alert("Данная фича пока не доступна");
  };
  const handleExp = () => {
    setExp((prevElement) => {
      const newValueExp = prevElement + 10;
      localStorage.setItem("exp", newValueExp);
      setExpShow(newValueExp + "/100");
      return newValueExp;
    });

    if (exp >= 100) {
      setLvl((prevElement) => {
        const newValueLvl = prevElement + 1;
        localStorage.setItem("lvl", newValueLvl);
        const newExpShow = 0;
        localStorage.setItem("exp", newExpShow);
        setLvlShow(newValueLvl);
        setExpShow(0);
        setExp(0);
        var stringed = newValueLvl.toString().slice(-1);
        console.log(stringed);
        if (stringed === "1" || stringed === "4" || stringed === "7") {
          setCharisma((prevEl) => {
            const newCharisma = prevEl + 1;
            localStorage.setItem("charisma", newCharisma);
            setCharismaShow(newCharisma);
            return newCharisma;
          });
        } else if (stringed === "2" || stringed === "5" || stringed === "8") {
          setIntellect((prevEl) => {
            const newValue = prevEl + 1;
            localStorage.setItem("intellect", newValue);
            setIntellectShow(newValue);
            return newValue;
          });
        } else if (
          stringed === "3" ||
          stringed === "6" ||
          stringed === "9" ||
          stringed === "0"
        ) {
          setStrength((prevEl) => {
            const newValue = prevEl + 1;
            localStorage.setItem("strength", newValue);
            setShowStrength(newValue);
            return newValue;
          });
        }
        return newValueLvl;
      });
    }
  };

  const eatFruits = () => {
    if (hungry < 100) {
      handleExp();
      setHungry((prevHungry) => {
        const newHungry = prevHungry + 20;
        localStorage.setItem("hungry", newHungry);
        setHungryShow(newHungry);
        return newHungry;
      });
    }
  };

  const stroking = () => {
    if (hpShow < 40) {
      handleExp();
      setHp((prevElement) => {
        const newHp = prevElement + 10;
        localStorage.setItem("hp", newHp);
        setHpShow(newHp);
        setPetting(true);
        setTimeout(() => {
          setPetting(false);
        }, 2500);
        return newHp;
      });
    }
  };

  useEffect(() => {
    handleHungry();
  }, [hungry]);

  useEffect(() => {
    handleHp();
  }, [hp]);

  useEffect(() => {
    showRandomedImages();
    getData();
  }, []);

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    setToken(tokens);
  }, []);

  return (
    <>
      {token ? (
        <>
          <div className="container">
            <div className="images">
              {imageNumber === 1 ? (
                <>
                  {!petting ? (
                    <img src={sobaka}></img>
                  ) : (
                    <video src={gifImage} autoPlay={true} muted></video>
                  )}
                  <button onClick={stroking}>
                    <img src={pettingImage}></img>
                  </button>
                </>
              ) : imageNumber === 2 ? (
                <>
                  {!petting ? (
                    <img src={legenda}></img>
                  ) : (
                    <video src={catFlexing}></video>
                  )}
                  <button onClick={stroking}>
                    <img src={pettingImage}></img>
                  </button>
                </>
              ) : imageNumber === 3 ? (
                <>
                  {!petting ? (
                    <img src={mishka}></img>
                  ) : (
                    <video src={catFlexing}></video>
                  )}
                  <button onClick={stroking}>
                    <img src={pettingImage}></img>
                  </button>
                </>
              ) : (
                <p></p>
              )}
            </div>
            <div className="texts">
              <p>Имя: {petName}</p>
              <span>Уровень: {lvlShow}</span>
              <label>Опыт: {expShow}</label>
              <input type="range" min={0} max={100} disabled />
              <label>Харизма: {charismaShow}</label>
              <input type="range" min={0} max={100} value={charisma} disabled />
              <label>Интеллект: {intellectShow}</label>
              <input
                type="range"
                min={0}
                max={100}
                value={intellectShow}
                disabled
              />
              <label>Сила: {showStrength}</label>
              <input
                type="range"
                min={0}
                max={100}
                value={showStrength}
                disabled
              />
              <div className="menu-bar">
                <img src={hungryImage}></img>
                <label>{hungryShow}</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={hungryShow}
                  disabled
                />
                <img src={hpImage}></img>
                <label>{hpShow}</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={hp}
                  disabled
                  className="health"
                />
              </div>
            </div>
          </div>
          <div className="interactive">
            <button>
              <img src={randomImage} onClick={eatFruits}></img>
            </button>
            <button onClick={eatFruits}>
              <img src={secondRandom}></img>
            </button>
            <button onClick={eatFruits}>
              <img src={thirdRandom}></img>
            </button>
          </div>
          <div className="delete">
            <button onClick={deleteButton}>Удалить pet'a</button>
          </div>
        </>
      ) : (
        <>
          <div className="error">
            <p className="err-text">Вы должны войти в свой аккаунт</p>
          </div>
        </>
      )}
    </>
  );
}

export default Main;
