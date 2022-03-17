import express from 'express'
import path from 'path'
import colors from 'colors'
import connectDB from   './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()
if(process.env.NODE_ENV==='developpement'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)
app.get('/',(req,res)=>{
    res.send('API is running ....')
})
app.use(notFound)
app.use(errorHandler)


const __dirname = path.resolve() 
app.use(express.static(path.join(__dirname, "/frontend/public")))
const PORT= process.env.PORT||5000
app.listen(PORT,console.log(
    `Server is running ${process.env.NODE_ENV} Mode on port ${PORT}`.yellow.bold
));