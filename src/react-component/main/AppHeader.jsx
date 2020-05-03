import React from "react";
import BackToTopButton from "./BackToTopButton";
import {Link as ScrollLink} from "react-scroll";

function AppHeader(props) {
    const scrollSettings = {
        spy: true,
        smooth: true,
        offset: -60,
        duration: 500,
        activeClass: "active",
    };
    const scrollHomeSettings = {
        spy: true,
        smooth: true,
        offset: -60,
        duration: 300,
        activeClass: "active",
    }

    return <header className="app-header">
        <nav className="app-menu">
            <h1><ScrollLink to="home" {...scrollHomeSettings}>Hadas Golan</ScrollLink></h1>
            <ul className="menu-list">
                <li><ScrollLink to="sculptures" {...scrollSettings}>Sculptures</ScrollLink></li>
                <li><ScrollLink to="paintings" {...scrollSettings}>Paintings</ScrollLink></li>
                <li><ScrollLink to="video" {...scrollSettings}>Video</ScrollLink></li>
                <li><ScrollLink to="contact" {...scrollSettings}>Contact</ScrollLink></li>
            </ul>
        </nav>
        {props.isPhone && <BackToTopButton settings={scrollHomeSettings}/>}
    </header>
}

export default AppHeader;