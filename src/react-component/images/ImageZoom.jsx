import React from "react";
import ReactImageMagnify from "react-image-magnify";

/**
 * Component of image zoom lens.
 */
function ImageZoom(props) {
    const image = props.image;
    const largeImageBase = image.orientation === "landscape" ? 900 : 1200;
    const smallImage = {
        src: image.src + "=small.jpg",
        isFluidWidth: true,
        alt: image.title
    }
    const largeImage = {
        src: image.src + "=large.jpg",
        height: largeImageBase,
        width: largeImageBase * image.ratio,
        alt: `Zoom-in for '${image.title}'`,
    }

    return <ReactImageMagnify smallImage={smallImage}
                              largeImage={largeImage}
                              className="image-container zoom-image"
                              imageClassName="gallery-image"
                              enlargedImageContainerClassName="image-large-container"
                              enlargedImageClassName="image-large"
                              enlargedImagePosition="over"/>
}

export default ImageZoom;