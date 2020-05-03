import React from "react";
import ImageModal from "react-component/images/ImageModal";
import {isInitialized} from "common/utils";
import {parseDate, parsePlaces} from "common/project_utils";
import PropTypes from "prop-types";

class ProjectsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedProjects: [],
            fullGallery: [],
            modalGallery: [],
            modalPosition: null
        }
    }

    componentDidMount() {
        this.sortProjects();
        this.setState({fullGallery: Object.values(this.props.gallery).flat()})
    }

    sortProjects() {
        let sortedProjects = Object.entries(this.props.projects).map(([key, val]) => {
            val.projectID = key;
            return val;
        });
        sortedProjects.sort((a, b) =>
            new Date(parseDate(b.date)) - new Date(parseDate(a.date))
        )
        this.setState({sortedProjects})
    }

    openModal(projectID) {
        const modalGallery = this.state.fullGallery.filter(entry => entry.projectID === projectID);
        this.setState({
            modalGallery,
            modalPosition: 0
        });
    }

    setModalPosition(position) {
        this.setState({modalPosition: position})
    }

    render() {
        const {sortedProjects, modalGallery, modalPosition} = this.state;

        return <section className="projects-list flex-col-centered">
            <h2 className="centered">List of Works</h2>
            <ul>
                {isInitialized(sortedProjects) && sortedProjects.map((project, index) =>
                    <li className="project-item" key={index}>
                        <span onClick={this.openModal.bind(this, project.projectID)}>
                            {project.title}, {parseDate(project.date)}, {parsePlaces(project.places)}
                        </span>
                    </li>
                )}
            </ul>
            {isInitialized(modalPosition) &&
            <ImageModal projects={this.props.projects}
                        gallery={modalGallery}
                        position={modalPosition}
                        setPosition={this.setModalPosition.bind(this)}/>}
        </section>
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.object,
    gallery: PropTypes.object
};

export default ProjectsList;