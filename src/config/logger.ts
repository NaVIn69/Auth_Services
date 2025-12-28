import winston from 'winston';
import { Config } from '.';

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        serviceName: 'auth-service',
    },
    transports: [
        // adding new logger
        new winston.transports.File({
            level: 'info',
            dirname: 'logs',
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss',
                }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV == 'Development',
        }),
        new winston.transports.File({
            level: 'error',
            dirname: 'logs',
            filename: 'error.log',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss',
                }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV == 'Development',
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss',
                }),
                winston.format.json(),
                winston.format.prettyPrint(),
            ),
            silent: Config.NODE_ENV == 'Development',
        }),
    ],
});

export default logger;
