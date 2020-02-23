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
        this.handleForgetPassword = this.handleForgetPassword.bind(this)
    }

    attemptLogin(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })

        let username = englishNum($('#username').val())
        let password  = englishNum($('#password').val())

        if (username === '') {
            toast.error('لطفا نام کاربری خود را وارد کنید.')
            return
        }

        if (password === '') {
            toast.error('لطفا گذر واژه خود را وارد کنید.')
            return
        }

        ax.post('/api/marketer/login', {
            username: username,
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

    handleForgetPassword(e)
    {
        e.preventDefault()

        toast.info('در صورت فراموش کردن گذر واژه پنل بازاریاب، وارد پنل کاربری عادی خود شده و از بخش درخواست تبدیل به بازاریاب، گذر واژه پنل بازاریاب را به حالت پیش فرض برگردانید.', { autoClose: false })
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
                        ورود بازاریاب
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.attemptLogin}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="username">نام کاربری:</label>
                                    <input type="text" id="username" className="form-control"/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="password">گذر واژه:</label>
                                    <input type="password" id="password" className="form-control"/>
                                </div>
                                <div className="col-12 text-center">
                                    <div className="row align-row">
                                        <div className="col-6 text-right">
                                            <a href="#" onClick={this.handleForgetPassword}>فراموشی رمز عبور</a>
                                        </div>
                                        <div className="col-6 text-left">
                                            <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-primary disabled-btn' : 'btn btn-primary'}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                ورود
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
