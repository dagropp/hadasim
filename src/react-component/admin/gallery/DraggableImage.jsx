import React from "react";
import PropTypes from "prop-types";
import {moveEntryInArray, removeEntryFromArrayByIndex} from "common/array_utils";
import {confirmAction} from "common/app_utils";

/**
 * Component for drag-and-drop media item.
 */
class DraggableImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragEnter: false,
            remove: false
        }
        this.dragIn = this.dragIn.bind(this);
        this.dragOut = this.dragOut.bind(this);
    }

    /**
     * Sets state.currentlyDragging to this element.
     */
    drag() {
        const {index, setCurrentlyDragging} = this.props;
        setCurrentlyDragging(index);
    }

    /**
     * Sets state.dragEnter when dragged over this element.
     * @param event {DragEvent}
     */
    dragIn(event) {
        event.preventDefault();
        this.setState({dragEnter: true});
    }

    /**
     * Sets state.dragEnter when dragged out of this element.
     */
    dragOut() {
        this.setState({dragEnter: false});
    }

    /**
     * Updates items array on element drop.
     * @param event {DragEvent}
     */
    drop(event) {
        event.preventDefault();
        const {index, currentlyDragging, setCurrentlyDragging, items, updateItems} = this.props;
        // If item was not dragged to itself:
        if (index !== currentlyDragging) {
            const update = [...items];
            // Sets the dropped item new index, and updates it in the items array
            const newIndex = currentlyDragging > index ? index + 1 : index;
            moveEntryInArray(update, currentlyDragging, newIndex)
            // Updates items and drag-related states
            updateItems(update);
            this.setState({dragEnter: false});
            setCurrentlyDragging(null);
        }
    }

    /**
     * Removes item and adds its data to removeList array.
     */
    removeItem() {
        const message = "Are you sure you want to remove image from gallery?";
        confirmAction(message, () => {
            const {items, index, updateItems, item, addToRemoveList} = this.props;
            const update = [...items];
            removeEntryFromArrayByIndex(update, index);
            updateItems(update);
            addToRemoveList("removeList", item.src);
        });
    }

    /**
     * Sets media size to larger.
     */
    enlargeImage() {
        const {items, item, index, updateItems} = this.props;
        items[index].size = item.size === "normal" ? "large" : "normal";
        updateItems(items);
    }

    /**
     * Sets media size to smaller.
     */
    reduceImage() {
        const {items, item, index, updateItems} = this.props;
        items[index].size = item.size === "normal" ? "small" : "normal";
        updateItems(items);
    }

    render() {
        const {dragEnter} = this.state;
        const {item} = this.props;
        return <div className={`draggable-wrapper ${dragEnter ? "drag-enter" : ""}`}>
            <div className={`thumbnail gallery-item ${item.orientation} ${item.size}`}>
                <div className="actions">
                    <i className={`icon-minus flex-row-centered ${item.size === "small" ? "disabled" : ""}`}
                       title="Reduce image size"
                       onClick={item.size === "small" ? null : this.reduceImage.bind(this)}/>
                    <i className={`icon-plus flex-row-centered ${item.size === "large" ? "disabled" : ""}`}
                       title="Enlarge image size"
                       onClick={item.size === "large" ? null : this.enlargeImage.bind(this)}/>
                    <i className="icon-trash flex-row-centered"
                       title="Remove from gallery"
                       onClick={this.removeItem.bind(this)}/>
                </div>
                {item.type === "image"
                    ? <img className="item-drag" src={item.src + "=small.jpg"} alt="" draggable
                           onDragStart={this.drag.bind(this)}
                           onDragEnter={this.dragIn} onDragOver={this.dragIn}
                           onDragLeave={this.dragOut} onDragEnd={this.dragOut}
                           onDrop={this.drop.bind(this)}/>
                    : <>
                        <video className="item-drag" controls={false} draggable
                               onDragStart={this.drag.bind(this)}
                               onDragEnter={this.dragIn} onDragOver={this.dragIn}
                               onDragLeave={this.dragOut} onDragEnd={this.dragOut}
                               onDrop={this.drop.bind(this)}
                               src={item.src}>
                            <p>Your browser doesn't support embedded videos</p>
                        </video>
                        <i className="icon-play flex-row-centered"/>
                    </>
                }
            </div>
        </div>
    }
}

DraggableImage.propTypes = {
    item: PropTypes.object,
    items: PropTypes.array,
    index: PropTypes.number,
    currentlyDragging: PropTypes.number,
    setCurrentlyDragging: PropTypes.func,
    addToRemoveList: PropTypes.func,
    updateItems: PropTypes.func
}

export default DraggableImage;