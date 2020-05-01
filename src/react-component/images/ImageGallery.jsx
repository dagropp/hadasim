import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ImageModal from "./ImageModal";
import {isInitialized, testBrowser, testDevice, testFeature} from "../../common/utils";
import ImageZoom from "./ImageZoom";

const ImageGallery = props => {
    const [gallery, setGallery] = useState([]);
    const [modalPosition, setModalPosition] = useState(null);
    const isMSBrowser = testBrowser("edge");
    const isMobileDevice = testDevice("tablet.landscape", "tablet.portrait", "phone");
    const showImageZoom = (isMSBrowser || isMobileDevice) ? false : testFeature({name: "zoom", default: true});
    const showModal = testFeature({name: "modal", default: true});

    useEffect(() => {
        let gallery = [];
        for (const item of props.items) {
            const title = item.title;
            const subtitle = item.subtitle;
            const date = item.date;
            for (const image of item.media) {
                const imageSrc = image.src;
                const webp = {small: `${imageSrc}=small.webp`, large: `${imageSrc}=large.webp`}
                const jpg = {small: `${imageSrc}=small.jpg`, large: `${imageSrc}=large.jpg`};
                const orientation = image.orientation;
                gallery.push({title, subtitle, date, webp, jpg, orientation})
            }
        }
        setGallery(gallery)
    }, [props.items])

    return <div className="image-gallery">
        {isInitialized(gallery) && gallery.map((image, index) =>
            <div className={`image-wrapper ${image.orientation}`}
                 key={index}
                 onClick={setModalPosition.bind(this, index)}>
                {showImageZoom
                    ? <ImageZoom image={image}/>
                    : <picture className="image-container">
                        <source srcSet={image.webp.small}/>
                        <source srcSet={image.jpg.small}/>
                        <img className="gallery-image" src={image.jpg.small} alt={image.title}/>
                    </picture>
                }
            </div>
        )}

        {showModal && isInitialized(modalPosition) &&
        <ImageModal gallery={gallery} position={modalPosition} setPosition={setModalPosition}/>}
    </div>

}

ImageGallery.propTypes = {
    items: PropTypes.array
};

export default ImageGallery;