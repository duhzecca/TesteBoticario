let Revendedor = require('../model/Revendedor.js');

exports.create = function (req, res) {
    let revendedor = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('cpf', 'CPF é obrigatório').notEmpty();
    req.assert('email', 'E-mail é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    let errors = req.validationErrors();
    if(errors){
        res.status(400).send(errors);
        return;
    }

    Revendedor.createRevendedor(revendedor, function(error, result){
        if(error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        }else{
            res.send(result);
        }
    });
};

exports.validate = function (req, res) {
    let email = req.params.email;

    Revendedor.getByLogin(email, function (error, result) {
        if(error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        } else {
            if(result.length === 0) {
                res.status(404).send("{'error': 'Not Found}");
            } else {
                res.send(result);
            }
        }
    })
};