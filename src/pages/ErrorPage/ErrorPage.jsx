import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>Error - BackToMe</title>
                <meta name="description" content="This is the homepage where you can find lost and recovered items." />
            </Helmet>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
                    <p className="text-xl text-gray-700 mb-6">Oops! Something went wrong.</p>
                    <p className="text-lg text-gray-500 mb-8">The page you're looking for doesn't exist or an error occurred.</p>
                    <Link href="/" className="btn btn-primary">Go Back Home</Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;