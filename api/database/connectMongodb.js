// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();

//  const connectMongodb = async () => {
//     try {
//         await mongoose.connect(MONGO);
        
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.log('Database Connection Error')
//     }
// }

// export default connectMongodb;

import mongoose from 'mongoose'
import 'dotenv/config'

const connectMongodb = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error')
    }
}

export default connectMongodb;