import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@src-contexts/Authenticate";
import { MemberContext } from "@src-contexts/MemberProvider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function AvatarUpdate({ openAvatarForm, setOpenAvatarForm }) {
    const { member, uploadImages } = useContext(MemberContext);
    const [images, setImages] = useState({ background: null, avatar: null });

    const handleClose = () => {
        setImages({ background: null, avatar: null });
        setOpenAvatarForm(false);
    };
    const handleChange = (prop) => (event) => {
        console.log(event.target);
        switch (prop) {
            case "avatar":
                setImages({ ...images, avatar: event.target.files[0] });
                return;
            case "background":
                setImages({ ...images, background: event.target.files[0] });
                return;
            default:
                return;
        }
    };
    console.log(images.avatar && URL.createObjectURL(images.avatar));

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadImages(images);
        handleClose();
    };
    return (
        <Backdrop open={openAvatarForm}>
            <IconButton
                onClick={() => handleClose()}
                sx={{
                    position: "absolute",
                    top: "1rem",
                    bgcolor: "#bbb",
                    color: "teal",
                    "&:hover": { bgcolor: "teal", color: "white" },
                }}
            >
                <ClearIcon fontSize="large" />
            </IconButton>
            <Stack direction="row">
                <Paper elevation={3} sx={{ margin: 2, borderRadius: "5px" }}>
                    <Stack direction="column">
                        <Button
                            component="label"
                            onChange={handleChange("avatar")}
                            sx={{ p: 0 }}
                        >
                            <Box
                                component="img"
                                src={
                                    images.avatar !== null
                                        ? URL.createObjectURL(images.avatar)
                                        : member?.avatar
                                }
                                alt={member?.user.username + " Avatar"}
                                sx={{ width: 300, height: 250 }}
                            />
                            <input
                                hidden
                                name="avatar"
                                accept="image/*"
                                type="file"
                            />
                        </Button>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    paddingBlock: "1.2rem",
                                }}
                                component="label"
                                onChange={handleChange("avatar")}
                            >
                                Change Avatar
                                <input
                                    hidden
                                    name="avatar"
                                    accept="image/*"
                                    type="file"
                                />
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                variant={
                                    images.avatar !== null
                                        ? "contained"
                                        : "disabled"
                                }
                                color="success"
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    paddingBlock: "1.2rem",
                                }}
                            >
                                Upload
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
                <Paper elevation={3} sx={{ margin: 2, borderRadius: "5px" }}>
                    <Stack direction="column">
                        <Button
                            component="label"
                            onChange={handleChange("background")}
                            sx={{ p: 0 }}
                        >
                            <Box
                                component="img"
                                src={
                                    images.background !== null
                                        ? URL.createObjectURL(images.background)
                                        : member?.background
                                }
                                alt={member?.user.username + " Background"}
                                sx={{ width: 300, height: 250 }}
                            />
                            <input
                                hidden
                                name="background"
                                accept="image/jpeg,image/png,image/jpg"
                                type="file"
                            />
                        </Button>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    textAlign: "center",
                                }}
                                component="label"
                                onChange={handleChange("background")}
                            >
                                Change Background
                                <input
                                    hidden
                                    name="background"
                                    accept="image/jpeg,image/png,image/jpg"
                                    type="file"
                                />
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                variant={
                                    images.background !== null
                                        ? "contained"
                                        : "disabled"
                                }
                                color="success"
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    paddingBlock: "1.2rem",
                                }}
                            >
                                Upload
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Backdrop>
    );
}

export default AvatarUpdate;
