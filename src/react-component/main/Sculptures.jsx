import React from "react";
import PropTypes from "prop-types";
import ImageGallery from "../images/ImageGallery";

function Sculptures(props) {
    return <section className="gallery-wrapper sculptures" id="sculptures">
        <h2>Sculptures</h2>
        <ImageGallery items={props.items}/>
    </section>
}

Sculptures.propTypes = {
    items: PropTypes.array
};

export default Sculptures;