import { cleanEnv } from "envalid"
import { str, port } from "envalid"

export default cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port(),
})