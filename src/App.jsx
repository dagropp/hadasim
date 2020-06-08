import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom"
import Main from "react-component/main";
import Admin from "react-component/admin";

function App() {
    return <div className="app flex-col-centered">
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/admin" component={Admin}/>
            </Switch>
        </HashRouter>
    </div>
}

export default App;