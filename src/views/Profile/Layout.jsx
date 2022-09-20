import React, { useContext, useEffect} from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "@src-contexts/Authenticate";
import {useNavigate} from "react-router-dom"
import ArticleProvider from "@src-contexts/ArticleProvider";

function Layout() {

  
    return (
        <ArticleProvider>
            <Outlet />
        </ArticleProvider>
    );
}

export default Layout;
