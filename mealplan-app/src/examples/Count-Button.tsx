import { useState } from 'react'

function CountButton() {
  const [count, setCount] = useState(0)

  return (
    <div className="rounded p-3 flex flex-col gap-3 self-center m-5">
          <button className="self-center cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" 
                  onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p className="read-the-docs">
            Click button as many times as you dare...
          </p>
        </div>
  )
}

export default CountButton