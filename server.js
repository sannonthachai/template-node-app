import express from 'express'
import mongoose from 'mongoose'
import multiparty from 'multiparty'
import request from 'request'
import fs from 'fs'
import dotenv from 'dotenv'
import gridfs from 'gridfs-stream'
import { exceptionMiddleware } from './middleware/exception_middleware'
import { setting } from './setting'

// ################## Domains ####################
import { TemplateDomain } from './domains/template_domain'
import { FileDomain } from './domains/file_domain'

// ################## Repositories ####################
import { TemplateRepository } from './repositories/template_repository'
import { FileRepository } from './repositories/file_repository'

// ################## Services ####################
import { TemplateService } from './services/template_service'
import { FileService } from './services/file_service'

// ################## Controllers #################
import { TemplateController } from './controllers/template_controller'
import { FileController } from './controllers/file_controller'

dotenv.config()
mongoose.connect(setting.mongoURL, setting.options)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

// App
const app = express()

// ################## Set up #####################
app.use(express.json())
app.use(express.urlencoded())
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

// Initial Domains
const templateDomain = new TemplateDomain(mongoose)
const fileDomain = new FileDomain(mongoose)

// Initial Repositories
const templateRepository = new TemplateRepository(templateDomain)
const fileRepository = new FileRepository(fileDomain)

// Initial Services
const templateService = new TemplateService(templateRepository)
const fileService = new FileService(fileRepository, fs)

// Initial Controllers
const templateController = new TemplateController(express, templateService, request)
const fileController = new FileController(express, fileService, multiparty)

// ################## Routes #####################
app.use('/test', templateController.initial())
app.use('/file', fileController.initial())

// ################## register middleware ############
app.use(exceptionMiddleware)

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);