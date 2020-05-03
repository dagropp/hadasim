import React from "react";
import DateInput from "./DateInput";
import ProjectID from "./ProjectID";

function Project(props) {
    const project = {};

    return <div className="admin-project">
        <h2>{project ? "Edit Project" : "Add Project"}</h2>
        <form action="">
            <ProjectID/>
            <DateInput project={project}/>
        </form>
    </div>
}

export default Project;