let Compra = require('../model/Compra.js');

function setStatus(compra) {
    if (compra.cpf === 15350946056)
        compra.status = 'Aprovado';
    else
        compra.status = 'Em validação';
}

function setCashback(compra) {
    if (compra.valor <= 1000) {
        compra.percentage_cashback = '10%';
        compra.value_cashback = compra.valor * 0.1;
    } else if (compra.valor > 1000 && compra.valor <= 1500) {
        compra.percentage_cashback = '15%';
        compra.value_cashback = compra.valor * 0.15;
    } else {
        compra.percentage_cashback = '20%';
        compra.value_cashback = compra.valor * 0.2;
    }
}

exports.create = function (req, res) {
    let compra = req.body;

    req.assert('codigo', 'Código da compra é obrigatório').notEmpty();
    req.assert('valor', 'Valor da compra é obrigatório').notEmpty();
    req.assert('cpf', 'CPF é obrigatório').notEmpty();
    req.assert('data', 'Data da compra é obrigatório').notEmpty();

    compra.data = compra.data.replace(/\//g, '-').split("-").reverse().join("-");

    let errors = req.validationErrors();
    if(errors){
        res.status(400).send(errors);
        return;
    }

    setStatus(compra);
    setCashback(compra);

    Compra.createCompra(compra, function(error, result){
        if(error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        }else{
            res.send(result);
        }
    });
};

exports.edit = function (req, res) {
    let codigo = req.params.id;
    let compra = req.body;

    if(compra.valor != null)
        setCashback(compra);

    Compra.getCompraByCodigo(codigo, function (error, result) {
        if(error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        } else {
            if(result.length === 0) {
                res.status(404).send("{'error': 'Not Found}");
            } else if(result[0].status === 'Em validação'){
                Compra.editCompra(codigo, compra, function (error, result) {
                    if(error){
                        console.log("error: " + error.message);
                        res.status(500).send(error);
                    }else{
                        res.send(result);
                    }
                })
            } else {
                res.status(400).send("{'error': 'Compra só pode ser editada com status 'Em Validação'}");
            }
        }
    });

};

exports.get = function (req, res) {
    Compra.getCompra(function (error, result) {
        if (error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        }else{
            res.send(result);
        }
    })
};

exports.delete = function (req, res) {
    let codigo = req.params.id;

    Compra.getCompraByCodigo(codigo, function (error, result) {
        if(error){
            console.log("error: " + error.message);
            res.status(500).send(error);
        } else {
            if(result.length === 0) {
                res.status(404).send("{'error': 'Not Found}");
            } else if(result[0].status === 'Em validação'){
                Compra.deleteCompra(codigo, function (error, result) {
                    if(error){
                        console.log("error: " + error.message);
                        res.status(500).send(error);
                    }else{
                        res.send(result);
                    }
                })
            } else {
                res.status(400).send("{'error': 'Compra só pode ser deletada com status 'Em Validação'}");
            }
        }
    });
};
