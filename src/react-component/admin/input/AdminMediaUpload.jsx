import React from "react";
import PropTypes from "prop-types";
import {isInitialized} from "common/app_utils";
import MediaThumbnail from "./MediaThumbnail";

/**
 * Component of media upload input.
 */
class AdminMediaUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadThumbs: [],
        }
    }

    /**
     * Sets the current upload thumbnails.
     * @param event {Event} input change event.
     */
    setThumbnails(event) {
        const {multiple, resetList} = this.props;
        // If upload is for single image, resets the currentThumbs array.
        if (!multiple) {
            resetList("currentThumbs");
        }
        this.setState({uploadThumbs: []})
        const input = event.target;
        // Sends each file to FileReader object, when loaded passes it to reader function.
        for (const file of input.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = this.readFile.bind(this, file);
        }
    }

    /**
     * Reads the files from FileReader object and parses the result to thumbnail src.
     * @param file {File} from upload input.
     * @param event {Event} load event.
     */
    readFile(file, event) {
        const uploadThumbs = [...this.state.uploadThumbs];
        uploadThumbs.push({src: event.target.result, file: file});
        this.setState({uploadThumbs});
    }

    render() {
        const {
            name, title, placeholder, required, multiple, className, currentThumbs, mediaActions, actions, approvedTypes
        } = this.props;
        const {uploadThumbs} = this.state;

        return <div className={`image-upload admin-form-field ${className}`}>
            <span className={`title ${required ? "required" : "optional"}`}>{title}</span>
            <label className="file-label" htmlFor={name}>
                <div className="file-custom-input flex-row-centered">
                    <div className="upload-button flex-row-centered">
                        <span>{placeholder}</span>
                        <i className="icon-upload"/>
                    </div>
                </div>
                <input type="file" name={name} multiple={multiple} required={required} className="file-input"
                       onChange={this.setThumbnails.bind(this)}/>
            </label>
            <div className="upload-thumbnails flex-row-centered">
                {isInitialized(currentThumbs) && currentThumbs.map((thumb, index) =>
                    <MediaThumbnail data={thumb}
                                    mediaActions={mediaActions}
                                    current={true}
                                    actions={actions}
                                    key={index}/>
                )}
                {isInitialized(uploadThumbs) && uploadThumbs.map((thumb, index) =>
                    <MediaThumbnail data={thumb}
                                    mediaActions={mediaActions}
                                    current={false}
                                    actions={actions}
                                    approvedTypes={approvedTypes}
                                    key={index}/>
                )}
            </div>
        </div>
    }
}

AdminMediaUpload.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    className: PropTypes.string,
    currentThumbs: PropTypes.array,
    mediaActions: PropTypes.array,
    actions: PropTypes.bool,
    approvedTypes: PropTypes.array
}

AdminMediaUpload.defaultProps = {
    className: "",
    mediaActions: [],
    approvedTypes: []
};

export default AdminMediaUpload;