import { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [formStatus, setFormStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus("Please fill in all fields.");
            return;
        }

        setFormStatus("Your message has been sent!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 border rounded-lg shadow-lg bg-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

            {formStatus && (
                <div
                    className={`mb-4 p-4 text-center rounded ${formStatus.includes("sent") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}
                >
                    {formStatus}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full h-40 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your message"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Contact;
