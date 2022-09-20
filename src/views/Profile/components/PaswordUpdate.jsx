import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "@src-contexts/Authenticate";
import { MemberContext } from "@src-contexts/MemberProvider";
import useAxios from "@src-utils/useAxios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";

// TODO: include old passord
export default function PasswordUpdate({
    openPasswordForm,
    setOpenPasswordForm,
    isReset,
}) {
    const { updatePassword, resetPassword } = useContext(AuthContext);
    const api = useAxios();

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        password: "",
        password2: "",
        showOldPassword: false,
        showPassword: false,
        showPassword2: false,
    });
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const handleChange = (prop) => (event) => {
        setPasswordData({ ...passwordData, [prop]: event.target.value });
    };

    const handleIconClick = (prop) => (event) => {
        switch (prop) {
            case "password":
                setPasswordData({
                    ...passwordData,
                    showPassword: !passwordData.showPassword,
                });
                return;
            case "oldPassword":
                setPasswordData({
                    ...passwordData,
                    showOldPassword: !passwordData.showOldPassword,
                });
                return;

            case "password2":
                console.log("Clicked");
                setPasswordData({
                    ...passwordData,
                    showPassword2: !passwordData.showPassword2,
                });
                return;

            default:
                null;
        }
    };

    const handleIconMouseDown = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordData.password !== passwordData.password2) {
            console.log("Should be the same");
        } else {
            console.log("sending data");
            isReset
                ? resetPassword(api, {
                      password: passwordData.password,
                      password2: passwordData.password2,
                  })
                : updatePassword(api, {
                      old_password: passwordData.oldPassword,
                      password: passwordData.password,
                      password2: passwordData.password2,
                  });
        }
    };
    return (
        <>
            <Backdrop
                sx={{
                    backdropFilter: "blur(2px)",
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openPasswordForm}
            >
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
                        <Stack
                            direction={"row"}
                            alignItems="center"
                            spacing={4}
                        >
                            <Typography variant="h4" sx={{ flexGrow: 1 }}>
                                Change Password
                            </Typography>
                            <IconButton
                                onClick={() => setOpenPasswordForm(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <Stack component="form" onSubmit={handleSubmit}>
                            {/* Old Password Entry */}
                            {!isReset && (
                                <FormControl sx={{ mb: 2 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-old-password">
                                        Current Password
                                    </InputLabel>
                                    <FilledInput
                                        id="filled-adornment-old-password"
                                        type={
                                            passwordData.showOldPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={passwordData.oldPassword}
                                        onChange={handleChange("oldPassword")}
                                        ref={oldPasswordRef}
                                        required={true}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle old password visibility"
                                                    onClick={handleIconClick(
                                                        "oldPassword"
                                                    )}
                                                    onMouseDown={
                                                        handleIconMouseDown
                                                    }
                                                    edge="end"
                                                >
                                                    {passwordData.showOldPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            )}

                            {/* Password Entry */}
                            <FormControl sx={{ mb: 2 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">
                                    New Password
                                </InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={
                                        passwordData.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={passwordData.password}
                                    onChange={handleChange("password")}
                                    ref={passwordRef}
                                    required={true}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleIconClick(
                                                    "password"
                                                )}
                                                onMouseDown={
                                                    handleIconMouseDown
                                                }
                                                edge="end"
                                            >
                                                {passwordData.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            {/* Password Confirmation Entry */}
                            <FormControl sx={{ mb: 2 }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password2">
                                    Confirm New Password
                                </InputLabel>
                                <FilledInput
                                    id="filled-adornment-password2"
                                    type={
                                        passwordData.showPassword2
                                            ? "text"
                                            : "password"
                                    }
                                    value={passwordData.password2}
                                    onChange={handleChange("password2")}
                                    ref={password2Ref}
                                    required={true}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password2 visibility"
                                                onClick={handleIconClick(
                                                    "password2"
                                                )}
                                                onMouseDown={
                                                    handleIconMouseDown
                                                }
                                                edge="end"
                                            >
                                                {passwordData.showPassword2 ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            {/* Submittion Buttons */}
                            <Stack direction="row-reverse">
                                <Button
                                    variant="contained"
                                    sx={{ ml: 1 }}
                                    onClick={handleSubmit}
                                    type="submit"
                                >
                                    Change
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
            </Backdrop>
        </>
    );
}
