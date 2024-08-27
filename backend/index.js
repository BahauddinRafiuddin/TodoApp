import connectMongoDb from "./db/index.js";
import 'dotenv/config'
import { app } from "./app.js";

const port = process.env.PORT
connectMongoDb()
    .then(() => {
        app.listen(port, (req, res) => {
            console.log(`Server Is Runnig On Port: ${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.log("Mongo Db Connection Failed!!",error)
    })