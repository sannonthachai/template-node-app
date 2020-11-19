import mongoose from 'mongoose'

export class MongoConfig {
    constructor(mongoURL, options) {
        this.mongoURL = mongoURL
        this.options = options
    }

    connect = () => {
        try {
            mongoose.connect(this.mongoURL, this.options)
            console.log('MongoDB Connected')
        } catch (err) {
            console.error(err)
            process.exit(1)
        }

        return mongoose
    }
}