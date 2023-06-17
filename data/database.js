import mongoose from "mongoose"

export const connectDb = () => {
    mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "backendapi"
    })
    .then(() => { console.log("mongodb is connected") })
    .catch((err) => { console.log("mongodb error ") })
}