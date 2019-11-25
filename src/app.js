const APP = require('./config/custom-express');
const LOGGER = require('./config/logger');
const PORT = 8080;

APP.listen(PORT, function () {
    LOGGER.info(`Boticario started.`);
    LOGGER.info(`App listen port: ${PORT}`);
});