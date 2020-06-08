import React from "react";
import PropTypes from "prop-types";
import ClickIconWrapper from "./ClickIconWrapper";

/**
 * Component of close (X) SVG clickable icon.
 */
function CloseIcon(props) {
    return <ClickIconWrapper className="click-close" viewBox="0 0 45 45" onClick={props.onClick}>
        <polygon
            points="45,1.4 43.6,0 22.5,21.1 1.4,0 0,1.4 21.1,22.5 0,43.6 1.4,45 22.5,23.9 43.6,45 45,43.6 23.9,22.5"/>
    </ClickIconWrapper>
}

CloseIcon.propTypes = {
    onClick: PropTypes.func
}

export default CloseIcon;