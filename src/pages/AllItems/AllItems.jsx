import { useLoaderData } from 'react-router-dom';
import AllItemsCard from './AllItemsCard';
import { BsListColumnsReverse } from "react-icons/bs";
import { PiTextColumnsBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

function AllItems() {
    const allItems = useLoaderData();
    const [viewType, setViewType] = useState('card');
    const [items, setItems] = useState(allItems);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://backtome.vercel.app/items/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item._id !== id));
            } else {
                alert('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('There was an error deleting the item.');
        }
    };

    const toggleView = (type) => {
        setViewType(type);
    };

    return (
        <>
            <Helmet>
                <title>All Items - BackToMe</title>
                <meta name="description" content="This is the homepage where you can find lost and recovered items." />
            </Helmet>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mt-10">All Items</h1>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={() => toggleView('card')}
                        className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <BsListColumnsReverse />
                        <span>Card Items</span>
                    </button>
                    <button
                        onClick={() => toggleView('table')}
                        className="flex items-center space-x-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        <PiTextColumnsBold />
                        <span>Table Items</span>
                    </button>
                </div>

                {viewType === 'card' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {
                            items.length === 0 ? (
                                <p className="text-center text-xl col-span-full">No items found.</p>
                            ) : (
                                items.map(item => (
                                    <AllItemsCard
                                        key={item._id}
                                        item={item}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )
                        }
                    </div>
                ) : (
                    <div className="mt-10">
                        {items.length === 0 ? (
                            <p className="text-center text-xl">No items found.</p>
                        ) : (
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2">Item Name</th>
                                        <th className="border px-4 py-2">Category</th>
                                        <th className="border px-4 py-2">Status</th>
                                        <th className="border px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{item.title}</td>
                                            <td className="border px-4 py-2">{item.category}</td>
                                            <td className="border px-4 py-2">{item.status}</td>
                                            <td className="border px-4 py-3 gap-2 flex">
                                                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-700">
                                                    <Link to={`/items/${item._id}`}>
                                                        View Details
                                                    </Link>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 ml-2"
                                                >
                                                    Delete
                                                </button>
                                                <div>
                                                    <Link to={`/updateItems/${item._id}`}>
                                                        <button className='btn '>Update </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default AllItems;
