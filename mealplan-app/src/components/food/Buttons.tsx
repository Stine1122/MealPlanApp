import { type ListProps } from "../../types/food"

export function DeleteButtonList({ setList, str }: ListProps & { str: string }) {
    return (
        <button
            className="font-headline self-center cursor-pointer text-amber-50/80 bg-red-400 hover:bg-red-500 
            p-2 rounded-2xl mt-5"
            onClick={() => {
                setList([])
                localStorage.removeItem("shopping-list")
            }}
        >
            Ryd {str}
        </button>
    )
}

