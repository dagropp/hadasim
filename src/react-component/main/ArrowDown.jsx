import React from "react";

function ArrowDown(props) {
    const style = {
        top: props.top ? props.top + "px" : "auto",
        right: props.right ? props.right + "px" : "auto",
        bottom: props.bottom ? props.bottom + "px" : "auto",
        left: props.left ? props.left + "px" : "auto",
    }

    return <svg className="scroll-arrow" height="73" width="31" style={style}>
        <rect x="13.7" className="arrow-line" width="3" height="71.5"/>
        <polygon className="arrow-head" points="15.3,73.9 0,54.8 2.3,52.9 15.3,69.1 28,53.2 30.3,55.1"/>
    </svg>
}

export default ArrowDown;