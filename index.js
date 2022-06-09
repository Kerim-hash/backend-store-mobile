const express = require('express')
const morgan  = require('morgan')
const bodyParser  = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv/config')
// import 
const productRouter = require('./routes/product')
const CategoryRouter = require('./routes/categories')
const userRouter = require('./routes/users')
const orderRouter = require('./routes/orders')
const authJwt = require('./helpers/jwt')
const res = require('express/lib/response')

// промежуточное программное обеспечение
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
// app.use(authJwt());
// mongoose connect
mongoose
    .connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error));
    
// routes
app.use('/api/products', productRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)


// listen
var server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port
    console.log('server listening on port ' + port )
}) 