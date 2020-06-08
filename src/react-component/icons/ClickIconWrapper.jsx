import React from "react";
import PropTypes from "prop-types";

/**
 * Wrapper component for SVG icons with onClick function.
 */
function ClickIconWrapper(props) {
    return <div className={`icon-wrapper flex-row-centered ${props.className}`} onClick={props.onClick}>
        <svg viewBox={props.viewBox} height="100%">
            {props.children}
        </svg>
    </div>
}

ClickIconWrapper.propTypes = {
    className: PropTypes.string,
    viewBox: PropTypes.string,
    onClick: PropTypes.func
}

export default ClickIconWrapper;