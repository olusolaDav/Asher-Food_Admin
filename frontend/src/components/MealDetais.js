import { useMealsContext } from '../hooks/useMealsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MealDetails = ({ meal }) => {
  const { dispatch } = useMealsContext()

  const handleClick = async () => {
    const response = await fetch('/api/meals/' + meal._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_MEAL', payload: json})
    }
  }

  return (
    <div className="meal-details">
      <h4>{meal.food}</h4>
      <div>
        <p><strong>Food description: </strong>{meal.description}</p>
        <p><strong>Price of food: </strong>{meal.price}</p>
        <p>{formatDistanceToNow(new Date(meal.createdAt), { addSuffix: true })}</p>
        <span><img src={meal.img} alt={meal.food} />   </span>
      </div>
      
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default MealDetails