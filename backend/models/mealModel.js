const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
  food: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    data: Buffer,
  }

}, { timestamps: true })

module.exports = mongoose.model('Meal', mealSchema)