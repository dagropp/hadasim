import React from "react";
import PropTypes from "prop-types";
import {isInitialized} from "common/app_utils";
import ImageZoom from "./ImageZoom";
import LocalVideo from "react-component/videos/LocalVideo";
import {useGalleryGifAnimation} from "common/gif_utils";

/**
 * Component of general image gallery.
 */
function ImageGallery(props) {
    const {gallery} = props;
    const animations = useGalleryGifAnimation(gallery)

    return <div className="image-gallery">
        {gallery.map((item, index) => item.show &&
            <div className={`gallery-item ${item.orientation} ${item.size}`} key={index}>
                {item.type === "image"
                    ? <ImageZoom image={item}/>
                    : <LocalVideo src={item.src} autoplay={true} key={index}/>
                }
                {isInitialized(animations) &&
                <img className={`gif-led-drop ${animations[index].position}`}
                     src={animations[index].src} alt="LED"/>}
            </div>
        )}
    </div>
}

ImageGallery.propTypes = {
    gallery: PropTypes.array,
};

export default ImageGallery;