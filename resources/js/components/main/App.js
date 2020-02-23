import React, { Component, setGlobal } from 'reactn'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import ax from 'axios'
import { is_logged_in, tokenStorage } from '../../helper/AuthHelper'
import PrivateRoute from '../../helper/PrivateRoute'
import Homepage from './Homepage'
import Logout from './Logout'
import NotFound from './NotFound'
import Dashboard from './Dashboard'
import Reminder from './Reminder'
import BuyInsurance from './BuyInsurance'
import TopNav from './partials/TopNav'
import Footer from './partials/Footer'

export default class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            companyInfo: {}
        };

        setGlobal({
            loggedIn: is_logged_in(),
            phone: tokenStorage.getItem('phone'),
            fname: tokenStorage.getItem('fname'),
            lname: tokenStorage.getItem('lname')
        })
    }

    componentDidMount()
    {
        ax.get('/api/company-info')
        .then(response => {
            this.setState({ companyInfo: response.data.company_info })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    render()
    {
        return (
            <BrowserRouter>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} rtl/>
                <TopNav/>
                <Switch>
                    <Route exact path={'/'} component={Homepage}/>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path={'/:insurance_name/compare'} component={BuyInsurance}/>
                    <PrivateRoute path={'/dashboard'} component={Dashboard}/>
                    <Route path={'/reminder'} component={Reminder}/>
                    <Route component={NotFound}/>
                </Switch>
                <Footer companyInfo={this.state.companyInfo}/>
            </BrowserRouter>
        )
    }
}
