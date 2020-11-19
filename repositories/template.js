export class TemplateRepository {
    constructor(TemplateDomain) {
        this.templateDomain = TemplateDomain
        this.templateModel = this.templateDomain.initialModel()
    }

    testFindByName = async (name) => {
        let documentByName = await this.templateModel.findOne({ name: name })
        return documentByName
    }

    testFindAll = async () => {
        let allDocuments = await this.templateModel.find()
        return allDocuments
    }

    testSave = async (data) => {
        let templateDocument = new this.templateModel(data)
        await templateDocument.save()
    }
}