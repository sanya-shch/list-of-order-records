const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new Schema({
  user_email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  currency: {
  type: String,
    required: true
  },
  status: {
    type: String,
      required: true
  }
});

schema.plugin(mongoosePaginate);

module.exports = model('Order', schema);