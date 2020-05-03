import React from "react";

function DateInput(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 20}, (x, index) => currentYear - index)
    const project = props.project;

    return <div className="date-input">
        <select name="year" required={true} defaultValue={project?.date?.year ?? ""}>
            {years.map((year, index) =>
                <option key={index} value={year}>{year}</option>
            )}
        </select>
        <select name="month" defaultValue={project?.date?.month ?? ""}>
            {months.map((month, index) =>
                <option key={index} value={index + 1}>{month}</option>
            )}
        </select>
    </div>
}

export default DateInput;