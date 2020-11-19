export class LogDomain {
    
    constructor(mongoose) {
        this.mongoose = mongoose
        this.logSchema = this.mongoose.Schema({
            timestamp: String,
            severity: String,
            uri: String,
            method: String,
            ip: String,
            status: String 
        })
    }

    initialModel() {
        return this.mongoose.model('LogModel', this.logSchema)
    }
}