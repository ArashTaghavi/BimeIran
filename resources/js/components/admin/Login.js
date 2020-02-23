import React, { Component, setGlobal } from 'reactn'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { englishNum } from '../../helper/GeneralHelper'
import n from '../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { login, token } from './helpers/AuthHelper'

export default class Login extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
        }

        this.attemptLogin = this.attemptLogin.bind(this)
    }

    attemptLogin(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })

        let email = englishNum($('#email').val())
        let password  = englishNum($('#password').val())

        if (email === '') {
            toast.error('لطفا ایمیل خود را وارد کنید.')
            return
        }

        if (password === '') {
            toast.error('لطفا گذر واژه خود را وارد کنید.')
            return
        }

        ax.post('/api/admin/login', {
            email: email,
            password: password
        }).then(response => {
            login(response.data.token)
            this.props.history.push('/')
        }).catch(reason => {
            const error = reason.response.data.error
            const code = reason.response.status

            if (code === 405) {
                toast.error('لطفا همه فیلدها را با دقت پر کنید.')
            }

            if (error === 'wrong_creds') {
                toast.error('ایمیل یا گذر واژه اشتباه است.')
            }

            this.setState({ disableForm: false })
        })
    }

    render()
    {
        if (this.global.loggedIn)
        {
            return <Redirect to={'/'}/>
        }

        return (
            <div className="login-page admin-login-page">
                <div className="card">
                    <div className="card-header">
                        ورود مدیریت
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.attemptLogin}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="email">ایمیل:</label>
                                    <input type="text" id="email" className="form-control"/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="password">گذر واژه:</label>
                                    <input type="password" id="password" className="form-control"/>
                                </div>
                                <div className="col-12 text-center">
                                    <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-primary w-25 disabled-btn' : 'btn btn-primary w-25'}>
                                        {this.state.disableForm &&
                                            <i className="fa fa-spinner fa-spin ml-2"></i>
                                        }
                                        ورود
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
