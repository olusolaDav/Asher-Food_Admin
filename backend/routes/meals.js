const express = require('express')
const {
  getMeals,
  getMeal,
  createMeal,
  deleteMeal,
  updateMeal,
  upload
} = require('../controllers/mealController')

const router = express.Router()



// GET all meals
router.get('/', getMeals)

// GET a single meal
router.get('/:id', getMeal)

// POST a new meal
router.post('/',upload.single('img'),createMeal)

// DELETE a meal
router.delete('/:id', deleteMeal)

// UPDATE a meal
router.patch('/:id',  updateMeal)

module.exports = router