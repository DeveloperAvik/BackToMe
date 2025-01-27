import  { useContext } from "react";
import AuthContext from "../context/AuthContext"; 

function SocialLogin() {
    const { signInWithGoogle, user, loading } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle() 
            .then((result) => {
                const user = result.user;
                console.log("User signed in with Google: ", user);
            })
            .catch((error) => {
                console.error("Google Sign-In Error: ", error.message);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                </div>
            ) : (
                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                    Sign in with Google
                </button>
            )}
        </div>
    );
}

export default SocialLogin;
