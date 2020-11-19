import winston from 'winston'
import { MongoTransporter } from './winston-transport'

export class LoggerService {
    constructor(LogRepository) {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new MongoTransporter(LogRepository)
            ],
            format: winston.format.combine(winston.format.timestamp(), this.historyFormat())
        });
    }

    historyFormat = () => {
        return winston.format.printf(({ timestamp, level, req, res }) => {
            return JSON.stringify({
                timestamp,
                severity: level,
                uri: req.originalUrl,
                method: req.method,
                ip: req.connection.remoteAddress,
                status: res.statusCode
            })
        })
    }

    passCtxToLogger = async (req, res) => {
        await this.logger.log('info', {
            req,
            res
        });
    }
}