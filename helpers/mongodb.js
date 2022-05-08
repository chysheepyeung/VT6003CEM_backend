const mongoClient = require('mongodb').MongoClient
const mongoAuth = require('../config.js')

const mongo_username = mongoAuth.configMongo.user
const mongo_password = mongoAuth.configMongo.password
const mongo_host = mongoAuth.configMongo.host

const DATABASE_NAME = mongoAuth.configMongo.dbname
const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host}`


exports.run_query = async function run_query(collection, query) {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray()
    return result
}

exports.run_insert = async function run_insert(collection, document) {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
    return { "status": 201, "description": "Data insert successfully" }
}

exports.run_delete = async function run_insert(collection, document) {
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
    return { "status": 201, "description": "Data delete successfully" }
}