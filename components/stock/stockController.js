import axios from 'axios';
import { DateTime } from 'luxon';
import logger from '../../config/logger.js';
import { getChartDataService, searchStocksInDBService, storeSearchInDBService, storeSearchService } from './stockService.js';

async function getChartData(stockData, stockName, userId) {
    var ohlc = [];
    var dataLength = stockData.data['Time Series (Daily)'];
    var count = 0;
    for (var time in dataLength) {
        var stockInfo = dataLength[time];
        var date = DateTime.fromSQL(time).ts;
        var open = Number(stockInfo['1. open']);
        var close = Number(stockInfo['2. high']);
        var high = Number(stockInfo['3. low']);
        var low = Number(stockInfo['4. close']);
        ohlc.push({
            x: date,
            o: open,
            h: high,
            l: low,
            c: close,
        });
        if (count > 5) {
            break;
        }
        count++;
    }

    // console.log("stockName", stockName);
    const storeInDB = await getChartDataService({
        stockName: stockName,
        data: ohlc
    });

    await storeSearchInDB(stockName, storeInDB.id, userId);
    return ohlc;
}

export const getStockData = async (req, res, next) => {
    try {
        logger.info('in get stock');
        const { stockName } = req.body;
        // const userId = req.user.id;

        const data = await searchStocksInDB(stockName.toUpperCase());
        console.log("data", data);

        if (data) {
            await storeSearchInDB(data.stockName, data.id, req.user.id);
            logger.info('stock name' + data.stockName);
            var data1 = JSON.stringify(data.data);
            return res.render('search', {
                ohlc: data1,
                error: null,
                name: data.stockName,
            });
        }

        const stockData = await searchStocks(stockName);
        if (!stockData.data['Error Message']) {
            var ohlc = await getChartData(stockData, stockName, req.user.id);
            var data1 = JSON.stringify(ohlc);
            return res.render('search', {
                ohlc: data1,
                error: null,
                name: stockName,
            });
        }

        return res.render('search', {
            ohlc: null,
            error: 'Invalid name',
            name: null,
    });
    } catch (error) {
        logger.error(error);
        next();
    }
};

async function searchStocks(stockName) {
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${process.env.API_KEY}`;
    const response = await axios(url);
    return response;
}

async function searchStocksInDB(stockName) {
    // console.log(stockName);
    const stock = await searchStocksInDBService({ stockName });
    return stock;
}

async function storeSearchInDB(stockName, dataId, userId) {
    // console.log('user id ' + userId);
    const stock = await storeSearchInDBService({ stockName, user: userId });
    if (stock) {
      return;
    }
    
    const storeSearchInDB = await storeSearchService({
      stockName: stockName,
      user: userId,
      data: dataId,
    });
    return;
};