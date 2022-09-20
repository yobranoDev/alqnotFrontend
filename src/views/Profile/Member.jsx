import React, { useContext, useState, useEffect } from "react";

import _ from "lodash";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import DescriptionDrawer from "@src-components/DescriptionDrawer";

import { AuthContext } from "@src-contexts/Authenticate";
import { MemberContext } from "@src-contexts/MemberProvider";

import AuthorsContainer from "./components/AuthorsContainer";
import HistoryContainer from "./components/HistoryContainer";
import FavouriteContainer from "./components/FavouriteContainer";
import AvatarUpdate from "./components/AvatarUpdate";

function Member() {
    const { getMember, member } = useContext(MemberContext);
    const [openAvatarForm, setOpenAvatarForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getMember();
    }, []);

    return (
        <Box sx={{ mr: 25 }}>
            {member ? (
                <>
                    <Box>
                        {member.authors_followed?.length !== 0 && (
                            <AuthorsContainer />
                        )}
                        {member.favourite_articles?.length !== 0 && (
                            <FavouriteContainer />
                        )}
                        {member.history_articles?.length !== 0 && (
                            <>
                                <Divider sx={{ m: "2rem 0" }} />
                                <HistoryContainer />
                            </>
                        )}
                    </Box>
                    <DescriptionDrawer
                        headerBgImg={member.background}
                        avatarImg={member.avatar}
                        avatarOnClick={() => setOpenAvatarForm(!openAvatarForm)}
                    >
                        <Button
                            sx={{ borderRadius: 0 }}
                            onClick={() => navigate("/profile/logout")}
                        >
                            Logout
                        </Button>
                        <Button
                            sx={{ borderRadius: 0 }}
                            onClick={() => navigate("/profile/update")}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={() => navigate("/profile/deregister")}
                            sx={{ borderRadius: 0 }}
                            color="error"
                        >
                            Delete Account
                        </Button>
                    </DescriptionDrawer>
                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <AvatarUpdate
                openAvatarForm={openAvatarForm}
                setOpenAvatarForm={setOpenAvatarForm}
            />
        </Box>
    );
}

export default Member;
