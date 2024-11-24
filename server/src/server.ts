import app from "./app"
import mongoose from "mongoose"
import env from "./util/validateEnv"

mongoose.connect(env.MONGO_URI)
    .then(()=>{
        console.log('DB connected');
        app.listen(env.PORT, ()=>{
            console.log("server running on port " + env.PORT);
        })  
    })
    .catch(console.error)
