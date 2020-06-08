import React from "react";
import PropTypes from "prop-types";
import LocalVideo from "react-component/videos/LocalVideo";
import SectionGifAnimation from "react-component/display/SectionGifAnimation";

/**
 * Component of main app video exhibit.
 */
function MainExhibit(props) {
    const {title, isPhone} = props;

    return <section className="home-exhibit flex-col-centered" id="home">
        {isPhone && <h1 className="centered">{title}</h1>}
        <LocalVideo className="exhibit-video" src="/assets/videos/main_exhibit.mp4" autoplay={true}/>
        <SectionGifAnimation/>
    </section>
}

MainExhibit.propTypes = {
    title: PropTypes.string,
    isPhone: PropTypes.bool
}

export default MainExhibit;
