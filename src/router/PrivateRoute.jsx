import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-ring loading-lg items-center"></span>;
    }

    if (user) {
        return children; 
    }
    return (
        <Navigate
            to="/singin"
            state={{ from: location }} 
        />
    );
}

export default PrivateRoute;
