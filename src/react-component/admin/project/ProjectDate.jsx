import React from "react";

/**
 * Component of project date input.
 */
class ProjectDate extends React.Component {
    render() {
        const {project} = this.props;
        const currentYear = new Date().getFullYear();
        const years = Array.from({length: 20}, (x, index) => currentYear - index);

        return <label className="project-date admin-form-field" htmlFor="date">
            <span className="title required">Project Date</span>
            <select className="project-year" name="date" required defaultValue={project.date}>
                {years.map((year, index) =>
                    <option key={index} value={year}>{year}</option>
                )}
            </select>
        </label>
    }
}

export default ProjectDate;