let db = require('../config/dbConnection.js');

class Revendedor {
    constructor() {
    }

    static getByLogin(email, callback){
        let query = "select * from revendedor where email = '" + email + "'";
        db.query(query, callback);
    }

    static createRevendedor(revendedor, callback){
        let query = 'insert into revendedor set ?';
        db.query(query, revendedor, callback);
    }
}

module.exports = Revendedor;