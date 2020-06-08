import React from "react";
import PropTypes from "prop-types";
import LightBox from "react-component/display/LightBox";

/**
 * Component for loader during admin submit process.
 */
function SubmitLoader(props) {
    const {title} = props;

    return <LightBox className="submit-loader flex-col-centered">
        <h2 className="loader-title">{title}</h2>
        <span className="loader-message">Don't refresh or leave page...</span>
        <i className="icon-spinner flex-col-centered"/>
    </LightBox>
}

SubmitLoader.propTypes = {
    title: PropTypes.string
}

export default SubmitLoader;