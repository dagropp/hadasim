import React from "react";
import PropTypes from "prop-types";
import LocalVideo from "react-component/videos/LocalVideo";
import {testDevice} from "common/app_utils";

/**
 * Component of main app video exhibit.
 */
function MainExhibit(props) {
    const {title, isPhone} = props;

    const path = "/assets/images/icons/";
    const animations = ['dot_v1', 'line_v5', 'line_v4', 'line_v2', 'line_v6', 'dot_v1',
        'line_v1', 'dot_v2', 'dot_v2', 'line_v5', 'line_v6', 'dot_v3', 'line_v3',
        'line_v6', 'line_v3', 'line_v2', 'line_v4', 'line_v1'];
    const animationsSlice = setAnimationsSlice(animations);

    function setAnimationsSlice(array) {
        if (testDevice("phone")) {
            return array.slice(0, 6);
        }
        if (testDevice("tablet.portrait")) {
            return array.slice(0, 12);
        } else {
            return array.slice(0, array.length)
        }
    }

    return <section className="home-exhibit flex-col-centered" id="home">
        {isPhone && <h1 className="centered">{title}</h1>}
        <div className="gifs">
            {animationsSlice.map((animation, index) =>
                <img className="gif-line-drop"
                     src={path + animation + ".gif"}
                     alt="LED line drop animation"
                     key={index}/>
            )}
        </div>
        <LocalVideo className="exhibit-video" src="/assets/videos/main_exhibit.mp4" autoplay={true}/>
    </section>
}

MainExhibit.propTypes = {
    title: PropTypes.string,
    isPhone: PropTypes.bool
}

export default MainExhibit;
