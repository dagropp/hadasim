import React, {useEffect} from "react";
import PropTypes from "prop-types";

function ImageModal(props) {
    let position = props.position;
    let image = props.gallery[position];
    const gallery = props.gallery;
    const setPosition = props.setPosition;
    const scrollPosition = window.pageYOffset;
    useEffect(() => {
        window.addEventListener("scroll", disableScroll, true);
        return () => {
            window.removeEventListener("scroll", disableScroll, true);
        }

        function disableScroll() {
            window.scrollTo(0, scrollPosition)
        }
    }, [scrollPosition])

    function close() {
        setPosition(null)
    }

    function next() {
        let next = (position + 1) % gallery.length;
        setPosition(next)
    }

    function prev() {
        let prev = position === 0
            ? gallery.length - 1
            : position - 1;
        setPosition(prev)
    }

    return <div className={`image-modal ${image.orientation}`}>
        <div className="backdrop" onClick={close}></div>
        <picture onClick={next}>
            <source srcSet={image.webp.large}/>
            <source srcSet={image.jpg.large}/>
            <img src={image.jpg.large} alt={image.title}/>
        </picture>
        <div className="description">
            <h3>{image.title}</h3>
            <p>{image.subtitle}</p>
        </div>
        <div className="next" onClick={next}><i className="icon-next"></i></div>
        <div className="prev" onClick={prev}><i className="icon-prev"></i></div>
        <div className="close" onClick={close}>×</div>
    </div>
}

ImageModal.propTypes = {
    gallery: PropTypes.array,
    position: PropTypes.number,
    setPosition: PropTypes.func
};

export default ImageModal;