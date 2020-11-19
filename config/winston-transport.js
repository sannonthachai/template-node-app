import Transport from 'winston-transport'

export class MongoTransporter extends Transport {
    constructor(LogRepository) {
        super()

        this.logRepository = LogRepository
    }

    async log(info, callback) {
        setImmediate(() => this.emit('logged', info));
        const message = JSON.parse(info[Symbol.for('message')])

        try {
            await this.logRepository.save(message)
            callback();
        } catch (err) {
            console.log(err)
            callback();
        }
    }
}
