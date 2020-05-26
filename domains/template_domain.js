export class TemplateDomain {
    
    constructor(mongoose) {
        this.mongoose = mongoose
        this.templateSchema = this.mongoose.Schema({
            name: String,
            id: String,
            message: String
        })
    }

    initialModel() {
        return this.mongoose.model('TemplateModel', this.templateSchema)
    }
}