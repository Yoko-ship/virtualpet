const express = require("express");
const pool = require("./dataBase.cjs");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_code = process.env.SECRET_CODE;
const app = express();
app.use(cors());
app.use(express.json());

const createUserTable = `
        CREATE TABLE IF NOT EXISTS user_pet(
            ID SERIAL PRIMARY KEY,
            Почта VARCHAR NOT NULL,
            Пароль VARCHAR NOT NULL
        )
`;
const createTable = `
    CREATE TABLE IF NOT EXISTS pet(
        ID SERIAL PRIMARY KEY,
        ИМЯ VARCHAR NOT NULL,
        Харизма SERIAL NOT NULL,
        Интеллект SERIAL NOT NULL,
        Сила SERIAL NOT NULL,
        Img SERIAL NOT NULL
    )
`;

const result = pool.query(createTable);
const createUser = pool.query(createUserTable);
if (!result || !createUser) {
  console.log("Произоша ошибка при создании таблицы");
}

const authentification = (req,res,next) =>{
  const authHeader = req.headers["authorization"]
  if(!authHeader){
    return res.status(404).json({error:"Заголовок отсутсвует"})

  }
  const token = authHeader.split(" ")[1]
  if(!token){
    return res.status(401).json({error:"Токен отсутствует"})
  }
  jwt.verify(token,secret_code,(err,user) =>{
    if(err){
      return res.status(401).json({error: "❌ Нужно войти в аккаунт"})
    }
    req.user = user
    next()
  })
}




app.post("/add",authentification, async (req, res) => {
  const { petName, charisma, intellegence, strength, current } = req.body;
  if (!petName || !charisma || !intellegence || !strength || !current) {
    return res.status(402).json({ error: "Пожалуста заполните все поля" });
  }

  try {
    const insertQuery =
      "INSERT INTO pet(ИМЯ,Харизма,Интеллект,Сила,Img) VALUES($1,$2,$3,$4,$5) RETURNING id";
    const result = await pool.query(insertQuery, [
      petName,
      charisma,
      intellegence,
      strength,
      current,
    ]);
    res.json({ id: result.rows[0].id });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

app.get("/", async (req, res) => {
  const insertQuery = `SELECT * FROM pet`;
  const result = await pool.query(insertQuery);
  if (result.rows.length === 0) {
    return res
      .status(404)
      .json({ error: "Произошла ошибка с получением данных" });
  }
  res.json(result.rows);
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ error: "Введите все данные" });
  }
  const emailCheck = "SELECT Почта FROM user_pet WHERE Почта = $1";
  const result = await pool.query(emailCheck, [email]);
  if (result.rows.length > 0) {
    res.status(401).json({ error: "Данный эмейл уже существует" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO user_pet(Почта,Пароль) VALUES($1,$2) RETURNING id`;
    const rez = await pool.query(insertQuery, [email, hashedPassword]);
    res.json({ id: rez.rows[0].id });
  }
});

app.post("/logIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Нужно заполнить все данные" });
  }
  const querySelect = "SELECT * FROM user_pet WHERE Почта = $1";
  const result = await pool.query(querySelect, [email]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }
  const user = result.rows[0];

  const checkPassword = await bcrypt.compare(password, user.Пароль);
  if (!checkPassword) {
    return res.status(404).json({ error: "Пароль не совпадает" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, secret_code, {
    expiresIn: "1h",
  });
  res.json({ token });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер успешно работает на порте ${port}`);
});
