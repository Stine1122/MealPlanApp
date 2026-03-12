import MealPlan from './mealplan/MealPlan'
import Fridge from './food/Fridge'

function App() {
    return (
        <div className="overflow-auto flex flex-row px-32 self-center">

            <div className="overflow-auto flex flex-col gap-3 w-1/4">
                <Fridge type="fridge" />
            </div>

            <MealPlan />

            <div className="overflow-auto flex flex-col gap-3 w-1/4">
                <Fridge type="freezer" />
            </div>

        </div>
    )
}

export default App

