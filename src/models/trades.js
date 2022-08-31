const mongoose = require('mongoose');
const { autoIncrementId } = require('./increment');

const schema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    min: 1,
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    lowercase: true,
    required: true,
    trim: true,
  },
  user_id: {
    type: Number,
    unique: true,
    required: true,
    min: 1,
  },
  symbol: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 3,
  },
  shares: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0 || value > 100) {
        throw new Error('Shares value must be in range [1-100]');
      }
    },
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

schema.methods.toJSON = function () {
  const item = this.toObject();

  delete item._id;
  delete item.__v;
  item.timestamp = item.timestamp.getTime();

  return item;
};

schema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementId('Trades', this, next);
});

const Trades = new mongoose.model('Trades', schema);

module.exports = Trades;
