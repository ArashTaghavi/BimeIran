import ReactDOM from "react-dom";
import App from "./components/marketer/App";
import React from 'reactn';

require('./sdk/imports');

if (document.getElementById('marketer')) {
    ReactDOM.render(<App/>, document.getElementById('marketer'));
}
