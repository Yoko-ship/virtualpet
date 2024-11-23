import React, { useState } from "react";
import "../components/css/form.css";
import "../components/css/LogIn.css"
import axios from "axios";


function LogIn() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")

  const clearFunction = () =>{
    setEmail("")
    setPassword("")
  }
  
  const logInHandle = (event) =>{
    event.preventDefault()
    axios.post("http://localhost:3000/logIn",{email,password})
    .then(response =>{
      const token = response.data.token
      localStorage.setItem("token",token)
      setSuccess("✅ Вы успешно вошли в свой аккаунт")
      setError("")
      clearFunction()
      window.location.reload()
    })
    .catch(err =>{
      console.log(err.response? err.response.data: err.message)
      const errorMessage = err.response ? err.response.data: err.message
      const objectList = Object.values(errorMessage)
      console.log(objectList)
      setError("❌" + "   " +  objectList)
      setSuccess("")
    })
  }
  return (
    <>
      <div className="form">
        <form>
          <div className="text">Авторизация</div>
          <label>Почта</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <label>Пароль</label>
          <input type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <button onClick={logInHandle}>Подтвердить</button>
          <div className="link">
            <a href="#/register">Регистрация</a>
          </div>
        </form>
      </div>
      <div className="error">
        {error ?(
          <p className="err-text">{error}</p>
        ):(
          <p className="success-text">{success}</p>
        )}
      </div>
    </>
  );
}

export default LogIn;
