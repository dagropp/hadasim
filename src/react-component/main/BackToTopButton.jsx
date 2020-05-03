import React from "react";
import {Link as ScrollLink} from "react-scroll";

function BackToTopButton(props) {
    return <ScrollLink to="home" className="back-to-top-button flex-row-centered" {...props.settings}>
        <i className="icon-up"></i>
    </ScrollLink>
}

export default BackToTopButton;