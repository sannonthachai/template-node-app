import { ImageModelResponse } from '../models/response/file_response'

export class FileService {
    
    constructor(FileRepository, fs) {
        this.fileRepository = FileRepository
        this.fs = fs
    }

    saveFileService(file) {
        let image = {
            name: String,
            data: String,
            contentType: String
        }

        image.name = file.file[0].originalFilename
        image.data = this.fs.readFileSync(file.file[0].path)
        image.contentType = file.file[0].headers["content-type"]

        this.fileRepository.saveFileRepository(image)

        return "OK"
    }

    getAllFilesService() {
        let allFilesDocuments = this.fileRepository.findAllFilesRepository()
        let response = allFilesDocuments.map(it => new ImageModelResponse(it))

        return response
    }

    readFileService(name) {
        let image = this.fileRepository.findFileByNameRepository(name)
        
        return image
    }


}