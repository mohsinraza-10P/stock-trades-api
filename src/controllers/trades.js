const Trade = require('../models/trades');

const create = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const trade = new Trade(body);
      await trade.save();
      resolve(trade);
    } catch (e) {
      reject(e);
    }
  });
};

const fetch = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const trade = await Trade.findOne({ id });
      if (!trade) {
        reject('ID not found');
        return;
      }
      resolve(trade);
    } catch (e) {
      reject('ID not found');
    }
  });
};

const fetchAll = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { type, user_id } = query;
      const trades = await Trade.find({ type, user_id });
      resolve(trades);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  create,
  fetch,
  fetchAll,
};
