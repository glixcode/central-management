import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        if (error instanceof Error)
            console.log(`Error: ${error.message}`)
        else
            console.log(`An unknown error occurred: ${error}`)

        // process.exit(1)
    }
}