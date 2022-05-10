import mongoose from 'mongoose';
import db from '../../connections/dbConnection.js';

const stockSearchSchema = new mongoose.Schema(
    {
        stockName: {
            type: String,
            uppercase: true,
            required: true,
        },
        data: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
);

const stockSearch = db.model('StockSearch', stockSearchSchema);

export default stockSearch;