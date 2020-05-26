export class TemplateRepository {
    constructor(TemplateDomain) {
        this.templateDomain = TemplateDomain
        this.templateModel = this.templateDomain.initialModel()
    }

    async testFindByName(name) {
        let documentByName = await this.templateModel.findOne({ name: name })

        return documentByName
    }

    async testFindAll() {
        let allDocuments = await this.templateModel.find()

        return allDocuments
    }

    async testSave(data) {
        let templateDocument = new this.templateModel(data)
        await templateDocument.save()
    }
}