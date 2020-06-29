import { ErrorHandler } from '../middleware/exception_middleware'

export class TemplateController {

    constructor(express, TemplateService) {
        this.router = express.Router()
        this.templateService = TemplateService
    }

    initial() {
        this.router.get('/get_all', this.testGetAll)
        this.router.get('/get_by_name', this.testGetByName)
        this.router.post('/post', this.testPost)
        this.router.get('/error', this.testError)
        this.router.get('/test', this.test)

        return this.router
    }

    testGetAll = (req, res) => {
        let response = this.templateService.getAllDocumentService()

        res.json(response)
    }

    testGetByName = (req, res) => {
        let name = req.query.name
        let response = this.templateService.getDocumentByNameService(name)
        
        res.json(response)
    }

    testPost = (req,res) => {
        let response = this.templateService.postService(req.body)
        
        res.json(response)
    }

    testError = (req,res) => {
        throw new ErrorHandler(500, 'Internal server error')
    }

    test = (req, res) => {
        res.json("FUCK")
    }
}