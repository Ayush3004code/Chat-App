import dotenv from "dotenv"
import connectMongo from "./db/connectDb.js"

dotenv.config({
    path:'./.env'
});

server.listen(port, () => {
    connectMongo();
    console.log(`Server is running on port ${port}`);
});