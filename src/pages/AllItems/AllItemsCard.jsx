import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AllItemsCard({ item, onDelete }) {
    const { _id, title, description, category, images, posting_date, status } = item;
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'This item will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`https://backtome.vercel.app/items/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The item has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });
                    onDelete(_id); 
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the item. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `An error occurred: ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <div className="flex justify-center p-4">
            <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-all duration-300">
                <figure>
                    <img src={images} alt={title} className="rounded-t-lg w-full h-48 object-cover" />
                </figure>
                <div className="card-body p-6">
                    <h2 className="card-title text-xl font-bold">{title}</h2>
                    <p className="text-sm text-gray-500 mb-4">{category}</p>
                    <p className="text-base text-gray-700 mb-4">{description}</p>
                    <div className="space-y-2">
                        <p><strong>Posting Date:</strong> {posting_date}</p>
                        <p><strong>Found Status:</strong> {status}</p>
                    </div>
                </div>
                <div className="card-footer text-center p-4">
                    <Link to={`/items/${_id}`}>
                        <button className="btn btn-primary">View Details</button>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="btn btn-danger ml-4"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllItemsCard;
