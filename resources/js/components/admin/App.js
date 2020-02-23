import React, { Component, setGlobal } from 'reactn'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import PrivateRoute from './helpers/PrivateRoute'
import { is_logged_in, token } from './helpers/AuthHelper'
import $ from 'jquery'
import ax from 'axios'
import Login from './Login'
import Logout from './Logout'
import Sidebar from './partials/Sidebar'
import Homepage from './Homepage'
import Password from './Password'
import CompanyInfo from './CompanyInfo'
import Users from './users/Users'
import Reminders from './reminders/Reminders'
import ReminderSingle from './reminders/ReminderSingle'
import UserSingle from './users/UserSingle'
import Marketers from './marketer/Marketers'
import MarketerSingle from './marketer/MarketerSingle'
import Customers from './marketer/Customers'
import CustomerSingle from './marketer/CustomerSingle'
import News from './news/News'
import NewsSingle from './news/NewsSingle'
import NewsCreate from './news/NewsCreate'
import NewsEdit from './news/NewsEdit'
import ToMarketers from './tomarketers/ToMarketers'
import ToMarketerSingle from './tomarketers/ToMarketerSingle'
import Withdraws from './marketer/Withdraws'
import Withdraw from './marketer/Withdraw'
import InsuranceRates from './rates/InsuranceRates'
import InsuranceRatesEdit from './rates/InsuranceRatesEdit'
import MedicRates from './rates/MedicRates'
import MedicRatesEdit from './rates/MedicRatesEdit'

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
            <BrowserRouter basename={'/admin'}>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} rtl/>
                <Sidebar/>
                <Switch>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/logout'} component={Logout}/>
                    <PrivateRoute exact path={'/'} component={Homepage}/>
                    <PrivateRoute path={'/change-password'} component={Password}/>
                    <PrivateRoute path={'/company-info'} component={CompanyInfo}/>
                    {/* Users */}
                    <PrivateRoute exact path={'/users'} component={Users}/>
                    <PrivateRoute exact path={'/user/:id'} component={UserSingle}/>
                    {/* Marketers */}
                    <PrivateRoute exact path={'/marketers'} component={Marketers}/>
                    <PrivateRoute exact path={'/marketer/:id'} component={MarketerSingle}/>
                    <PrivateRoute exact path={'/marketer/:id/customers'} component={Customers}/>
                    <PrivateRoute exact path={'/marketer/:id/customer/:cid'} component={CustomerSingle}/>
                    {/* Reminders */}
                    <PrivateRoute exact path={'/reminders'} component={Reminders}/>
                    <PrivateRoute exact path={'/reminder/:id'} component={ReminderSingle}/>
                    {/* News */}
                    <PrivateRoute exact path={'/news'} component={News}/>
                    <PrivateRoute path={'/news/create'} component={NewsCreate}/>
                    <PrivateRoute exact path={'/news/:id'} component={NewsSingle}/>
                    <PrivateRoute path={'/news/:id/edit'} component={NewsEdit}/>
                    {/* To Marketer Requests */}
                    <PrivateRoute exact path={'/to-marketer-requests'} component={ToMarketers}/>
                    <PrivateRoute path={'/to-marketer-request/:id'} component={ToMarketerSingle}/>
                    {/* Financial */}
                    <PrivateRoute exact path={'/withdraw-requests'} component={Withdraws}/>
                    <PrivateRoute path={'/withdraw-request/:id'} component={Withdraw}/>
                    {/* Rates */}
                    <PrivateRoute exact path={'/insurance-rates'} component={InsuranceRates}/>
                    <PrivateRoute path={'/insurance-rates/:id/edit'} component={InsuranceRatesEdit}/>
                    <PrivateRoute exact path={'/medic-rates'} component={MedicRates}/>
                    <PrivateRoute path={'/medic-rates/:id/edit'} component={MedicRatesEdit}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
