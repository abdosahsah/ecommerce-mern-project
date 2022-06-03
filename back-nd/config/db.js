import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log('Database connect successfully')

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connectDB