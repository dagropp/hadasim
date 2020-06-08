import React from "react";
import PropTypes from "prop-types";

/**
 * Component of project title input.
 */
function ProjectTitle(props) {
    return <label className="project-title admin-form-field" htmlFor="title">
        <span className="title required">Project Title</span>
        <input name="title" type="text" required placeholder="Add Title..." defaultValue={props.project.title}/>
    </label>
}

ProjectTitle.propTypes = {
    project: PropTypes.object
}

export default ProjectTitle;