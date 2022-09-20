import React, { useState, useContext, useEffect } from "react";
import useAxios from "@src-utils/useAxios";
import { AuthContext } from "@src-contexts/Authenticate";
import _ from "lodash";


export const MemberContext = React.createContext();

function MemberProvider({ children }) {
    const api = useAxios();
    const [member, setMember] = useState(null);
    const { user, baseURL } = useContext(AuthContext);
    // Update member.
    // Get member from detailed api endpoint.
    useEffect(() => {
        if (user !== null) getMember();
    }, [user]);

    const isAuthorFollowed = (author) => {
        // Followed authors need to be present in authors_followed list
        return _.findIndex(member?.authors_followed, ["id", author.id]) !== -1;
    };

    const getMember = () => {
        user?.member_id!== undefined&&api.get(`${baseURL}/accounts/api/members/detail/${user.member_id}/`)
            .then((res) => {
                setMember(res.data);
            })
            .catch((err) => {
                console.log("Error at get Member", err);
            });
    };
    const uploadImages = (formData) => {
        api.post(
            `${baseURL}/accounts/api/members/image-uploads/`,
            formData,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        )
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Upload Images: ", err));
    };
    const deleteHistory = (selectedArticles) => {
        if (selectedArticles?.length === 0) return;
        api.delete(`${baseURL}/accounts/api/members/history/`, {
            data: { selected_articles: selectedArticles },
        })
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Delete History: ", err));
    };

    const addFavourite = (selectedArticles) => {
        if (selectedArticles?.length === 0) return;
        api.post(`${baseURL}/accounts/api/members/favourite/`, {
            selected_articles: selectedArticles,
        })
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Add Favourite: ", err));
    };

    const removeFavourite = (selectedArticles) => {
        if (selectedArticles?.length === 0) return;
        api.delete(`${baseURL}/accounts/api/members/favourite/`, {
            data: { selected_articles: selectedArticles },
        })
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Remove Favourite: ", err));
    };
    const followAuthor = (selectedAuthors) => {
        if (selectedAuthors?.length === 0) return;
        api.post(`${baseURL}/accounts/api/members/authors-followed/`, {
            selected_author: selectedAuthors,
        })
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Add Favourite: ", err));
    };

    const unfollowAuthor = (selectedAuthors) => {
        if (selectedAuthors?.length === 0) return;
        api.delete(`${baseURL}/accounts/api/members/authors-followed/`, {
            data: { selected_author: selectedAuthors },
        })
            .then((res) => {
                getMember();
                console.log(res);
            })
            .catch((err) => console.log("Error at Remove Favourite: ", err));
    };

    const contexData = {
        // Data
        member,

        // Functions
        getMember,
        deleteHistory,
        addFavourite,
        removeFavourite,
        followAuthor,
        unfollowAuthor,
        isAuthorFollowed,
        uploadImages,
    };
    return (
        <MemberContext.Provider value={contexData}>
            {children}
        </MemberContext.Provider>
    );
}

export default MemberProvider;
