import React from "react";
import PropTypes from "prop-types";
import ImageGallery from "../images/ImageGallery";

const Paintings = props => {
    return <section className="gallery-wrapper paintings" id="paintings">
        <h2>Paintings</h2>
        <ImageGallery items={props.items}/>
    </section>
};

Paintings.propTypes = {
    items: PropTypes.array
};

export default Paintings;