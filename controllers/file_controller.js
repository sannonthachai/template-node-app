export class FileController {

    constructor(router, FileService, multiparty) {
        this.router = router
        this.fileService = FileService
        this.multiparty = multiparty
    }

    initial() {
        this.router.post('/multipart', this.testPostMultipartController)
        this.router.get('/get-all-files', this.getAllFilesController)
        this.router.get('/read-file', this.readFileController)

        return this.router
    }

    testPostMultipartController = (req,res) => {
        let form = new this.multiparty.Form()
        form.parse(req, (err, fields, files) => {
            let response = this.fileService.saveFileService(files)

            res.json(response) 
        });
    }

    getAllFilesController = (req, res) => {
        let response = this.fileService.getAllFilesService()

        res.json(response)
    }
    
    readFileController = (req,res) => {
        let name = req.query.name
        let image = this.fileService.readFileService(name)
        
        res.contentType(image.contentType)
        res.send(image.data)
    }
}