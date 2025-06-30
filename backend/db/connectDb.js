import mongoose from "mongoose";

const connectMongo = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to monogdb");
    } catch (error) {
        console.log("error connect to mongodb", error.message);
    }
}

export default connectMongo;