import { useEffect, useState } from 'react'

function Headline() {
    const [headline, setHeadline] = useState("")

    const fetch_headline = async() => {
      await fetch("http://localhost:5043/headline")
        .then(h => h.text())
        .then(setHeadline)
        .catch(() => setHeadline("Error loading headline"));
    }

    useEffect(() => {
        fetch_headline();
    }, []); 

    return(
        <h1 className="text-center text-4xl font-bold mt-8">{headline}</h1>
    )
}

export default Headline