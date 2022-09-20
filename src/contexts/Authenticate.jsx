/*
This context handles every thing to do with authentications of the user.
It works in hand with the useAxios where there is an interceptior that renews expired tokens.
The core features of the context comprise:
    1. signin and signout functionality.
    2. Creation of user object.
    3. Embeding of the auth-tokens in the local storage.
*/

import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

// Handles signin and signout functionalities
function Authenticate({ children }) {
    // -------------------------------- Initalize authentication hooks --------------------------------
    const baseURL = "https://alqnot.herokuapp.com";

    const localTokens = () =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null;

    const [authTokens, setAuthTokens] = useState(localTokens);

    const [user, setUser] = useState(() => {
        if (authTokens !== null) {
            return jwt_decode(authTokens.access);
        } else {
            return null;
        }
    });
    const [userID, setUserID] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (authTokens !== null) {
            let user = jwt_decode(authTokens.access);
            setUser(user);
        } else {
            setUser(null);
        }
    }, [authTokens]);

    // -------------------------------- Authentication Functions --------------------------------
    // User Authentication  --------------------------------
    const registerUser = (formData) => {
        axios
            .post(`${baseURL}/accounts/api/register/`, formData)
            .then((res) => {
                navigate("/profile/login");
            })
            .catch((err) => {
                console.log("Error at signup user:", err);
            });
    };

    const loginUser = (formData, nextContext) => {
        axios
            .post(`${baseURL}/accounts/api/token/`, formData)
            .then((res) => {
                embedUser(res.data);
                nextContext
                    ? navigate(nextContext.next, { state: nextContext.data })
                    : navigate("/profile");
            })
            .catch((err) => {
                console.log("Error at login:", err);
            });
    };

    const logoutUser = () => {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        setUser(null);
        navigate("/profile/login");
    };

    const updateUser = (api, formData) => {
        api.put(`${baseURL}/accounts/api/update/`, formData)
            .then((res) => {
                let temp = { ...user };
                temp.username = res.data.username;
                temp.email = res.data.email;
                setUser(temp);
                navigate("/profile");
            })
            .catch((err) => {
                console.log("Error at Update User: ", err);
            });
        
    };

    const updatePassword = (api, formData) => {
        api.put(`${baseURL}/accounts/api/update/password/`, formData)
        .then((res) => {
            console.log(res);
            logoutUser();
            navigate("/profile/login/");
        })
        .catch((err) => {
            console.log("Error at Update Password: ", err);
        });
       
    };
    const resetPassword = (api, formData) => {
        console.log(userID)
        api.post(`${baseURL}/accounts/api/reset/password/`, {...formData, id: userID})
        .then((res) => {
            console.log(res);
            navigate("/profile/login/");
        })
        .catch((err) => {
            console.log("Error at Update Password: ", err);
        });
       
    };
    const validateResetKey = (Key) => {
        let accepted = false
        axios
            .put(`${baseURL}/accounts/api/members/reset-key/`, {
                reset_key: Key,
            })
            .then((res) => {
                console.log(res.data.id);
                setUserID(res.data.id)
                accepted = true
            })
            .catch((err) => {
                console.log("Error at Reset Password: ", err);
            });
            return accepted
    };
    const getResetKey = (memberEmail) => {
        axios
            .post(`${baseURL}/accounts/api/members/reset-key/`, {
                email: memberEmail,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log("Error at Get Reset Key: ", err);
            });
    };

    const deregisterUser = (api) => {
        api.delete(`${baseURL}/accounts/api/delete/`)
            .then((res) => {
                logoutUser();
                navigate("/");
            })
            .catch((err) => {
                console.log("Error at Delete User:", err);
            });
    };

    // Tokken Mangement --------------------------------
    const embedUser = (tokens) => {
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        setAuthTokens(tokens);
        setUser(tokens);
    };

    const refreshTokens = () => {
        axios
            .post(`${baseURL}/accounts/api/token/refresh/`, {
                refresh: authTokens.refresh,
            })
            .then((res) => {
                embedUser(res.data);
            })
            .catch((err) => {
                cosole.log("Error at refresh Token:", err);
            });
    };

    const isAllowed = (allowed_groups) => {
        if (!allowed_groups) return true;
        return user.groups
            ?.map((group) => allowed_groups.indexOf(group.name))
            .map((res) => res !== -1)
            .indexOf(true) === -1
            ? false
            : true;
    };

    // -------------------------------- Context Provider --------------------------------
    const context = {
        // Data
        authTokens,
        user,
        baseURL,

        // Functions
        registerUser,
        updateUser,
        updatePassword,
        resetPassword,
        validateResetKey,
        getResetKey,
        loginUser,
        logoutUser,
        deregisterUser,
        setAuthTokens,
        refreshTokens,
        setUser,
        isAllowed,
        isAuthenticated: () => authTokens !== null && user !== null,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
}

export default Authenticate;
