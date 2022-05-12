const sql = require('mssql')

// load dotENV
require('dotenv').config()

const config = {
    user:`${process.env.DB_USERNAME}`,
    password:`${process.env.DB_PASSWORD}`,
    server:`${process.env.DB_SERVER}`,
    database:`${process.env.DB_DATABASE}`,
    options: {
        encrypt: true, // because of azure
        trustServerCertificate: false 
      }
}

sql.on('error', error => {
    console.log ('MSSQL error');
    console.log (error);
})

let connection;
sql.connect(config).then(pool => {
    connection = pool;
    //console log if there is a connection
    //use dotenv to hide private information
    console.log (`Connected to ${process.env.DB_SERVER}`)
})