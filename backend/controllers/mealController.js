const Meal = require('../models/mealModel')
const mongoose = require('mongoose')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')
const { all } = require('../routes/meals')

// get all Meals
const getMeals = async (req, res) => {
  const Meals = await Meal.find({}).sort({createdAt: -1})

  res.status(200).json(Meals)
}

// get a single meal
const getMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Meal'})
  }

  const Meal = await Meal.findById(id)

  if (!meal) {
    return res.status(404).json({error: 'No such meal'})
  }

  res.status(200).json(meal)
}

//photo upload 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'image');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname) )
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

let upload = multer({storage, fileFilter});

// create a new meal
const createMeal = async  (req, res) => {
  const {food, desc, price, img} = req.body

  let emptyFields = []

  if (!food) {
    emptyFields.push('food')
  }
  if (!desc) {
    emptyFields.push('desc')
  }
  if (!price) {
    emptyFields.push('price')
  }
  if (!img) {
    emptyFields.push('img')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const meal = await Meal.create({ food, desc, price, img })
    res.status(200).json(meal)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a meal
const deleteMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such meal'})
  }

  const meal = await Meal.findOneAndDelete({_id: id})

  if(!meal) {
    return res.status(400).json({error: 'No such meal'})
  }

  res.status(200).json(meal)
}

// update a meal
const updateMeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such meal'})
  }

  const meal = await Meal.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!meal) {
    return res.status(400).json({error: 'No such meal'})
  }

  res.status(200).json(meal)
}

module.exports = {
  getMeals,
  getMeal,
  createMeal,
  deleteMeal,
  updateMeal,
  upload
}