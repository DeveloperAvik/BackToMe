import { useEffect, useState } from "react";
import AllLostAndRecoverItemsCard from "./AllLostAndRecoverItemsCard";

function AllLostAndRecover() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/items")
            .then(res => res.json())
            .then(data => {
                const sortedItems = data.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
                setItems(sortedItems.slice(0, 9));
            });
    }, []);


    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Recent Items</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {items.map((item) => (
                    <AllLostAndRecoverItemsCard
                        key={item._id}
                        item={item}
                        
                    />
                ))}
            </div>
        </div>
    );
}

export default AllLostAndRecover;
