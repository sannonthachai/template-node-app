import { ErrorHandler } from '../utils/error-handler'

export class TemplateController {

    constructor(express, TemplateService) {
        this.router = express.Router()
        this.templateService = TemplateService
    }

    initial = () => {
        this.router.get('/get_all', this.testGetAll)
        this.router.get('/get_by_name', this.testGetByName)
        this.router.post('/post', this.testPost)
        this.router.get('/error', this.testError)
        this.router.get('/test', this.test)

        return this.router
    }

    testGetAll = async (req, res, next) => {
        try {
            let response = await this.templateService.getAllDocumentService()
            res.json(response)
            next()
        } catch (err) {
            next(err)
        }
    }

    testGetByName = async (req, res, next) => {
        try {
            if (!req.query.name) throw new ErrorHandler(400, 'Bad request')
            let response = await this.templateService.getDocumentByNameService(req.query.name)
            
            res.json(response)
            next()
        } catch (err) {
            next(err)
        }
    }

    testPost = async (req, res, next) => {
        try {
            await this.templateService.postService(req.body)
            res.json("OK")
            next()
        } catch (err) {
            next(err)
        }
    }

    testError = (req,res) => {
        throw new ErrorHandler(500, 'Internal server error')
    }

    test = (req, res, next) => {
        res.json("FUCK")
        next()
    }
}