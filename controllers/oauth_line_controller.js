import { ErrorHandler } from '../middleware/exception_middleware'

export class TemplateController {
    
    constructor(router, request) {
        this.router = router
        this.request = request
    }

    initial() {
        this.authorizationReqLine()
        this.callbackAuthLine()

        return this.router
    }

    authorizationReqLine() {
        this.router.get('/auth', (req, res) => {
            let response_type = "code"
            let client_id = "1653967927"
            let redirect_uri = "https://587049cb.ngrok.io/test/callback"
            let state = "12345abcde"
            let scope = "profile%20openid"

            res.redirect(`https://access.line.me/oauth2/v2.1/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`)
        })
    }

    callbackAuthLine() {
        this.router.get('/callback', (req,res) => {
            console.log(req.query)
            console.log(req.query.code)
            let code = req.query.code
            this.request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url: 'https://api.line.me/oauth2/v2.1/token',
                form: {
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: "https://587049cb.ngrok.io/test/callback",
                    client_id: "1653967927",
                    client_secret: "2d2199add73d1d710f1588c7b634c21a"
                }
            }, (error, response, body) => {
                let bodyJson = JSON.parse(body)
                console.log(bodyJson)
                console.log(bodyJson.access_token)
                this.request.get({
                    headers: {'Authorization': `Bearer ${bodyJson.access_token}`},
                    url: 'https://api.line.me/v2/profile'
                }, (error, response, body) => {
                    console.log(body)
                })
              })
        })
    }
}