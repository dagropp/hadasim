import React from "react";
import {isInitialized} from "common/app_utils";
import DraggableImage from "./DraggableImage";
import {isolateProjectsToArrays} from "common/project_utils";
import VideoProjectArrows from "./VideoProjectArrows";
import {moveEntryDownInArray, moveEntryUpInArray, removeEntryFromArrayByIndex} from "common/array_utils";

/**
 * Component that rearranges video gallery items, using drag-and-drop.
 */
class RearrangeVideoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            editMode: false
        }
    }

    componentDidMount() {
        const projects = isolateProjectsToArrays(this.props.items);
        this.setState({projects});
    }

    /**
     * Updates this project's gallery items array.
     * @param index {number} of the project.
     * @param update {array} of this project gallery items.
     */
    updateItems(index, update) {
        const {projects} = this.state;
        projects[index] = update;
        this.setState({projects}, () => this.props.updateItems(projects.flat()))
    }

    /**
     * Moves project up.
     * @param index {number} of the project.
     */
    moveProjectUp(index) {
        const {projects} = this.state;
        moveEntryUpInArray(projects, index);
        this.setState({projects}, () => this.props.updateItems(projects.flat()))
    }

    /**
     * Moves project down.
     * @param index {number} of the project.
     */
    moveProjectDown(index) {
        const {projects} = this.state;
        moveEntryDownInArray(projects, index);
        this.setState({projects}, () => this.props.updateItems(projects.flat()))
    }

    /**
     * Enables editing on the clicked-on project.
     * @param event {Event} click event.
     */
    enableEdit(event) {
        const element = event.target;
        this.setState({editMode: true}, () =>
            element.classList.add("enabled")
        )
    }

    /**
     * Disables edit mode for all projects.
     */
    disableEdit() {
        this.setState({editMode: false}, () => {
            document.querySelectorAll(".enabled-on-touch").forEach(element =>
                element.classList.remove("enabled")
            )
        });
    }

    render() {
        const {projects, editMode} = this.state;
        const {currentlyDragging, setCurrentlyDragging, addToRemoveList} = this.props;

        return <section className="gallery-wrapper videos admin-edit-gallery">
            {isInitialized(projects) && projects.map((project, index) => {
                    if (!isInitialized(project)) {
                        removeEntryFromArrayByIndex(projects, index);
                        return <span key={index}/>;
                    } else {
                        return <div className={`video-gallery-actions-wrapper ${editMode ? "edit-mode" : ""}`}
                                    key={index}>
                            <div className="image-gallery enabled-on-touch" onClick={this.enableEdit.bind(this)}>
                                <div className="overlay flex-row-centered">
                                    Click to rearrange project
                                </div>
                                {project.map((item, i) => item.show &&
                                    <DraggableImage item={item}
                                                    index={i}
                                                    key={index.toString() + i}
                                                    items={project}
                                                    currentlyDragging={currentlyDragging}
                                                    setCurrentlyDragging={setCurrentlyDragging}
                                                    updateItems={this.updateItems.bind(this, index)}
                                                    addToRemoveList={addToRemoveList}/>)}
                            </div>
                            <VideoProjectArrows items={projects} index={index}
                                                up={this.moveProjectUp.bind(this, index)}
                                                down={this.moveProjectDown.bind(this, index)}/>
                        </div>
                    }
                }
            )}
            {editMode && <div className="gallery-edit-mode" onClick={this.disableEdit.bind(this)}/>}
        </section>
    }
}

export default RearrangeVideoGallery;