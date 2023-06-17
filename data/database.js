import mongoose from "mongoose"

export const connectDb = () => {
    mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "backendapi"
    })
    .then((c) => { console.log(`mongodb is connected with ${c.connection.host}`) })
    .catch((err) => { console.log("mongodb error ") })
}