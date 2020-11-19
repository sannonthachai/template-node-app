import express from 'express'
import multiparty from 'multiparty'
import request from 'request'
import fs from 'fs'
import dotenv from 'dotenv'
import gridfs from 'gridfs-stream'
import { MongoConfig } from './config/mongodb'
import { exceptionMiddleware } from './middleware/exception'
import { LoggerService } from './config/winston'
import { LogMiddleware } from './middleware/log'

// ################## Domains ####################
import { TemplateDomain } from './domains/template'
import { FileDomain } from './domains/file'
import { LogDomain } from './domains/log'

// ################## Repositories ####################
import { TemplateRepository } from './repositories/template'
import { FileRepository } from './repositories/file'
import { LogRepository } from './repositories/log'

// ################## Services ####################
import { TemplateService } from './services/template'
import { FileService } from './services/file'

// ################## Controllers #################
import { TemplateController } from './controllers/template'
import { FileController } from './controllers/file'

// ################## Init Setting #####################
dotenv.config()
const mongoose = new MongoConfig(process.env.MONGO_URL, { 
    useNewUrlParser: process.env.OPTION_USE_NEW_URL_PARSER,
    useUnifiedTopology: process.env.OPTION_USER_UNIFIED_TOPOLOGY
}).connect()
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

// ################## register middleware before handler ############

// Initial Domains
const templateDomain = new TemplateDomain(mongoose)
const fileDomain = new FileDomain(mongoose)
const logDomain = new LogDomain(mongoose)

// Initial Repositories
const templateRepository = new TemplateRepository(templateDomain)
const fileRepository = new FileRepository(fileDomain)
const logRepository = new LogRepository(logDomain)

// Initial Services
const templateService = new TemplateService(templateRepository)
const fileService = new FileService(fileRepository, fs)

// Initial Controllers
const templateController = new TemplateController(express, templateService, request)
const fileController = new FileController(express, fileService, multiparty)

// Initial Log
const logService = new LoggerService(logRepository)
const logger = new LogMiddleware(logService)

// ################## Routes #####################
app.use('/test', templateController.initial())
app.use('/file', fileController.initial())

// ################## register middleware after handler ############
app.use(exceptionMiddleware)
app.use(logger.historyLog)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log('Server ready'))

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
})