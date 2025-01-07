import Lottie from "lottie-react";
import registerJson from "../../assets/team/register.json";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Register() {
    const { createUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });
    const [error, setError] = useState("");

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.");
            return;
        }
        setError("");

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Registered Successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
             <Helmet>
                <title>Register - BackToMe</title>
                <meta name="description" content="This is the homepage where you can find lost and recovered items." />
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={registerJson} />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="ml-8 mt-4 text-4xl font-bold text-center">Register Now!</h1>

                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Photo URL (optional)"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="Password"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogin />
                            <p className="text-center text-sm font-semi-bold text-base-400 mt-2">
                                Already have an account? <Link className="text-green-600" to="/singin">Login</Link>
                            </p>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
