import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArticleContext } from "@src-contexts/ArticleProvider";
import { MemberContext } from "@src-contexts/MemberProvider";
import DescriptionDrawer from "@src-components/DescriptionDrawer";
import PinnedArticleItem, {
    PinnedArticleItemSkeleton,
} from "./components/PinnedArticleItem";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

import Skeleton from "@mui/material/Skeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import _ from "lodash";

// TODO: use the same filtering mechanism as the tag in articles list to show all articles by this author.
function Author() {
    const { author, getAuthor, articlesList, getArticlesList } =
        useContext(ArticleContext);
    const { isAuthorFollowed, followAuthor, unfollowAuthor } =
        useContext(MemberContext);

    const { authorID } = useParams();

    useEffect(() => {
        if (Number(author?.id) === Number(authorID)) return;
        getAuthor(authorID);
    }, [authorID]);

    useEffect(() => {
        getArticlesList({ author: authorID });
    }, [authorID]);

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
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Biography
                        </Typography>
                        <Container>
                            <Typography align="justify">
                                {author.biography}
                            </Typography>
                        </Container>

                        {articlesList ? (
                            <>
                                <Typography variant="h4" gutterBottom>
                                    Pinned works
                                </Typography>

                                <Container>
                                    {articlesList.results.map(
                                        (article) =>
                                            article.is_pinned && (
                                                <PinnedArticleItem
                                                    key={article.id}
                                                    article={article}
                                                />
                                            )
                                    )}
                                </Container>
                            </>
                        ) : (
                            <>
                                <Typography variant="h4" gutterBottom>
                                    Loading Pinned Articles ...
                                </Typography>

                                <Container>
                                    {_.range(5).map((idx) => (
                                        <PinnedArticleItemSkeleton key={idx} />
                                    ))}
                                </Container>
                            </>
                        )}

                        {/* <Typography variant="h4" gutterBottom>
                            Recent uploads
                        </Typography>

                        <Typography variant="h4" gutterBottom>
                            Recommendations
                        </Typography>

                        <Typography variant="h4" gutterBottom>
                            All Articles 
                        </Typography>
                         */}
                    </Box>
                    <DescriptionDrawer
                        avatarImg={author.avatar}
                        headerBgImg={author.background}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                textTransform: "capitalize",
                                fontSize: "1.5rem",
                                display: "flex",
                                justifyContent: "center",
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
                        <Button onClick={handleClickFollow}>
                            {isAuthorFollowed(author) ? "Unfollow" : "Follow"}
                        </Button>
                    </DescriptionDrawer>
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

export default Author;
