export class LogRepository {
    constructor(LogDomain) {
        this.logDomain = LogDomain
        this.logModel = this.logDomain.initialModel()
    }

    async save(data) {
        let logDocument = new this.logModel(data)
        await logDocument.save()
    }
}