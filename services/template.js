import { TemplateModelResponse } from '../models/response/template_response'
import { TemplateModelRequest } from '../models/request/template'
import { ErrorHandler } from '../utils/error-handler'

export class TemplateService {
    
    constructor(TemplateRepository) {
        this.templateRepository = TemplateRepository
    }

    getDocumentByNameService = async (name) => {
        try {
            let documentByName = await this.templateRepository.testFindByName(name)
            let response = new TemplateModelResponse(documentByName)

            return response
        } catch (err) {
            throw new ErrorHandler(503, 'Service Unavailable')
        }
    }

    getAllDocumentService= async () => {
        try {
            let allDocument = await this.templateRepository.testFindAll()
            let response = allDocument.map(it => new TemplateModelResponse(it))
            
            return response
        } catch (err) {
            throw new ErrorHandler(503, 'Service Unavailable')
        }
    }

    postService = async (req) => {
        try {
            let templateModelRequest = new TemplateModelRequest(req)
            await this.templateRepository.testSave(templateModelRequest)
        } catch (err) {
            throw new ErrorHandler(503, 'Service Unavailable')
        }
    }
}