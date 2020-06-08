import React from "react";
import PropTypes from "prop-types"
import ImageGallery from "react-component/images/ImageGallery";
import {capitalize} from "common/string_utils";
import VideoGallery from "react-component/videos/VideoGallery";
import SectionGifAnimation from "react-component/display/SectionGifAnimation";

/**
 * Component of general media gallery section.
 */
function Gallery(props) {
    const {name, items} = props;

    return <section className={`gallery-wrapper ${name}`} id={name}>
        <h2>{capitalize(name)}</h2>
        {name === "videos"
            ? <VideoGallery gallery={items}/>
            : <ImageGallery gallery={items}/>
        }
        <SectionGifAnimation/>
    </section>

}

Gallery.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
}

export default Gallery;