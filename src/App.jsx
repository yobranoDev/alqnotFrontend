import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";

import ArticleLayout from "./views/Article/Layout";
import ArticleList from "./views/Article/List";
import ArticleDetail from "./views/Article/Detail";

import ProfileLayout from "./views/Profile/Layout";
import MemberProfile from "./views/Profile/Member";
import Register from "./views/Profile/Register";
import Login from "./views/Profile/Login";
import ResetPassword from "@src-views/Profile/ResetPassword";
import Logout from "./views/Profile/Logout";
import ProfileUpdate from "./views/Profile/Update";
import ProfileDelete from "./views/Profile/Deregister";
import AuthorProfile from "./views/Article/Author";

import Authenticate from "./contexts/Authenticate";
import MemberProvider from "./contexts/MemberProvider";
import AppProvider from "./contexts/AppProvider";
import MiniDrawer from "./components/MiniDrawer";

import PrivateRoute from "./utils/PrivateRoute";
import "./styles/App.css";

function App() {
    return (
        <div className="App">
            <AppProvider>
                <Authenticate>
                    <MemberProvider>
                        <MiniDrawer>
                            <Routes>
                                <Route path="" element={<Home />} />
                                <Route path="/about/" element={<About />} />
                                <Route
                                    path="/articles"
                                    element={<ArticleLayout />}
                                >
                                    <Route
                                        path=""
                                        exact
                                        element={<ArticleList />}
                                    />
                                    <Route
                                        path="author/:authorID"
                                        exact
                                        element={<AuthorProfile />}
                                    />
                                    <Route
                                        path=":articleSlug"
                                        element={<ArticleDetail />}
                                    />
                                </Route>
                                <Route
                                    path="profile"
                                    element={<ProfileLayout />}
                                >
                                    <Route
                                        path=""
                                        element={
                                            <PrivateRoute>
                                                <MemberProfile />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        path="register"
                                        element={<Register />}
                                    />
                                    <Route path="login" element={<Login />} />
                                    <Route path="reset-password" element={<ResetPassword />} />
                                    <Route
                                        path="logout"
                                        element={
                                            <PrivateRoute>
                                                <Logout />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        path="deregister"
                                        element={
                                            <PrivateRoute>
                                                <ProfileDelete />
                                            </PrivateRoute>
                                        }
                                    />

                                    <Route
                                        path="update"
                                        element={
                                            <PrivateRoute>
                                                <ProfileUpdate />
                                            </PrivateRoute>
                                        }
                                    />
                                </Route>
                            </Routes>
                        </MiniDrawer>
                    </MemberProvider>
                </Authenticate>
            </AppProvider>
        </div>
    );
}

export default App;
