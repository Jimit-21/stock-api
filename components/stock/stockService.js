import Stock from './stockModel.js';
import stockSearch from './stockSearchModel.js';

export const getChartDataService = async(data) => {
    const storeInDB = await Stock.create(data);
    return storeInDB;
};

export const searchStocksInDBService = async(data) => {
    const stock = await Stock.findOne(data);
    return stock;
};

export const storeSearchInDBService = async(data) => {
    const stock = await stockSearch.findOne(data);
    return stock;
};

export const storeSearchService = async(data) => {
    const storeSearch = await stockSearch.create(data);
    return storeSearch;
};