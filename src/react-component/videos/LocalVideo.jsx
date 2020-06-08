import React from "react";
import PropTypes from "prop-types";

/**
 * Component of local video.
 */
class LocalVideo extends React.Component {
    constructor(props) {
        super(props);
        this.video = React.createRef();
    }

    componentDidMount() {
        this.props.autoplay && this.playVideo()
    }

    /**
     * Attempts to play video, and if not successful, shows video controls.
     * @return {Promise<void>}
     */
    async playVideo() {
        const video = this.video.current;
        try {
            await video.play();
        } catch (e) {
            video.controls = true;
        }
    }

    render() {
        const {src, autoplay, loop, muted, className, onClick} = this.props;
        return <video src={src} className={className}
                      loop={loop} muted={muted} controls={!autoplay} playsInline
                      ref={this.video} onClick={onClick}>
            <p>Your browser doesn't support embedded videos</p>
        </video>
    }
}

LocalVideo.propTypes = {
    src: PropTypes.string,
    orientation: PropTypes.string,
    autoplay: PropTypes.bool,
    className: PropTypes.string,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    onClick: PropTypes.func
}

LocalVideo.defaultProps = {
    autoplay: false,
    loop: true,
    muted: true,
    onClick: null
}

export default LocalVideo;