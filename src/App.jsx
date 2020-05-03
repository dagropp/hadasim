import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Main from "react-component/main";
import Admin from "react-component/admin";

function App() {

    return <div className="app flex-col-centered">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/admin" component={Admin}/>
            </Switch>
        </BrowserRouter>
    </div>
}

export default App;