import { TemplateModelResponse } from '../models/response/template_response'
import { TemplateModelRequest } from '../models/request/template_request'

export class TemplateService {
    
    constructor(TemplateRepository) {
        this.templateRepository = TemplateRepository
    }

    getDocumentByNameService(name) {
        let documentByName = this.templateRepository.testFindByName(name)
        let response = new TemplateModelResponse(documentByName)

        return response
    }

    getAllDocumentService() {
        let allDocument = this.templateRepository.testFindAll()
        let response = allDocument.map(it => new TemplateModelResponse(it))
        
        return response
    }

    postService(req) {
        let templateModelRequest = new TemplateModelRequest(req)
        this.templateRepository.testSave(templateModelRequest)

        return "OK"
    }
}