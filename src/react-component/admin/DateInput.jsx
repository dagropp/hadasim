import React from "react";
import {isInitialized} from "../../common/utils";

function DateInput() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const years = setYears();

    function setYears() {
        let result = []
        const oldest = 2000;
        for (let year = new Date().getFullYear(); year <= oldest; year--) {
            result.push(year);
        }
        return result;
    }

    return <div>
        <select name="year" required={true}>
            {isInitialized(years) && years.map((year, index) =>
                <option key={index} value={year}>{year}</option>
            )}
        </select>
        <select name="month">
            {months.map((month, index) =>
                <option key={index} value={index + 1}>{month}</option>
            )}
        </select>
    </div>
}

export default DateInput;