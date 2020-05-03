import React from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageZoom(props) {
    const image = props.image;

    const smallImage = {
        src: image.src + "=small.jpg",
        srcSet: image.src + "=small.webp",
        isFluidWidth: true,
        alt: "",
    }

    const largeImage = {
        src: image.src + "=large.jpg",
        srcSet: image.src + "=large.webp",
        width: image.orientation === "landscape" ? 750 : 500,
        height: image.orientation === "landscape" ? 500 : 750,
        alt: "image.title",
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