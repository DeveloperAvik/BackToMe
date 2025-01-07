// src/pages/SingIn/SingIn.jsx

import { useAuth } from "../../context/useAuth";  // Import the custom hook
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SingIn() {
  const { signInUser } = useAuth();  // Use the custom hook to get the function
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = { user: email };
        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });
        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">
            {/* Your Lottie animation */}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="ml-8 mt-4 text-4xl font-bold text-center">LogIn now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Log In</button>
              </div>
              <div className="divider">OR</div>
              <SocialLogin />
              <p className="text-center text-sm font-semi-bold text-base-400 mt-4">
                Don't have an account?{" "}
                <Link className="text-red-600" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingIn;