import React from "react";
import PropTypes from "prop-types";
import ClickIconWrapper from "./ClickIconWrapper";

/**
 * Component of previous (<) SVG clickable icon.
 */
function PrevIcon(props) {
    return <ClickIconWrapper className="click-prev" viewBox="0 0 36.4 70" onClick={props.onClick}>
        <polygon points="35,70 36.4,68.6 2.8,35 36.4,1.4 35,0 0,35"/>
    </ClickIconWrapper>
}

PrevIcon.propTypes = {
    onClick: PropTypes.func
}

export default PrevIcon;