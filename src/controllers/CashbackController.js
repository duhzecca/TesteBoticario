const AXIOS = require('axios');
const LOGGER = require('../config/logger');
let axiosInstance;


exports.get = async function (req, res) {
    mountAxiosInstance();
    let cpf = req.params.cpf;
    let queryString = `?cpf=12312312323`;
    let ret = await axiosInstance.get(queryString);
    let response = `O CPF ${cpf} possui R$${ret.data.body.credit} de saldo acumulado de cashback`;
    res.send(response);
};

let mountAxiosInstance = async function () {
    axiosInstance = AXIOS.create({
        baseURL: "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback",
        timeout: 5000
    });

    axiosInstance.defaults.headers['token'] = 'ZXPURQOARHiMc6Y0flhRC1LVIZQVFRnm';

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            LOGGER.error(error);
            throw new Error(error);
        }
    );

    return axiosInstance;
};