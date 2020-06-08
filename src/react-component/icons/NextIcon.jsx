import React from "react";
import PropTypes from "prop-types";
import ClickIconWrapper from "./ClickIconWrapper";

/**
 * Component of next (>) SVG clickable icon.
 */
function NextIcon(props) {
    return <ClickIconWrapper className="click-next" viewBox="0 0 36.4 70" onClick={props.onClick}>
        <polygon points="1.4,70 0,68.6 33.7,35 0,1.4 1.4,0 36.4,35"/>
    </ClickIconWrapper>
}

NextIcon.propTypes = {
    onClick: PropTypes.func
}

export default NextIcon;