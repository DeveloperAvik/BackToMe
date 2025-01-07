import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../../context/useAuth'; 

const ItemsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();  
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [recoveryDetails, setRecoveryDetails] = useState({
        location: '',
        date: new Date(),
    });

    useEffect(() => {
        fetch(`http://localhost:3000/items/${id}`)
            .then(res => res.json())
            .then(data => {
                setItem(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching item:", error);
                setLoading(false); 
            });
    }, [id]);

    const handleRecoverySubmit = () => {
        if (!user) {
            Swal.fire('Not Logged In', 'Please log in to recover the item.', 'error');
            navigate('/login');
            return;
        }

        if (item.status === "Recovered") {
            Swal.fire('Already Recovered', 'This item has already been marked as recovered.', 'error');
            return;
        }

        const recoveryData = {
            itemId: item._id,
            recoveredLocation: recoveryDetails.location,
            recoveryDate: recoveryDetails.date,
            recoveredBy: user.email,
            recoveredPersonName: user.displayName || user.name,
            recoveredPersonImage: user.photoURL || user.image,
        };

        fetch('http://localhost:3000/recoveries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recoveryData),
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire('Recovered!', 'The item has been marked as recovered.', 'success');
            return fetch(`http://localhost:3000/items/${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Recovered' }),
            });
        })
        .then(() => {
            setModalOpen(false); // Close the modal
            navigate('/items');
        })
        .catch(error => {
            Swal.fire('Error', 'An error occurred while recovering the item.', 'error');
            console.error(error);
        });
    };

    if (loading) return <p>Loading item details...</p>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Item Header */}
                <div className="bg-gray-100 p-6">
                    <h1 className="text-3xl font-semibold text-gray-900">{item.title}</h1>
                    <p className="text-md text-gray-600">{item.category}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Status: <span className={`${item.status === 'Recovered' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</span>
                    </p>
                </div>

                {/* Item Image */}
                <div className="relative w-full h-96">
                    <img src={item.images} alt={item.title} className="w-full h-full object-cover rounded-t-lg" />
                </div>

                {/* Item Details */}
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-gray-800">Description</h2>
                        <p className="text-lg text-gray-700 mt-2">{item.description}</p>
                    </div>

                    {/* Owner Information */}
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-gray-800">Owner Information</h2>
                        <p className="text-lg text-gray-700 mt-2">Owner: <span className="font-semibold">{item.owner_name}</span></p>
                        <p className="text-lg text-gray-700">Email: 
                            <a href={`mailto:${item.owner_email}`} className="text-blue-600 hover:underline">{item.owner_email}</a>
                        </p>
                    </div>

                    {/* Tags and Date */}
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-gray-800">Item Details</h2>
                        <p className="text-lg text-gray-700 mt-2">Posting Date: {new Date(item.posting_date).toLocaleDateString()}</p>
                        <p className="text-lg text-gray-700">Last Seen: {new Date(item.last_seen).toLocaleDateString()}</p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-gray-800">Responsibilities</h2>
                        <ul className="list-disc pl-5 text-lg text-gray-700 mt-2">
                            {item.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                            ))}
                        </ul>
                    </div>

                    {item.status !== 'Recovered' && (
                        <button
                            onClick={() => setModalOpen(true)}
                            className={`mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg`}
                        >
                            {item.type === 'Lost' ? 'Found This!' : 'This is Mine!'}
                        </button>
                    )}
                </div>

                {modalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                            <h2 className="text-xl font-semibold mb-4">Provide Recovery Information</h2>
                            <label className="block text-gray-700">Recovered Location:</label>
                            <input
                                type="text"
                                value={recoveryDetails.location}
                                onChange={(e) => setRecoveryDetails({...recoveryDetails, location: e.target.value})}
                                className="w-full px-4 py-2 border rounded mt-2"
                            />
                            <label className="block text-gray-700 mt-4">Recovered Date:</label>
                            <DatePicker
                                selected={recoveryDetails.date}
                                onChange={(date) => setRecoveryDetails({...recoveryDetails, date})}
                                className="w-full px-4 py-2 border rounded mt-2"
                            />
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRecoverySubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsDetails;
