import MealPlan from './mealplan/MealPlan'
import Fridge from './ingredients/Inventory'

function App() {
    return (
        <div className="overflow-auto flex flex-row px-32 self-center">
            
            <div className="overflow-auto flex flex-col w-1/4 mb-15 mt-13 gap-10">
                <Fridge type="fridge" />
                <Fridge type="freezer" />
                <Fridge type="pantry" />
            </div>

            <MealPlan />
        </div>
    )
}

export default App

