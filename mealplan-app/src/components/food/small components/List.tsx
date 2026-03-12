import { type ListProps } from "../../../types/fridge"

function List({ list, setList }: ListProps) {

    return (
        <>
        {list.length > 0 && (
        <ul className="text-2xl mt-5 list-none flex flex-col gap-2 bg-amber-50/30 p-3 rounded-2xl w-full self-center">
            {list.map((item, _) => (
                <div className="flex flex-row2 self-center" key={item}>
                    <li className="self-center rounded p-1 font-items" key={item}>{item}</li>
                    <button className="text-red-800 text-sm self-center ml-2 bg-red-400 hover:bg-red-500 cursor-pointer pb-0.5 pr-1.5 pl-1.5 m-1 rounded-4xl" 
                            onClick={() => setList(list.filter(i => i !== item))}>
                            ×
                    </button>
                </div>
            ))}
        </ul>
        )}
        </>
    )
}

export default List