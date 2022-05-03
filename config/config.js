import dotenv from "dotenv";
dotenv.config();
  
const config = { 
    server : {
        port: process.env.PORT,
    },
    db : {
        uri: process.env.MONGO_URI
    },
    jwtSecret : process.env.JWT_SECRET
 };

export default config;