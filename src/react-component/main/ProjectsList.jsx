import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {isInitialized, setImageGallery} from "../../common/utils";
import ImageModal from "../images/ImageModal";

function ProjectsList(props) {
    const [sortedProjects, setSortedProjects] = useState([]);
    const [modalProject, setModalProject] = useState([]);
    const [modalPosition, setModalPosition] = useState(null);

    useEffect(() => {
        sortProjects();

        function sortProjects() {
            let projects = [...props.projects.sculptures, ...props.projects.paintings];
            for (const project of projects) {
                project.gallery = setImageGallery(project);
            }
            setSortedProjects(projects.sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            ));
        }
    }, [props.projects.sculptures, props.projects.paintings])

    function openModal(project) {
        setModalProject(project);
        setModalPosition(0);
    }

    return <section className="projects-list flex-col-centered">
        <h2 className="centered">List of Works</h2>
        <ul>
            {isInitialized(sortedProjects) && Object.values(sortedProjects).map((project, index) =>
                <li className="project-item" key={index}>
                    <span onClick={openModal.bind(this, project)}>{project.title}, {project.date}</span>
                </li>
            )}
        </ul>
        {isInitialized(modalPosition) &&
        <ImageModal gallery={modalProject.gallery} position={modalPosition} setPosition={setModalPosition}/>}
    </section>
}

ProjectsList.propTypes = {
    projects: PropTypes.object
};

export default ProjectsList;