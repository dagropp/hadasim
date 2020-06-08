import React from "react";
import PropTypes from "prop-types";

/**
 * Component of project readonly ID input.
 */
function ProjectId(props) {
    return <label className="project-id admin-form-field" htmlFor="id">
        <span className="title disabled">Project ID</span>
        <input name="id" title="text" defaultValue={props.project.id} required readOnly/>
    </label>
}

ProjectId.propTypes = {
    project: PropTypes.object
}

export default ProjectId;