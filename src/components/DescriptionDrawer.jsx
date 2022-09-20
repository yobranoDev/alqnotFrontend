import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;
// TODO: Collapse if screen is small (950 width)
export default function DescriptionDrawer({
    headerBgImg,
    avatarImg,
    avatarOnClick,
    children,
}) {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="right"
            >
              
                <Box
                    sx={{
                        backdropFilter: "blur(5px)",
                        backgroundSize: "100px 100%",
                        width: "100%",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "70px",
                    }}
                >
                    <Box
                        component= "img"
                        src= {headerBgImg}
                        sx={{
                            filter: "blur(1px) brightness(65%)",
                            width: "100%",
                            height: "100%",
                            position: "fixed",
                            "z-index": -1, 
                        }}
                    ></Box>
                    <Avatar
                        onClick={() => (avatarOnClick ? avatarOnClick() : null)}
                        src={avatarImg?.length ? avatarImg : ""}
                        sx={{
                            height: "100px",
                            width: "100px",
                            marginTop: "40px",
                            border: "1px solid teal", 
                            "&:hover": avatarOnClick&&{
                                border: "1px solid teal",
                                boxShadow: "0 0 15px #60a3a3",
                                cursor: "pointer",
                            },
                        }}
                    />
                </Box>
                {children}
            </Drawer>
        </Box>
    );
}
