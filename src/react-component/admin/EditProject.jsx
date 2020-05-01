import React, {useState} from "react";
// import TitleEditor from "./TitleEditor";
// import ContentEditor from "./ContentEditor";

function EditProject(props) {
    const project = props.project || {};
    const [projectId, setProjectId] = useState(project.id || "");
    const [projectRoute, setProjectRoute] = useState(project.route || "");
    // const contentTextBox = useRef();

    function publish(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        const data = {
            id: formData.get("id"),
            route: formData.get("route"),
            title: formData.get("title"),
            description: formData.get("description")
        };
        postData(data).then(json => {
            console.log(json);
        });
    }

    function setAutoValues(event) {
        const value = event.target?.value ?? "";
        const id = window.btoa(value);
        const route = value.toLowerCase().replace(/\s/g, "_");
        setProjectId(id);
        setProjectRoute(route);
    }

    async function postData(data) {
        let response = await fetch("build/app/hadas-admin/src/controllers/publish_project.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            }
        );
        return await response.json();
    }

    return <div className="edit-project-wrapper">
        <form method="post" onSubmit={publish}>
            <input type="text" placeholder="Project Title" defaultValue={project.title || ""}/>
            <label htmlFor="id">Project ID
                <input type="text" name="id" defaultValue={projectId} readOnly/>
            </label>
            <label htmlFor="route">Project Route
                <input type="text" name="route" defaultValue={projectRoute} readOnly/>
            </label>
            <ContentEditor content={project?.content ?? ""} parentRef={contentTextBox}/>
            <button type="submit">Publish</button>
        </form>
    </div>
}

export default EditProject;