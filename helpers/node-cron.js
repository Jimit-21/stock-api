import nodeCron from 'node-cron';
import axios from 'axios';
import { DateTime } from 'luxon';
import Stock from '../components/stock/stockModel.js';

export const scanner = nodeCron.schedule('0 0 * * *', async () => {
    const stock = await Stock.find().select('stockName -_id');
    console.log(stock);
    for (var i in stock) {
        var data = await searchStocks(stock[i].stockName);
        console.log(data);
    }
});
async function searchStocks(stockName) {
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${process.env.API_KEY}`;
    const response = await axios(url);
    getChartData(response, stockName);
    return response;
}

async function getChartData(stockData, stockName) {
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
            d: date,
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
    var data = await Stock.findOneAndUpdate({ stockName }, { data: ohlc });
    console.log(data);
}

// export default scanner;