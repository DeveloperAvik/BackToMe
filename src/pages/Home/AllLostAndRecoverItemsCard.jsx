import { Link } from "react-router-dom";
import UpdateItem from "../UpdateItem/UpdateItem";

function AllLostAndRecoverItemsCard({ item }) {
    const { title, description, category, images, posting_date, status, _id } = item;

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
                <div className="card-footer text-center p-4 space-x-4">
                    <Link to={`/items/${_id}`}>
                        <button className="btn btn-primary">View Details</button>
                    </Link>

                    <Link to={`/updateItems/${_id}`}>
                        <button className="btn btn-primary">Update </button>
                    </Link>
                  
                </div>
            </div>
        </div>
    );
}

export default AllLostAndRecoverItemsCard;
