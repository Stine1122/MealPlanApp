import { type ListProps } from "../../types/food"
import { TrashIcon } from "@heroicons/react/24/outline";


function List({ list, setList }: ListProps) {

    return (
        <>
        {list.length > 0 && (
        <ul className="text-2xl mt-5 list-none flex flex-col gap-2 bg-amber-50/30 p-3 rounded-2xl w-full self-center">

            {list.map((item) => (
                <div className="flex flex-row self-center" key={item}>

                    <li className="self-center rounded p-1 font-items" key={item}>{item}</li>

                    <button className="text-red-800 self-center ml-2 hover:bg-red-400 cursor-pointer p-2 m-1 rounded-4xl" 
                            onClick={() => setList(list.filter(i => i !== item))}>
                            <TrashIcon className="h-5 w-5 transition-transform"/>
                    </button>

                </div>
            ))}

        </ul>
        )}
        </>
    )
}

export default List