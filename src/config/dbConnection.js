let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 5,
    host: ('localhost'),
    port: '3306',
    user: ('root'),
    password: ('root'),
    database: 'boticario',
    debug: false
});

module.exports = pool;