const express = require('express')
const cors = require('cors');
const {graphqlHTTP} =  require('express-graphql')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const app = express()

app.use(cors())

app.use(graphqlHTTP({
    schema,
    rootValue:resolver,
    graphiql:true
}))


const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log('serves running ...')
})