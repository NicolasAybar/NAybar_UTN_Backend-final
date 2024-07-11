const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const {database} = require('./config/connection.sql')

const { authRouter } = require('./auth/auth.router.js')
const { productRouter } = require('./products/products.router.js')
const { cartsRouter } = require('./carts/carts.router.js')

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/carts', cartsRouter)

/* TODO: verificar API-KEY */

app.listen(PORT, () =>{
    console.log('Nuestra aplicacion se ejecuta en el puerto: ' + PORT)
})