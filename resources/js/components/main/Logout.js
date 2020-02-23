import React, { Component } from 'reactn'
import { Redirect } from 'react-router-dom'
import ax from 'axios'
import n from '../../sdk/nprogress'
import { logout, tokenStorage } from "../../helper/AuthHelper"

export default class Logout extends Component
{
    constructor(props)
    {
        super(props)

        n.start()
        ax.post("/api/logout", {
            token: tokenStorage.getItem("x-ref-token")
        }).then(r => {
            logout()
            n.done()
        })
    }

    render()
    {
        return (
            <Redirect to={"/"}/>
        )
    }
}
