import React, {useEffect, useState} from "react";
import {Link as ScrollLink} from "react-scroll";

/**
 * Component of mobile-only back to top button.
 */
function BackToTopButton(props) {
    const [show, setShow] = useState(false);
    const {settings} = props;

    useEffect(() => {
        let hideButton;
        window.addEventListener("scroll", toggleHideButton, false);
        return () => window.removeEventListener("scroll", toggleHideButton, false);

        function toggleHideButton() {
            // Sets button to show, if scrolled passed screen height
            if (window.pageYOffset > window.innerHeight) {
                setShow(true);
                window.clearTimeout(hideButton);
                // Once scroll stopped, show button for specified time
                hideButton = window.setTimeout(() => setShow(false), 2500);
            }
        }
    }, [])

    return <ScrollLink to="home" {...settings} aria-label="Go up"
                       className={`back-to-top-button flex-row-centered ${show ? "show" : ""}`}>
        <img className="click-up" src="/assets/images/icons/up.svg" alt="Up Arrow"/>
    </ScrollLink>

}

export default BackToTopButton;