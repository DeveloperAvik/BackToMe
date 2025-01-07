import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function LostItems() {
    const [lostItems, setLostItems] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if (loggedInUser) {
            setUserId(loggedInUser);
        }

        fetch("https://backtome.vercel.app/lostItems")
            .then((res) => res.json())
            .then((data) => {
                const userItems = data.filter(
                    (item) => item.owner && item.owner.user_id === loggedInUser
                );
                setLostItems(userItems);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const numberOfLostItems = lostItems.length;

    return (
        <>
            <Helmet>
                <title>My Lost Items - BackToMe</title>
                <meta name="description" content="This is the homepage where you can find lost and recovered items." />
            </Helmet>
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    My Lost Items: {numberOfLostItems}
                </h1>

                {/* Display message if no lost items are found */}
                {numberOfLostItems === 0 ? (
                    <p className="text-gray-600">You haven't added any lost items yet.</p>
                ) : (
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border-b">Title</th>
                                <th className="px-4 py-2 text-left border-b">Category</th>
                                <th className="px-4 py-2 text-left border-b">Status</th>
                                <th className="px-4 py-2 text-left border-b">Posting Date</th>
                                <th className="px-4 py-2 text-left border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lostItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b">{item.title}</td>
                                    <td className="px-4 py-2 border-b">{item.category}</td>
                                    <td className="px-4 py-2 border-b">{item.status}</td>
                                    <td className="px-4 py-2 border-b">
                                        {new Date(item.posting_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <Link
                                            to={`/items/${item._id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default LostItems;
