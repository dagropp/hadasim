import React from "react";
import PropTypes from "prop-types";

/**
 * Component that moves video project up/down.
 */
function VideoProjectArrows(props) {
    const {items, index, up, down} = props;

    const firstChild = index === 0; // If first child, will not display arrow up.
    const lastChild = index === items.length - 1; // If last child, will not display arrow down.

    return <div className="video-project-arrows">
        <i className={`icon-up flex-row-centered ${firstChild ? "disabled" : ""}`} onClick={up}/>
        <i className={`icon-down flex-row-centered ${lastChild ? "disabled" : ""}`} onClick={down}/>
    </div>
}

VideoProjectArrows.propTypes = {
    items: PropTypes.array,
    index: PropTypes.number,
    up: PropTypes.func,
    down: PropTypes.func
}

export default VideoProjectArrows;