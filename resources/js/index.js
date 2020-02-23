import ReactDOM from "react-dom";
import App from "./components/main/App";
import React from 'reactn';

require('./sdk/imports');

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
