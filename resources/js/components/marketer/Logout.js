import React, { Component } from 'reactn'
import { Redirect } from 'react-router-dom'
import { logout } from './helpers/AuthHelper'

export default class Logout extends Component
{
    constructor(props)
    {
        super(props)

        logout()
    }

    render() {
        return (
            <Redirect to={'/login'}/>
        )
    }
}
