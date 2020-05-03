import React from "react";
import ImageZoom from "./ImageZoom";
import ImageModal from "./ImageModal";
import {isInitialized, testBrowser, testDevice, testFeature} from "common/utils";
import PropTypes from "prop-types";

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalPosition: null
        };

        this.isMSBrowser = testBrowser("edge");
        this.isMobileDevice = testDevice("tablet.landscape", "tablet.portrait", "phone");
        this.showImageZoom = (this.isMSBrowser || this.isMobileDevice)
            ? false
            : testFeature({name: "zoom", default: true});
        this.showModal = testFeature({name: "modal", default: true});
    }

    setModalPosition(position) {
        this.setState({modalPosition: position})
    }

    render() {
        const {projects, gallery} = this.props;
        const {modalPosition} = this.state;

        return <div className="image-gallery">
            {gallery.map((image, index) =>
                <div className={`image-wrapper ${image.orientation}`}
                     key={index}
                     onClick={this.setModalPosition.bind(this, index)}>
                    {this.showImageZoom
                        ? <ImageZoom image={image}/>
                        : <picture className="image-container">
                            <source srcSet={image.src + "=small.webp"}/>
                            <source srcSet={image.src + "=small.jpg"}/>
                            <img className="gallery-image"
                                 src={image.src + "=small.jpg"}
                                 alt={projects[image.projectID].title}/>
                        </picture>
                    }
                </div>
            )}

            {this.showModal && isInitialized(modalPosition) &&
            <ImageModal projects={projects}
                        gallery={gallery}
                        position={modalPosition}
                        setPosition={this.setModalPosition.bind(this)}/>}
        </div>
    }

}

ImageGallery.propTypes = {
    projects: PropTypes.object,
    gallery: PropTypes.array
};

export default ImageGallery;