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

//REMOTE NOT WORKING
// let pool = mysql.createPool({
//     connectionLimit: 5,
//     host: ('db4free.net'),
//     port: '3306',
//     user: ('testmysqlbot'),
//     password: ('rootroot'),
//     database: 'testmysqlbot',
//     debug: false
// });

module.exports = pool;