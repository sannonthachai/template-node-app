export const setting = {
    mongoURL: process.env.MONGO_URL,
    options: { 
        useNewUrlParser: process.env.OPTION_USE_NEW_URL_PARSER,
        useUnifiedTopology: process.env.OPTION_USER_UNIFIED_TOPOLOGY
    }
}