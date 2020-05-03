import React from "react";
import ImageGallery from "react-component/images/ImageGallery";
import PropTypes from "prop-types";

function Sculptures(props) {
    return <section className="gallery-wrapper sculptures" id="sculptures">
        <h2>Sculptures</h2>
        <ImageGallery projects={props.projects} gallery={props.gallery}/>
    </section>
}

Sculptures.propTypes = {
    projects: PropTypes.object,
    gallery: PropTypes.array
};

export default Sculptures;