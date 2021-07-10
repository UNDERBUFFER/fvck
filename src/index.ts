import router from "./routes/main"
import middlewares from "./middlewares/main"
import Koa from "koa"
import mongoose from "mongoose"


const app = new Koa()

middlewares.forEach( middleware => app.use(middleware) )

app.use(router.routes())

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DATABASE_NAME || 'fvck'
})

app.listen(3000, () => {
    console.log("Koa started")
})

