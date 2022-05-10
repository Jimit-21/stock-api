import express from 'express';
import { getStockData } from './stockController.js';
import { auth } from '../../middleware/auth.js';
const stcokRouter = express.Router();

stcokRouter.post('/stockapi', auth, getStockData).get('/stockapi', auth, function (req, res) {
    res.render('search', { ohlc: null, error: null, name: null });
});

export default stcokRouter;