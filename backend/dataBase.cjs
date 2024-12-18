const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.HOST,
    database:process.env.DB_NAME,
    password:process.env.PASSWORD,
    port:process.env.PORT
})

module.exports = pool