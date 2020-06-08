import React from "react";
import PropTypes from "prop-types";

/**
 * Component of project technique input.
 */
function ProjectTechnique(props) {
    const {project} = props;
    const techniques = [
        "Soft-Sculpture",
        "Installation",
        "Oil Pastel on Wood",
        "Oil Pastel on Paper",
        "Mixed Media",
        "Video"
    ];

    return <label className="project-gallery admin-form-field" htmlFor="technique">
        <span className="title required">Project Technique</span>
        <input type="text" name="technique" list="technique" required
               placeholder="Select Project Technique..."
               defaultValue={project.technique}/>
        <datalist id="technique">
            {techniques.map((technique, index) =>
                <option value={technique} key={index}>{technique}</option>
            )}
        </datalist>
    </label>
}

ProjectTechnique.propTypes = {
    project: PropTypes.object
}

export default ProjectTechnique;