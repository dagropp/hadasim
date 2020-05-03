import React from "react";
import {parseDate, parsePlaces} from "common/project_utils";
import PropTypes from "prop-types";

class ImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("lightbox-on");
    }

    componentWillUnmount() {
        document.body.classList.remove("lightbox-on");
    }

    close() {
        this.props.setPosition(null)
    }

    next() {
        let next = (this.props.position + 1) % this.props.gallery.length;
        this.props.setPosition(next)
    }

    prev() {
        let prev = this.props.position === 0
            ? this.props.gallery.length - 1
            : this.props.position - 1;
        this.props.setPosition(prev)
    }

    render() {
        let position = this.props.position;
        let image = this.props.gallery[position];
        let project = this.props.projects[image.projectID];

        return <div className={`image-modal ${image.orientation}`}>
            <div className="backdrop" onClick={this.close}></div>
            <picture onClick={this.next}>
                <source srcSet={image.src + "=large.webp"}/>
                <source srcSet={image.src + "=large.jpg"}/>
                <img src={image.src + "=large.jpg"} alt={image.title}/>
            </picture>
            <div className="description">
                <h3>{project.title} / {parseDate(project.date)} / {parsePlaces(project.places)}</h3>
                <p>{project.description}</p>
            </div>
            <div className="next" onClick={this.next}><i className="icon-next"></i></div>
            <div className="prev" onClick={this.prev}><i className="icon-prev"></i></div>
            <div className="close" onClick={this.close}>×</div>
        </div>
    }

}

ImageModal.propTypes = {
    projects: PropTypes.object,
    gallery: PropTypes.array,
    position: PropTypes.number,
    setPosition: PropTypes.func
};

export default ImageModal;