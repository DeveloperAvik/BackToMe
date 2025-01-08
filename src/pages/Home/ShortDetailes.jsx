import { useState } from "react"

function ShortDetailes() {

    const [allItems, setAllItems] = useState([])
    const [lostItems, setLostItems] = useState([])
    const [recoverItems, setRecoverItems] = useState([])


    useState(() => {
        fetch("https://backtome.vercel.app/items")
            .then(res => res.json())
            .then(data => setAllItems(data))
    }, [])


    useState(() => {
        fetch("https://backtome.vercel.app/lostItems")
            .then(res => res.json())
            .then(data => setLostItems(data))
    }, [])


    useState(() => {
        fetch("https://backtome.vercel.app/recoverItems")
            .then(res => res.json())
            .then(data => setRecoverItems(data))
    }, [])

    return (
        <>

            <div className="mt-10 text-center text-4xl font-bold">
                <h1>The Number Of Items </h1>
            </div>
            <div className="mt-10 flex lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">

                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center font-bold text-2xl">{allItems.length}</h2>
                        <p>The Number of Items Listed on our Website</p>

                    </div>
                </div>


                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center font-bold text-2xl">{lostItems.length}</h2>
                        <p>The Number of Lost Items Listed on our Website</p>

                    </div>
                </div>


                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                    <h2 className="text-center font-bold text-2xl">{recoverItems.length}</h2>
                    <p>The Number of Recover Items Listed on our Website</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortDetailes
