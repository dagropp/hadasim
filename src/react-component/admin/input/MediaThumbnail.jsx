import React from "react";
import PropTypes from "prop-types";
import {confirmAction, isInitialized} from "common/app_utils";

/**
 * Component for media thumbnail.
 */
class MediaThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remove: false,
            show: true,
            credits: "",
        }
    }

    componentDidMount() {
        if (this.props.actions) {
            [this.mediaActions, this.setMediaActions] = this.props.mediaActions;
        }
        const {item} = this.props.data;
        if (isInitialized(item)) {
            this.setState({show: item.show, credits: item.credits})
        }
    }

    /**
     * Removes thumbnail and adds its data to mediaActions array.
     */
    removeThumb() {
        const message = "Are you sure you want to remove item from project?";
        confirmAction(message, () => {
            const {data, current} = this.props;
            this.setMediaActions(data.file, current, "remove", true)
            this.setState({remove: true});
        })
    }

    /**
     * Toggles hide/show for thumbnail and adds its data to mediaActions array.
     */
    toggleHideThumb() {
        const {data, current} = this.props;
        let {show} = this.state;
        show = !show;
        this.setMediaActions(data.file, current, "show", show);
        this.setState({show});
    }

    /**
     * Sets credits for thumbnail and adds its data to mediaActions array.
     * @param event {Event} input change event.
     */
    setCredits(event) {
        const {data, current} = this.props;
        const credits = event.target.value;
        this.setMediaActions(data.file, current, "credits", credits);
    }

    render() {
        const {data, current, actions, approvedTypes} = this.props;
        const {remove, show, credits} = this.state;
        const {type, size} = data.file;
        const isApprovedType = current || !isInitialized(approvedTypes) || approvedTypes.includes(type);
        const isApprovedSize = current || size <= 5000000;

        return !remove && <div className={`thumbnail ${current ? "current" : "new"}`}>
            {actions && <div className="actions">
                <i className={`${show ? "icon-show" : "icon-hide"} flex-row-centered`}
                   title={show ? "Hide from gallery" : "Show in gallery"}
                   onClick={this.toggleHideThumb.bind(this)}/>
                <i className="icon-trash flex-row-centered"
                   aria-label="Remove from Project"
                   title="Remove from Project"
                   onClick={this.removeThumb.bind(this)}/>
            </div>}
            <div className="item-wrapper flex-col-centered">
                {!isApprovedType && <div className="upload-invalid-disclaimer flex-row-centered">
                    {type.split("/")[1]} not supported</div>}
                {type.startsWith("image") &&
                <img src={data.src} alt={`Upload preview for '${data.file.name}'`}/>}
                {type.startsWith("video") && <>
                    {isApprovedType && !isApprovedSize && <div className="upload-invalid-disclaimer flex-row-centered">
                        File is {(size / 1000000).toFixed(2)}MB Max file size 5MB</div>}
                    <video controls={false} muted={true}>
                        <source src={data.src}/>
                    </video>
                    <i className="icon-play flex-row-centered"/>
                </>}
            </div>
            {actions && <input type="text" placeholder="Add Credits..." defaultValue={credits}
                               onChange={this.setCredits.bind(this)}/>}
        </div>
    }
}

MediaThumbnail.propTypes = {
    data: PropTypes.object,
    current: PropTypes.bool,
    mediaActions: PropTypes.array,
    actions: PropTypes.bool,
    approvedTypes: PropTypes.array
}

MediaThumbnail.defaultProps = {
    approvedTypes: []
}

export default MediaThumbnail;