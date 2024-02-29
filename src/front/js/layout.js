import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { SingleSessionYogaDetails } from "./pages/SingleSessionYogaDetails.js";
import { SingleSessionMeditationHarmoniumDetails } from "./pages/SingleSessionMeditationHarmoniumDetails.js";
import injectContext from "./store/appContext";
import { Login } from "./pages/login"; 
import { Sessions } from "./pages/classes";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div style={{backgroundColor: "#FBF9F1"}}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sessions" element={<Sessions />} />
                        <Route path="/:yogatype/:theid" element={<SingleSessionYogaDetails />} />
                        {/* <Route path="/:othersessiontype/:theid" element={<SingleSessionMeditationHarmoniumDetails />} /> */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
