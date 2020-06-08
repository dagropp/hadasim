import React from "react";
import PropTypes from "prop-types";

/**
 * Component for general admin textarea input.
 */
function AdminTextArea(props) {
    const {name, title, placeholder, required, defaultVal, className, changeFunc} = props;

    return <label className={`admin-form-field ${className}`} htmlFor={name}>
        <span className={`title ${required ? "required" : "optional"}`}>{title}</span>
        <textarea name={name}
                  required={required}
                  placeholder={placeholder}
                  defaultValue={defaultVal}
                  onChange={changeFunc}/>
    </label>
}

AdminTextArea.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    defaultVal: PropTypes.string,
    className: PropTypes.string,
    changeFunc: PropTypes.func
}

AdminTextArea.defaultProps = {
    className: "",
    changeFunc: null
}

export default AdminTextArea;