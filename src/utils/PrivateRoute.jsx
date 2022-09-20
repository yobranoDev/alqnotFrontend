import { AuthContext } from "@src-contexts/Authenticate";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ children }) {
    const { authTokens } = useContext(AuthContext);

    return (
        <>
            {authTokens ? (
                <>
                    <Outlet />
                    {children}
                </>
            ) : (
                <Navigate to="/profile/login" />
            )}
        </>
    );
}

export default PrivateRoute;
