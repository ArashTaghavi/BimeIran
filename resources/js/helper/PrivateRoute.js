import React, { Component } from 'reactn';
import { toast } from "react-toastify";
import { Route, Redirect } from 'react-router-dom';
import { is_logged_in } from "./AuthHelper";

function redirector(props) {
    toast("404: صفحه مورد نظر وجود ندارد.", {type: "error"});
    return <Redirect to={{
        pathname: "/",
        state: {from: props.location}
    }}/>;
}

export default ({component: Component, ...rest}) => (
    <Route {...rest} render={props => is_logged_in() ? (<Component {...props} />) : (redirector(props))}/>
);
