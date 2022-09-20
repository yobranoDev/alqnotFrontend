import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import _ from "lodash";

import { MemberContext } from "@src-contexts/MemberProvider";
import { AppContext } from "@src-contexts/AppProvider";

import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function AuthorsContainer() {
    const { member } = useContext(MemberContext);
    return (
        <Box>
            {member ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Followed Authors:
                    </Typography>

                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ pr: 3, m: 1 }}
                    >
                        {member.authors_followed?.map((author, index) => (
                            <Grid item xs={4} sm={4} md={4} key={index}>
                                <AuthorItem author={author} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Loading Authors...
                    </Typography>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ pr: 3, m: 1 }}
                    >
                        {_.range(5).map((_, index) => (
                            <Grid item xs={4} sm={4} md={4} key={index}>
                                <Skeleton
                                    variant="rectangular"
                                    width={"100%"}
                                    height={150}
                                    sx={{ borderRadius: "5px" }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
}

export function AuthorItem({ author }) {
    const { stringToColor, fullLink } = useContext(AppContext);
    const navigate = useNavigate();
    const { unfollowAuthor } = useContext(MemberContext);

    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "12rem",
                bgcolor: "#fff",
            }}
        >
            <Typography
                variant="h6"
                onClick={() => navigate(`/articles/author/${author.id}`)}
                sx={{
                    cursor: "pointer",
                    textTransform: "capitalize",
                    bgcolor: "#eee",
                    width: "100%",
                    textAlign: "center",
                    "&:hover": {
                        color: "teal",
                        textDecoration: "underline solid #004f4f 2px ",
                        textShadow: "2px 2px 5px #a6c3c3",
                    },
                }}
            >
                {author.username}
            </Typography>
            <Divider />
            {author?.avatar ? (
                <Avatar
                    sx={{
                        width: "5rem",
                        height: "5rem",
                        margin: 2,
                        bgcolor: stringToColor(author.username),
                        textTransform: "capitalize",
                        "&:hover": {
                            border: "1px solid teal",
                            boxShadow: "0 0 5px #60a3a3",
                            cursor: "pointer",
                        },
                    }}
                    src={fullLink(author.avatar)}
                    alt={author.username}
                    onClick={() => navigate(`/articles/author/${author.id}`)}
                />
            ) : (
                <Avatar
                    onClick={() => navigate(`/articles/author/${author.id}`)}
                    sx={{
                        width: "5rem",
                        height: "5rem",
                        margin: 2,
                        bgcolor: stringToColor(author.username),
                        "&:hover": {
                            border: "1px solid teal",
                            boxShadow: "0 0 5px #60a3a3",
                            cursor: "pointer",
                        },
                    }}
                    aria-label={author.username}
                >
                    {author.username[0].toUpperCase()}
                </Avatar>
            )}

            <Button
                onClick={() => unfollowAuthor([author.id])}
                sx={{
                    width: "100%",
                    borderRadius: "0 0 5px 5px",
                    "&:hover": {
                        bgcolor: "teal",
                        color: "white",
                    },
                }}
            >
                Unfollow
            </Button>
        </Paper>
    );
}

export default AuthorsContainer;
