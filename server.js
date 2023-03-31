const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { objectToString } = require('@vue/shared')
const { MongoClient } = require('mongodb')
const { isInvalidEmail , isEmptyPayload } = require('./validator')
app.use(bodyParser.json())


const uri = 'mongodb://127.0.0.1:27017/'
const client = new MongoClient(uri)
const dbname = 'companydb'
const collname = 'employees'

app.use('/',express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req,res){
    await client.connect()
    console.log('connected to database')

    const db = client.db(dbname)
    const collection = db.collection(collname)

    const result=await collection.findOne({id:1})
    console.log(result)

    client.close()

    response = {}
    
    if (result!==null){
        response = {
            name : result.name,
            email :result.email,
            interest : result.interest
        }
    }
    res.send(response)
})

app.post('/update-profile', async function(req,res){
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload))
    {
        res.send({error:'invalid payload'})
    } 
    
    else{
        await client.connect()
        console.log('connected to database')

        const db = client.db(dbname)
        const collection = db.collection(collname)

        payload['id']=1
        const updatedValues = { $set : payload}
        await collection.updateOne({id:1},updatedValues,{upsert: true})

        client.close()
        console.log('disconneected from database')

        res.send({info: "data updated"})
    }
})


const server = app.listen(3000,function(){
    console.log('running on 3000')
})


module.exports = {
    app,
    server
}