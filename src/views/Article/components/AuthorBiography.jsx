import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MemberContext } from "@src-contexts/MemberProvider";
import { ArticleContext } from "@src-contexts/ArticleProvider";
import DescriptionDrawer from "@src-components/DescriptionDrawer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

import Skeleton from "@mui/material/Skeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import _ from "lodash";

export default function AuthorBiography({ author }) {
    const navigate = useNavigate();
    const { member, isAuthorFollowed, followAuthor, unfollowAuthor } =
        useContext(MemberContext);

    const handleClickFollow = () => {
        if (isAuthorFollowed(author)) {
            unfollowAuthor([author.id]);
        } else {
            followAuthor([author.id]);
        }
    };

    return (
        <>
            {author ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        maxWidth: "850px",
                        position: "relative",
                    }}
                >
                    <ButtonBase>
                        <Avatar
                            src={author.avatar}
                            alt={author.user.username + " Avatar"}
                            onClick={() =>
                                navigate(`/articles/author/${author.id}`)
                            }
                            sx={{
                                width: "7rem",
                                height: "7rem",
                                position: "absolute",
                                top: "auto",
                                left: 0,
                                "z-index": 1,
                                cursor: "pointer",
                                boxShadow: "0 0 15px #60a3a3",
                                "&:hover": {
                                    boxShadow: "0 0 25px teal",
                                },
                            }}
                        />
                    </ButtonBase>
                    <Paper elevation={3} sx={{ ml: "3rem", display: "flex" }}>
                        <Box
                            component="img"
                            src={author.background}
                            alt={author.user.username + " Background"}
                            sx={{
                                width: "6rem",
                                filter: "blur(1px) brightness(65%)",
                                borderRadius: "5px 0 0 5px",
                                "z-index": 0,
                            }}
                        />
                        <Container sx={{ p: 1 }}>
                            <Typography
                                variant="body2"
                                onClick={() =>
                                    navigate(`/articles/author/${author.id}`)
                                }
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    marginBottom: "1rem",
                                    "&:hover": {
                                        color: "teal",
                                        textDecoration:
                                            "underline solid #004f4f 2px ",
                                        textShadow: "0 0  5px #a6c3c3",
                                    },
                                }}
                            >
                                {author.user.username}
                            </Typography>
                            <Typography
                                component="div"
                                sx={{
                                    textAlign: "justify",
                                    height: "6rem",
                                    overflow: "hidden",
                                }}
                            >
                                {author.biography}
                            </Typography>
                            <Stack
                                direction="row-reverse"
                                spacing={1}
                                sx={{ paddingBlock: 1 }}
                            >
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/articles/author/${author.id}`
                                        )
                                    }
                                    variant="outlined"
                                    startIcon={<VisibilityIcon />}
                                >
                                    View profile
                                </Button>
                                {member && (
                                    <Button onClick={handleClickFollow}>
                                        {isAuthorFollowed(author)
                                            ? "Unfollow"
                                            : "Follow"}
                                    </Button>
                                )}
                            </Stack>
                        </Container>
                    </Paper>
                </Box>
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
        </>
    );
}
