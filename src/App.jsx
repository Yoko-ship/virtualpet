import { useEffect, useState } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Main from "./assets/components/Main";
import Pet from "./assets/components/Pet";
import Register from "./assets/components/Register";
import LogIn from "./assets/components/LogIn";

function App() {
  const [token,setToken] = useState("")
  const [showMenu,setShowMenu] = useState(false)

  var stringToColor = function stringToColor(str) {
    var hash = 0;
    var color = '#';
    var i;
    var value;
    var strLength;

    if(!str) {
        return color + '333333';
    }

    strLength = str.length;

    for (i = 0; i < strLength; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
};


var name = "Профиль"
var letter = name.slice(0, 1);
var backgroundColors = stringToColor(letter);

const hideMenuBtn = () =>{
  setShowMenu(!showMenu)
}

  useEffect(() =>{
    const tokens = localStorage.getItem("token")
    setToken(tokens)
  },[])

  const removeTokens = () =>{
    localStorage.removeItem("token")
    window.location.reload()
  }
  return (
    <>
      <Router>
        <header>
          <div>Virtual-Pet</div>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/create">Создать питомца</Link>
            </li>
            <li>
              <Link to="/logIn">Авторизация</Link>
            </li>
            {token ? (
              <div className="user-info">
                <div className="user-name">
                  <div className="user-avatar" style={{backgroundColor:backgroundColors}} onClick={hideMenuBtn}>
                  {showMenu ?(
                    <div className="user" style={{display:"block"}}>
                      <div className="main-button">
                        <button onClick={removeTokens}>Выйти</button>
                      </div>
                    </div>
                  ):(
                    <div className='user'>
                    <p>Имя</p>
                    <button>Выйти</button>
                  </div>  
                  )}
                  </div>
                </div>
              </div>
            ):(
              <p style={{display:"none"}}></p>
            )}
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/create" element={<Pet />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logIn" element={<LogIn />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
