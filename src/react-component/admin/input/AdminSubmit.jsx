import React, {useState} from "react";
import PropTypes from "prop-types";
import SubmitLoader from "./SubmitLoader";

/**
 * Component for general admin submit button.
 */
function AdminSubmit(props) {
    const [loading, setLoading] = useState(false);
    const {title, loaderTitle, restart} = props;

    /**
     * Checks if form is valid, and if so sets loading process.
     * @param event {Event} click event.
     */
    function startSubmitProcess(event) {
        const form = event.target.form;
        setLoading(form && form.checkValidity())
    }

    return <>
        <button className="admin-submit" type="submit" onClick={startSubmitProcess}>{title}</button>
        {loading && !restart && <SubmitLoader title={loaderTitle}/>}
    </>
}

AdminSubmit.propTypes = {
    title: PropTypes.string,
    loaderTitle: PropTypes.string,
    restart: PropTypes.bool
}

AdminSubmit.defaultProps = {
    restart: false
}

export default AdminSubmit;