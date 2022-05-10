import mongoose from 'mongoose';
import db from '../../connections/dbConnection.js';

const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true
    },
    data: [
        {
            x: String,
            o: String,
            h: String,
            l: String,
            c: String
        },
    ]
},
{ timestamps: true }
);

const Stock = db.model('Stock', stockSchema);

export default Stock;