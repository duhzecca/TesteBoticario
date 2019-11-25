const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const FS = require('fs');

if (!FS.existsSync('logs')) {
    FS.mkdirSync('logs');
}

let formatMessage = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

module.exports = createLogger({
    format: combine(
        timestamp(),
        formatMessage
    ),
    transports : [
        new transports.Console(),
        new transports.File({
            name : 'info',
            level : 'info',
            filename : 'logs/teste-boticario.log',
            maxsize : 100000,
            maxfiles : 10
        }),
        new transports.File({
            name : 'error',
            level : 'error',
            filename : 'logs/teste-boticario.log',
            maxsize : 100000,
            maxfiles : 10
        })
    ]
});