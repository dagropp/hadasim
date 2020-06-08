import React, {useEffect} from "react";
import PropTypes from "prop-types";
import LocalVideo from "react-component/videos/LocalVideo";
import NextIcon from "react-component/icons/NextIcon";
import PrevIcon from "react-component/icons/PrevIcon";
import CloseIcon from "react-component/icons/CloseIcon";
import LightBox from "react-component/display/LightBox";

/**
 * Component of a pop-up image gallery.
 */
function ImageModal(props) {
    const {gallery, position, setPosition} = props;
    const image = gallery[position];

    useEffect(() => {
        // Sets functions for different keys
        document.onkeydown = event => {
            const {key} = event;
            const actions = {ArrowRight: next, ArrowLeft: prev, Escape: close};
            actions[key] && actions[key]();
        };
        return () => document.onkeydown = null;
    });

    /**
     * Close image modal, by setting position to null.
     */
    function close() {
        setPosition(null);
    }

    /**
     * Going to next position in image modal.
     */
    function next() {
        const next = (position + 1) % gallery.length;
        setPosition(next);
    }

    /**
     * Going to previous position in image modal.
     */
    function prev() {
        const prev = position === 0 ? gallery.length - 1 : position - 1;
        setPosition(prev);
    }

    return <LightBox className={`image-modal ${image.orientation}`}>
        <div className="backdrop" onClick={close}/>
        <div className="image-wrapper">
            <div className="title">
                <h2>{image.title}</h2>
                {image.credits && <p>Photo by {image.credits}</p>}
            </div>
            {image.type === "image"
                ? <img src={image.src + "=medium.jpg"} alt={image.title} onClick={next}/>
                : <LocalVideo src={image.src} autoplay={true} onClick={next}/>
            }
        </div>
        <div className="actions flex-row-centered">
            <PrevIcon onClick={prev}/>
            <NextIcon onClick={next}/>
            <CloseIcon onClick={close}/>
        </div>
    </LightBox>
}

ImageModal.propTypes = {
    gallery: PropTypes.array,
    position: PropTypes.number,
    setPosition: PropTypes.func
};

export default ImageModal;