import React, { useEffect, useState } from "react";
import "./pet.css";
import petImage from "./assets/10886061.jpg";
import secondImage from "./assets/adorable-shiba-inu-dog-studio.jpg";
import thirdImage from "./assets/fun-3d-cartoon-tiger-dancing.jpg";
import axios from "axios";
import "./css/LogIn.css"

function Pet() {
  const [petName, setPetName] = useState("");
  const [charisma, setCharisma] = useState(Number);
  const [strength, setStrength] = useState(Number);
  const [intellegence, setIntellegence] = useState(Number);
  const limit = 12;
  const [number, setNumber] = useState(limit);
  const [error, setError] = useState("");
  var [current, setCurrent] = useState(1);
  const [errorMessage,setErrorMessage] = useState("")
  const [success,setSuccess] = useState("")

  const buttonHandler = async (event) => {
    const token = localStorage.getItem("token")
    event.preventDefault();
    if (number >= 1) {
      setError("Пожалуста распределите все оставшиеся очки");
    }
    axios
      .post("http://localhost:3000/add", {
        petName,
        charisma,
        intellegence,
        strength,
        current,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response) => {
        console.log("Данные успешно переданы", response.data);
        setSuccess("Вы успешно добавили pet'a")
        setErrorMessage("")
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err.message);
        const errorObject = err.response ? err.response.data:err.message;
        const textedError = Object.values(errorObject)
        setErrorMessage(textedError)
        setSuccess("")
    
      });
  };

  //? Функция распределение очками
  const updatePoint = (value, setter, current) => {
    const difference = value - current;
    if (number - difference >= 0 && value >= 0) {
      setter(value);
      setNumber(number - difference);
      setError("");
    } else {
      setError("Нельзя потратить больше чем положено");
    }
  };

  const checkButton = () => {
    if (current > 3) {
      current = 1;
    }
    setCurrent(current + 1);
    console.log(current);
  };

  const getZindex = (index) => {
    if (index === current) return 2;
    if (index === (current === 1 ? 3 : current - 1)) return 1;
    if (index === (current === 3 ? 1 : current + 1)) return 0;
  };
  return (
    <>
      <div className="box">
        <div className="images">
          <img
            src={petImage}
            className="image current"
            style={{ zIndex: getZindex(1) }}
            onClick={checkButton}
          ></img>
          <img
            src={secondImage}
            className="image prevImg"
            style={{ zIndex: getZindex(2) }}
            onClick={checkButton}
          ></img>
          <img
            src={thirdImage}
            className="image futureImg"
            style={{ zIndex: getZindex(3) }}
            onClick={checkButton}
          ></img>
        </div>

        <div className="menu">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setPetName(e.target.value)}
            value={petName}
          />
          <input
            type="number"
            placeholder="харизма"
            min={0}
            onChange={(e) =>
              updatePoint(parseInt(e.target.value || 0), setCharisma, charisma)
            }
          />
          <input
            type="number"
            placeholder="интеллект"
            min={0}
            onChange={(e) =>
              updatePoint(
                parseInt(e.target.value || 0),
                setIntellegence,
                intellegence
              )
            }
          />
          <input
            type="number"
            placeholder="сила"
            min={0}
            onChange={(e) =>
              updatePoint(parseInt(e.target.value || 0), setStrength, strength)
            }
          />
          <div>
            <p>Остались очки:{number}</p>
            {error ? <p className="warning">{error}</p> : <p></p>}
          </div>
          <button type="submit" onClick={buttonHandler}>
            Отправить
          </button>
        </div>
      </div>

      <div className="error-text">
      {errorMessage ?(
        <p className="err-text">{errorMessage}</p>
      ):(
        <p className="success-text">{success}</p>
      )}

      </div>  
    </>
  );
}

export default Pet;
