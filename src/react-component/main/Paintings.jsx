import React from "react";
import ImageGallery from "react-component/images/ImageGallery";
import PropTypes from "prop-types";

function Paintings(props) {
    return <section className="gallery-wrapper paintings" id="paintings">
        <h2>Paintings</h2>
        <ImageGallery projects={props.projects} gallery={props.gallery}/>
    </section>
}

Paintings.propTypes = {
    projects: PropTypes.object,
    gallery: PropTypes.array
};

export default Paintings;