const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

schema.index({ _id: 1, seq: 1 }, { unique: true });

const Increment = new mongoose.model('Increment', schema);

const autoIncrementId = (modelName, doc, next) => {
  Increment.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, model) {
      if (error) {
        next(error);
        return;
      }
      doc.id = model.seq;
      next();
    }
  );
};

module.exports = { autoIncrementId };
