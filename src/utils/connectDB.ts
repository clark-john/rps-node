import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI as string)
}

export { connectDB }