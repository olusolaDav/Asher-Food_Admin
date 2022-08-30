import { useState } from 'react'
import { useMealsContext } from '../hooks/useMealsContext'

const MealForm = () => {
  const { dispatch } = useMealsContext()

  const [food, setFood] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const meal = {food, desc, price, img}
    
    const response = await fetch('/api/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setFood('')
      setDesc('')
      setPrice('')
      setImg('')
      dispatch({type: 'CREATE_MEAL', payload: json})
    }

  }

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setImg(file);
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Meal</h3>

      <label>Food:</label>
      <input 
        type="text" 
        onChange={(e) => setFood(e.target.value)} 
        value={food}
        className={emptyFields.includes('food') ? 'error' : ''}
      />

      <label>Food description:</label>
      <input 
        type="text" 
        onChange={(e) => setDesc(e.target.value)} 
        value={desc}
        className={emptyFields.includes('desc') ? 'error' : ''}
      />

      <label>Price (₦):</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />

<label>Upload the meal image</label>
<input 
        type="file" 
        onChange={handlePhoto} 
        accept=".jpeg, .jpg, .png"
        name="photo"
        className={emptyFields.includes('img') ? 'error' : ''}
      />

      <button>Add Meal</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MealForm