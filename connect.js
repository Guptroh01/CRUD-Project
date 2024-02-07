const Pool = require('pg').Pool;
const env = require('dotenv').config()

const pool = new Pool({
    user : process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
})

pool.connect((err, client, release) => {
    if(err) {
        return console.error('Error in Connection!');
    }
   client.query('SELECT NOW()', (err, result) => {
    release()
    if(err){
        return console.error('Error executing query');
    }
    console.log("Connected to database")
   })
})

module.exports = pool;
