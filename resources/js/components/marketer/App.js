import React, { Component, setGlobal } from 'reactn'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import PrivateRoute from './helpers/PrivateRoute'
import { is_logged_in, token } from './helpers/AuthHelper'
import $ from 'jquery'
import ax from 'axios'
import Homepage from './Homepage'
import Login from './Login'
import Logout from './Logout'
import Sidebar from './partials/Sidebar'
import Password from './Password'
import AccountInfo from './financial/AccountInfo'
import Withdraw from './financial/Withdraw'
import WithdrawList from './financial/WithdrawList'
import Customers from './customers/Customers'
import CustomerSingle from './customers/CustomerSingle'
import CustomerCreate from './customers/CustomerCreate'
import CustomerEdit from './customers/CustomerEdit'

export default class App extends Component
{
    constructor(props)
    {
        super(props)

        this.setGlobal({
            loggedIn: is_logged_in(),
        })
    }

    render()
    {
        return (
            <BrowserRouter basename={'/marketer'}>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} rtl/>
                <Sidebar/>
                <Switch>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/logout'} component={Logout}/>
                    <PrivateRoute exact path={'/'} component={Homepage}/>
                    <PrivateRoute path={'/change-password'} component={Password}/>
                    {/* Financial */}
                    <PrivateRoute path={'/account-info'} component={AccountInfo}/>
                    <PrivateRoute exact path={'/withdraw'} component={Withdraw}/>
                    <PrivateRoute path={'/withdraw-list'} component={WithdrawList}/>
                    {/* Customers */}
                    <PrivateRoute exact path={'/customers'} component={Customers}/>
                    <PrivateRoute exact path={'/customer/create'} component={CustomerCreate}/>
                    <PrivateRoute exact path={'/customer/:id'} component={CustomerSingle}/>
                    <PrivateRoute path={'/customer/:id/edit'} component={CustomerEdit}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
