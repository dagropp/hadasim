import React from "react";
import PropTypes from "prop-types";

/**
 * Wrapper component for any pop-up / light-box components.
 */
class LightBox extends React.Component {
    componentDidMount() {
        // On mount, adds class to body that removes scroll
        document.body.classList.add("lightbox-on");
    }

    componentWillUnmount() {
        // On unmount, removes scroll class
        document.body.classList.remove("lightbox-on");
    }

    render() {
        const {className, onClick, children} = this.props;

        return <div className={`light-box ${className}`} onClick={onClick}>
            {children}
        </div>
    }
}

LightBox.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

LightBox.defaultProps = {
    className: "",
    onClick: null
};

export default LightBox;

