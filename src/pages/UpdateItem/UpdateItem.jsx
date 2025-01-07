import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateItem() {
    const item = useLoaderData();
    const navigate = useNavigate();

    const { 
        title, 
        location, 
        responsibilities, 
        last_seen, 
        posting_date, 
        description, 
        images, 
        owner_email, 
        owner_name, 
        category, 
        status, 
        reward_offered,
        _id 
    } = item;

    const ownerEmail = localStorage.getItem('userEmail') || '';

    const handleUpdateItem = event => {
        event.preventDefault();

        const form = event.target;
        
        const updatedItem = {
            title: form.title.value,
            location: form.location.value,
            category: form.category.value,
            description: form.description.value,
            last_seen: form.last_seen.value,
            posting_date: form.posting_date.value,
            requirements: form.requirements.value.split(",").map(item => item.trim()),
            responsibilities: form.responsibilities.value.split(",").map(item => item.trim()),
            status: form.status.value,
            owner_name: form.owner_name.value,
            owner_email: ownerEmail,
            images: form.images.value,
        };

        fetch(`http://localhost:3000/items/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(updatedItem)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Item updated successfully",
                    icon: "success",
                    confirmButtonText: 'Cool'
                }).then(() => {
                    navigate('/items');
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Item couldn't be updated",
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the item",
                icon: "error",
                confirmButtonText: 'Cool'
            });
        });
    };

    return (
        <div className="bg-[#F4F3F0] p-8 md:p-16">
            <h1 className="text-3xl font-bold text-center mb-8">Update Item</h1>

            <form onSubmit={handleUpdateItem} className="space-y-8">
                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Title</label>
                        <input
                            type="text"
                            placeholder="Item Title"
                            name="title"
                            defaultValue={title}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Category</label>
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            defaultValue={category}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Latitude, Longitude"
                            defaultValue={location}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            defaultValue={description}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Posting Date</label>
                        <input
                            type="datetime-local"
                            name="posting_date"
                            defaultValue={posting_date.slice(0, 16)}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Last Seen</label>
                        <input
                            type="datetime-local"
                            name="last_seen"
                            defaultValue={last_seen.slice(0, 16)}
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Requirements (comma-separated)</label>
                        <input
                            type="text"
                            name="requirements"
                            placeholder="Backpack, Black, Laptop"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Responsibilities (comma-separated)</label>
                        <input
                            type="text"
                            name="responsibilities"
                            defaultValue={responsibilities.join(', ')}
                            placeholder="Item found, needs to be returned"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Status</label>
                        <input
                            type="text"
                            name="status"
                            defaultValue={status}
                            placeholder="Recovered"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Owner's Name</label>
                        <input
                            type="text"
                            name="owner_name"
                            defaultValue={owner_name}
                            placeholder="Owner's Name"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Owner's Email</label>
                        <input
                            type="email"
                            name="owner_email"
                            value={ownerEmail}
                            readOnly
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Image URL</label>
                        <input
                            type="text"
                            name="images"
                            defaultValue={images}
                            placeholder="Image URL"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center text-center mt-8">
                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-auto rounded-lg py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-lg">
                        Update Item
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateItem;
