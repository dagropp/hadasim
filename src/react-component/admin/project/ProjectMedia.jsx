import React from "react";
import AdminMediaUpload from "react-component/admin/input/AdminMediaUpload";

/**
 * Component of project media upload input.
 */
class ProjectMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentThumbs: []
        };
    }

    componentDidMount() {
        this.setCurrentThumbs();
    }

    /**
     * Sets project's current media thumbnails.
     */
    setCurrentThumbs() {
        const {gallery, project} = this.props;
        const currentThumbs = [];
        if (project.gallery) {
            // Finds project gallery section index.
            const index = gallery.findIndex(entry => entry.name === project.gallery);
            // Filters gallery to contain only images of this project.
            const filtered = gallery[index].items.filter(entry => entry.projectId === project.id)
            // Pushes results to {File}-like object.
            for (const entry of filtered) {
                currentThumbs.push({
                    src: entry.type === "image" ? entry.src + "=small.jpg" : entry.src,
                    file: {name: entry.src, type: entry.type},
                    item: entry
                })
            }
            this.setState({currentThumbs});
        }
    }

    render() {
        const {currentThumbs} = this.state;
        const {edit, mediaActions} = this.props;
        const approvedTypes = ["video/mp4", "image/png", "image/jpeg"];

        return <AdminMediaUpload name="media[]"
                                 title="Project Media"
                                 placeholder={"Upload Media"}
                                 required={!edit}
                                 multiple={true}
                                 currentThumbs={currentThumbs}
                                 mediaActions={mediaActions}
                                 actions={true}
                                 approvedTypes={approvedTypes}
                                 {...this.props}/>
    }
}

export default ProjectMedia;