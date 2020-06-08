import React from "react";
import PropTypes from "prop-types";
import {capitalize} from "common/string_utils";

/**
 * Component of project gallery (section) input.
 */
function ProjectGallery(props) {
    const {project, gallery, edit} = props;

    return <label className="project-gallery admin-form-field" htmlFor="gallery">
        <span className={`title ${edit ? "disabled" : "required"}`}>Project Gallery</span>
        <select name="gallery" required defaultValue={project.gallery} disabled={edit}>
            <option value="" disabled>- Select Gallery -</option>
            {gallery.map((section, index) =>
                <option value={section.name} key={index}>{capitalize(section.name)}</option>
            )}
        </select>
    </label>
}

ProjectGallery.propTypes = {
    project: PropTypes.object
}

export default ProjectGallery;