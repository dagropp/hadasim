import React from "react";
import ImageModal from "react-component/images/ImageModal";
import {isInitialized} from "common/app_utils";
import PropTypes from "prop-types";
import {parseDimensions} from "common/project_utils";

/**
 * Component of sorted list of projects.
 */
class ProjectsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedProjects: [],
            sortedGallery: [],
            modalPosition: null
        }
    }

    componentDidMount() {
        this.setState({sortedProjects: this.sortProjects()}, () =>
            this.setState({sortedGallery: this.sortGallery()}));
    }

    /**
     * Sorts the projects by year, newest to oldest.
     * @return {array} Containing the sorted projects.
     */
    sortProjects() {
        const {projects} = this.props;
        projects.sort((a, b) => {
            const byName = a.title.localeCompare(b.title);
            const byDate = b.date - a.date;
            // If date is different, sort by date, otherwise sort by name
            return byDate !== 0 ? byDate : byName;
        });
        return projects;
    }

    /**
     * Sorts gallery as a flat array, sorted by projects order.
     * @return {array} containing the sorted gallery.
     */
    sortGallery() {
        const {gallery, projects} = this.props
        // Maps the gallery to include only the items arrays and flattens the result
        const sortedGallery = gallery.reduce((acc, section) => acc.concat(section.items), []);
        // Sets to array only the project ID's, by the correct order
        const projectIds = projects.map(project => project.id);
        // Sorts flattened gallery items by projects order
        sortedGallery.sort((a, b) =>
            projectIds.indexOf(a.projectId) - projectIds.indexOf(b.projectId)
        );
        return sortedGallery;
    }

    /**
     * Finds the first index of a project in the sorted gallery.
     * @param projectId {string} ID of the project to get index of.
     * @return {number} of gallery index.
     */
    galleryIndex(projectId) {
        return this.state.sortedGallery.findIndex(entry => entry.projectId === projectId);
    }

    /**
     * Opens the image modal, starting with the specified project.
     * @param projectId {string} ID of the project to open modal at.
     */
    openModal(projectId) {
        const modalPosition = this.galleryIndex(projectId);
        modalPosition !== -1 && this.setState({modalPosition});
    }

    /**
     * Changes the image modal position.
     * @param modalPosition {number} index of gallery to move position to.
     */
    setModalPosition(modalPosition) {
        this.setState({modalPosition})
    }

    render() {
        const {projects} = this.props;
        const {sortedGallery, modalPosition} = this.state;

        return <div className="projects-list flex-col-centered">
            <h2 className="centered">List of Works</h2>
            <ul className="items-list">
                {projects.map((project, index) =>
                    <li className="project-item" key={index}>
                        <span onClick={this.openModal.bind(this, project.id)}>
                            {[project.title, project.date, project.technique, parseDimensions(project.dimensions)]
                                .filter(entry => entry)
                                .join(", ")}
                        </span>
                    </li>
                )}
            </ul>
            {isInitialized(modalPosition) &&
            <ImageModal gallery={sortedGallery}
                        position={modalPosition}
                        setPosition={this.setModalPosition.bind(this)}/>}
        </div>
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.array,
    gallery: PropTypes.array
};

export default ProjectsList;