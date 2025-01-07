import Swal from "sweetalert2";

function AddItems() {

    const ownerEmail = localStorage.getItem('userEmail') || '';

    const handleAddItem = event => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const location = form.location.value;
        const category = form.category.value;
        const description = form.description.value;
        const last_seen = form.last_seen.value;
        const posting_date = form.posting_date.value;
        const requirements = form.requirements.value.split(",");
        const responsibilities = form.responsibilities.value.split(",");
        const status = form.status.value;
        const owner_name = form.owner_name.value;
        const images = form.images.value;

        const newItem = {
            title,
            location,
            category,
            description,
            last_seen,
            posting_date,
            requirements,
            responsibilities,
            status,
            owner_email: ownerEmail, 
            owner_name,
            images
        };

        console.log(newItem);

        fetch(`https://backtome.vercel.app/items`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Item added successfully",
                        icon: "success",
                        confirmButtonText: 'Cool'
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Item couldn't be added",
                        icon: "error",
                        confirmButtonText: 'Cool'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while adding the item",
                    icon: "error",
                    confirmButtonText: 'Cool'
                });
                console.log(error.message)
            });
    };

    return (
        <div className="bg-[#F4F3F0] p-8 md:p-16">
            <h1 className="text-3xl font-bold text-center mb-8">Add an Item</h1>

            <form onSubmit={handleAddItem} className="space-y-8">
                {/* Title and Category Row */}
                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Title</label>
                        <input
                            type="text"
                            placeholder="Item Title"
                            name="title"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Category</label>
                        <input
                            type="text"
                            placeholder="Category"
                            name="category"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                {/* Location and Description Row */}
                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Latitude, Longitude"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                {/* Dates and Status Row */}
                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Posting Date</label>
                        <input
                            type="datetime-local"
                            name="posting_date"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Last Seen</label>
                        <input
                            type="datetime-local"
                            name="last_seen"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                {/* Requirements and Responsibilities Row */}
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
                            placeholder="Item found, needs to be returned"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                {/* Status, Owner Information, and Image URL */}
                <div className="md:flex md:space-x-8">
                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Status</label>
                        <input
                            type="text" 
                            name="status"
                            placeholder="Recovered"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label-text text-lg font-semibold">Owner's Name</label>
                        <input
                            type="text"
                            name="owner_name"
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
                            placeholder="Image URL"
                            className="input input-bordered input-info w-full rounded-lg p-3 mt-2"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center items-center text-center mt-8">
                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-auto rounded-lg py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-lg">
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddItems;
