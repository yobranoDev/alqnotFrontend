import React, { useContext, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@src-contexts/Authenticate";

import PasswordUpdate from "./components/PaswordUpdate";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [resetKey, setResetKey] = useState("");
    const [openKeyForm, setOpenKeyForm] = useState(false);
    const [openPasswordForm, setOpenPasswordForm] = useState(false);
    const { validateResetKey, getResetKey } = useContext(AuthContext);

    useEffect(() => {
        console.log(openKeyForm);
        openKeyForm && setEmail("");
        setResetKey("");
    }, [openKeyForm]);

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case "email":
                setEmail(event.target.value);
            case "resetKey":
                setResetKey(event.target.value);
            default:
                null;
        }
    };

    // murigibrian18@gmail.com
    const handleSubmit = (event) => {
        event.preventDefault();

        if (openKeyForm) {
            validateResetKey(resetKey);
            setOpenPasswordForm(true);
            // send key to b.e
            setOpenKeyForm(false);
        } else {
            if (email === "") return;
            getResetKey(email);
            setOpenKeyForm(true);
        }
    };
    return (
        <>
            {openKeyForm ? (
                <form onSubmit={handleSubmit}>
                    Check Your Email<i>(The spam section preferably)</i>.<br />
                    <input
                        type="text"
                        value={resetKey}
                        placeholder="Reset Key"
                        onChange={handleChange("resetKey")}
                        required
                    />
                    <br />
                    <input type="submit" value="Reset" />
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    Please enter your email. The one used when registering.
                    <br />
                    <input
                        type={"email"}
                        value={email}
                        placeholder="Registered Email"
                        onChange={handleChange("email")}
                        required
                    />
                    <br />
                    <input type="submit" />
                </form>
            )}
            <PasswordUpdate
                openPasswordForm={openPasswordForm}
                setOpenPasswordForm={setOpenPasswordForm}
                isReset={true}
            />
        </>
    );
}

export default ResetPassword;
