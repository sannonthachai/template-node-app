export class FileRepository {

    constructor(FileDomain) {
        this.fileDomain = FileDomain
        this.fileModel = this.fileDomain.initialModel()
    }

    async saveFileRepository(data) {
        let fileDocument = new this.fileModel(data)
        await fileDocument.save()
    }

    async findAllFilesRepository() {
        let allFilesDocuments = await this.fileModel.find()

        return allFilesDocuments
    }

    async findFileByNameRepository(name) {
        let image = await this.fileModel.findOne({ name: name })

        return image
    }
}