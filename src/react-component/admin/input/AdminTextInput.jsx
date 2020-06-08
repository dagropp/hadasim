import React from "react";
import PropTypes from "prop-types";

/**
 * Component for general admin text input.
 */
function AdminTextInput(props) {
    const {name, title, placeholder, required, defaultVal, type, className, changeFunc} = props;

    return <label className={`admin-form-field ${className}`} htmlFor={name}>
        <span className={`title ${required ? "required" : "optional"}`}>{title}</span>
        <input name={name}
               type={type}
               required={required}
               placeholder={placeholder}
               defaultValue={defaultVal}
               onChange={changeFunc}/>
    </label>
}

AdminTextInput.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    defaultVal: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    changeFunc: PropTypes.func
}

AdminTextInput.defaultProps = {
    type: "text",
    className: "",
    changeFunc: null
}

export default AdminTextInput;