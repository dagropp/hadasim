import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {confirmAction, isInitialized} from "common/app_utils";
import {postData} from "common/server_utils";
import {removeEntryFromArrayByIndex} from "common/array_utils";

/**
 * Component with admin main projects menu.
 */
function ProjectsMenu(props) {
    const {projects, gallery, setParentState} = props;
    const [sortedProjects, setSortedProjects] = useState([]);

    useEffect(() => {
        const sorted = projects.sort((a,b) => {
            const byName = a.title.localeCompare(b.title);
            const byGallery = a.gallery.localeCompare(b.gallery);
            // If gallery is different, sort by gallery, otherwise sort by name
            return byGallery !== 0 ? byGallery : byName;
        }
        );
        setSortedProjects(sorted);
    }, [projects])

    /**
     * Deletes project and its images.
     * @param project {object} of project to delete.
     * @param index {number} of project to delete.
     */
    function deleteProject(project, index) {
        const message = `Are you sure you want to delete project '${project.title}' and all its images?`;
        confirmAction(message, () => {
            removeEntryFromArrayByIndex(projects, index);
            const data = {
                projects: projects,
                id: project.id,
                section: project.gallery
            };
            // Sends data to server, and when done, sets the updated data to parent state.
            postData("delete_project", data)
                .then(response => setParentState({...response}))
                .catch(console.warn);
        })
    }

    return isInitialized(gallery) && <section className="admin-menu-section projects">
        <h2>Projects <span role="img" aria-label="Sculpture">🗿</span></h2>
        <ul className="admin-menu-list">
            <li className="list-item new">
                <Link to="/admin/edit_project">
                    <h2>Add New Project</h2>
                </Link>
            </li>
            {isInitialized(sortedProjects) && projects.map((project, index) =>
                <li className="list-item" key={index}>
                    <h2>{project.title}</h2>
                    <span className="date">{project.date}</span>
                    <Link to={{pathname: "/admin/edit_project", search: encodeURI(index)}}
                          className="action edit flex-row-centered">Edit</Link>
                    <span className="action delete flex-row-centered negative"
                          onClick={deleteProject.bind(this, project, index)}>Delete</span>
                    <span className="action gallery-name flex-row-centered disabled">
                        {project.gallery}
                    </span>
                </li>
            )}
        </ul>
    </section>
}

export default ProjectsMenu;