import { useEffect } from "react"
import { useMealsContext } from "../hooks/useMealsContext"

// components
import MealDetails from "../components/MealDetais"
import MealForm from "../components/MealForm"

const Home = () => {
  const { meals, dispatch } = useMealsContext()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/api/meals')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_MEALS', payload: json})
      }
    }

    fetchMeals()
  }, [dispatch])

  return (
    <div className="home">
      <div className="meals">
        {meals && meals.map(meal => (
          <MealDetails meal={meal} key={meal._id} />
        ))}
      </div>
      <MealForm />
    </div>
  )
}

export default Home