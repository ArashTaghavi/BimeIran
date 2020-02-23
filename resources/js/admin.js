import ReactDOM from "react-dom";
import App from "./components/admin/App";
import React from 'reactn';

require('./sdk/imports');

if (document.getElementById('admin')) {
    ReactDOM.render(<App/>, document.getElementById('admin'));
}
