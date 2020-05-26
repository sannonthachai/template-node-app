export class FileDomain {
    
    constructor(mongoose) {
        this.mongoose = mongoose
        this.fileSchema = this.mongoose.Schema({
            name: String,
            data: Buffer,
            contentType: String
        })
    }

    initialModel() {
        return this.mongoose.model('FileModel', this.fileSchema)
    }
}