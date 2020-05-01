import ReactImageMagnify from "react-image-magnify";
import React from "react";

function ImageZoom(props) {
    const image = props.image;

    const smallImage = {
        src: image.jpg.small,
        srcSet: image.webp.small,
        isFluidWidth: true,
        alt: image.title,
    }

    const largeImage = {
        src: image.jpg.large,
        srcSet: image.webp.large,
        width: image.orientation === "landscape" ? 750 : 500,
        height: image.orientation === "landscape" ? 500 : 750,
        alt: image.title,
    }

    return <ReactImageMagnify smallImage={smallImage}
                              largeImage={largeImage}
                              className="image-container zoom-image"
                              imageClassName="gallery-image"
                              enlargedImageContainerClassName="image-large-container"
                              enlargedImageClassName="image-large"
                              enlargedImageContainerDimensions={{height: 350, width: 350}}/>
}

export default ImageZoom;