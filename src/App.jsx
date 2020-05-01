import React from "react";
import AppHeader from "./react-component/main/AppHeader";
import HomeExhibit from "./react-component/main/HomeExhibit";
import {testDevice, isInitialized} from "./common/utils";
import Sculptures from "./react-component/main/Sculptures";
import Paintings from "./react-component/main/Paintings";
import ProjectsList from "./react-component/main/ProjectsList";
import Contact from "./react-component/main/Contact";
import Legal from "./react-component/main/Legal";
import {useData} from "./common/custom-hooks";
import Videos from "./react-component/main/Videos";
import DateInput from "./react-component/admin/DateInput";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom"

function App() {
    const projects = useData("/data/projects.json");
    const isPhone = testDevice("phone");

    return <div className="app flex-col-centered">
        <BrowserRouter>
            <Switch>
                <Route path="/admin">
                    <h2>Admin</h2>
                    <DateInput/>
                </Route>
                <Route path="/">
                    <AppHeader isPhone={isPhone}/>
                    <main className="app-wrapper">
                        <HomeExhibit isPhone={isPhone}/>
                        {isInitialized(projects.sculptures) && <Sculptures items={projects.sculptures}/>}
                        {isInitialized(projects.paintings) && <Paintings items={projects.paintings}/>}
                        <Videos/>
                        <Contact/>
                        {isInitialized(projects) && <ProjectsList projects={projects}/>}
                    </main>
                    <footer className="app-footer">
                        <hr/>
                        <Legal/>
                        <Link to="/admin">Admin Page</Link>
                    </footer>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
}

export default App;