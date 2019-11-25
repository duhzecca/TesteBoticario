let db = require('../config/dbConnection.js');

class Compra {
    constructor() {
    }

    static createCompra(compra, callback){
        let query = 'insert into compra set ?';
        db.query(query, compra, callback);
    }

    static editCompra(codigo, compra, callback){
        let query = 'update compra set ? where codigo = ' + codigo;
        db.query(query, compra, callback);
    }

    static deleteCompra(codigo, callback){
        let query = "delete from compra where codigo = " + codigo;
        db.query(query, callback);
    }

    static getCompra(callback){
        let query = "select * from compra";
        db.query(query, callback);
    }

    static getCompraByCodigo(codigo, callback){
        let query = "select * from compra where codigo = " + codigo;
        db.query(query, callback);
    }
}

module.exports = Compra;