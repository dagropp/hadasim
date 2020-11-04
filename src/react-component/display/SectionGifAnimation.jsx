import React from "react";
import {setSectionGifAnimation} from "common/gif_utils";
import {isInitialized} from "common/app_utils";
import PropTypes from "prop-types";

/**
 * Component of GIF animation for each section.
 */
function SectionGifAnimation(props) {
    const animations = setSectionGifAnimation(props.quantity);

    return <>
        {isInitialized(animations) && animations.map((animation, index) =>
            <img className="gif-line-drop" src={animation} alt="LED line drop animation" key={index}/>
        )}
    </>
}

SectionGifAnimation.propTypes = {
    quantity: PropTypes.number
}

SectionGifAnimation.defaultProps = {
    quantity: 2
}

export default SectionGifAnimation;