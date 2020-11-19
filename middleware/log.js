export class LogMiddleware {
    constructor(logService) {
        this.logger = logService
    }

    historyLog = async (req, res, next) => {
        await this.logger.passCtxToLogger(req, res)
        next()
    }
}