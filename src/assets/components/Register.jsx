import React, { useState } from "react";
import "../components/css/form.css";
import "../components/css/LogIn.css"
import axios from "axios";

function Register() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")

    const postData = (event) =>{
        event.preventDefault()
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
          axios.post("http://localhost:3000/register",{email,password})
        .then(response =>{
            console.log("Регистрация успешно прошла",response.data)
            setSuccess("✅ Регистрация успешно прошла")
            setError("")
        })
        .catch(err =>{
            console.log(err.response ? err.response.data: err.message)
            const errorMessage = err.response ? err.response.data: err.message
            const textedMessage = Object.values(errorMessage)
            setError("❌" + " " + textedMessage)
            setSuccess("")
        })
        }
        else{
          setError("❌ Неверный формат почты")
          setSuccess("")

        }
    }
  return (
    <>
    <div className="form">
      <form>
        <div className="text">Регистрация</div>
        <label>Почта</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <label>Пароль</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button onClick={postData}>Подтвердить</button>
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

export default Register;
