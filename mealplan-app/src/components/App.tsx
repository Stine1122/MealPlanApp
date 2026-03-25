import MealPlan from './mealplan/MealPlan'
import Inventory from './ingredients/Inventory'

function App() {
    return (
        <div className="text-sm lg:text-base flex flex-row px-32 h-screen overflow-hidden">
            
            <div className="flex flex-col w-1/4 h-full pt-15 pr-2 pb-10">
                <div className="flex flex-col gap-2 overflow-y-auto h-full pl-1 pr-1">
                    <Inventory type="fridge" />
                    <Inventory type="freezer" />
                    <Inventory type="pantry" />
                </div>
            </div>

            <MealPlan />
        </div>
    )
}

export default App

