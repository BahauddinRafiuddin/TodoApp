import mongoose from 'mongoose';
import {DB_NAME} from '../constant.js'

const connectMongoDb=async()=>{
    try {
        const connect=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Database Connected Successfully -DB Host :${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        console.log("Mongo Db Connection Failed!!")
        process.exit(1)
    }
}

export default connectMongoDb