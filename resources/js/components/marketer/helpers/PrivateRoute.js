import React, { Component } from 'reactn'
import { Route, Redirect } from 'react-router-dom'
import { is_logged_in } from "./AuthHelper"

function redirector(props) {
    return <Redirect to={{
                pathname: "/login",
                state: {from: props.location}
            }}/>
}

export default ({component: Component, ...rest}) => (
    <Route {...rest} render={props => is_logged_in() ? (<Component {...props} />) : (redirector(props))}/>
)
