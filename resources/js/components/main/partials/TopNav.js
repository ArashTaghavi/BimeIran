import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import ax from 'axios'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import { login } from '../../../helper/AuthHelper'
import { englishNum } from '../../../helper/GeneralHelper'
import logo from '../../../../images/logo.png'
import iran_ins_logo from '../../../../images/iran_insurance_logo.png'
import login_bg from '../../../../images/login_bg.jpg'

export default class TopNav extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            loginStep: 1,
            phone: '',
            showLoginModal: false,
        }

        this.openLoginModal = this.openLoginModal.bind(this)
        this.closeLoginModal = this.closeLoginModal.bind(this)
        this.handlePhoneNumberSubmit = this.handlePhoneNumberSubmit.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleForgotPassword = this.handleForgotPassword.bind(this)
        this.handleResetPassword = this.handleResetPassword.bind(this)
    }

    openLoginModal()
    {
        this.setState({ showLoginModal: true })
    }

    closeLoginModal()
    {
        this.setState({ showLoginModal: false, loginStep: 1, disableForm: false })
    }

    handlePhoneNumberSubmit()
    {
        let phone_number = englishNum($('#phone_number').val())

        if (phone_number.length !== 11 || isNaN(phone_number)) {
            toast.error('لطفا شماره موبایل خود را در 11 رقم و به درستی وارد کنید.')
            return
        }

        this.setState({ disableForm: true })

        n.start()
        ax.post('/api/request_login', {
            phone: phone_number
        }).then(response => {
            this.setState({
                loginStep: response.data.status,
                disableForm: false,
                phone: response.data.phone
            })
            n.done()
        }).catch(reason => {

            const error = reason.response.data.error
            const code = reason.response.status

            if (code === 405) {
                toast.error('لطفا شماره موبایل خود را به درستی وارد کنید.')
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    handleRegister()
    {
        let register_token = englishNum($('#register_token').val())
        let password = englishNum($('#password').val())

        if (register_token.length !== 5 || isNaN(register_token)) {
            toast.error('کد 5 رقمی وارد شده اشتباه است.')
            return
        }

        if (password.length < 8) {
            toast.error('گذر واژه نمی تواند کمتر از 8 رقم باشد.')
            return
        }

        if ($('#first_name').val() === '' || $('#first_name').val() === '') {
            toast.error('نام یا نام خانوادگی نمی تواند خالی باشد.')
            return
        }

        this.setState({ disableForm: true })

        n.start()
        ax.post('/api/authenticate_token', {
            phone: this.state.phone,
            token: register_token,
            fname: $('#first_name').val(),
            lname: $('#last_name').val(),
            password: password,
            password_confirmation: englishNum($('#password_confirmation').val()),
        }).then(response => {
            if (response.data.status === 1) {
                login(response.data.token, this.state.phone, response.data.user)
                this.setState({ showLoginModal: false, disableForm: false, loginStep: 1 })
                n.done()
            }
        }).catch(reason => {
            if (reason.response.status === 405) {
                let errors = reason.response.data
                let i
                for (let key in errors) {
                    for (i = 0; i < errors[key].length; i++) {
                        toast.error(errors[key][i])
                    }
                }
            }

            const error = reason.response.data.error;

            if (error === 'wrong_token') {
                toast.error('کد 5 رقمی وارد شده اشتباه است.')
            }

            if (error === 'too_late') {
                toast.error('کد 5 رقمی منقضی شده است.')
            }
        }).then(value => {
            this.setState({ disableForm: false }, () => {
                $('#register_token').val('').focus()
            })
            n.done()
        })
    }

    handleLogin()
    {
        let password = englishNum($('#login_password').val())
        let phone = this.state.phone

        this.setState({ disableForm: true })

        n.start()
        ax.post('/api/login', {
            password: password,
            phone: phone
        }).then(response => {
            if (response.data.status === 1) {
                login(response.data.token, this.state.phone, response.data.user)
                this.setState({ showLoginModal: false, disableForm: false, loginStep: 1 })
                n.done()
            }
        }).catch(reason => {
            if (reason.response.status === 405) {
                toast.error('گذر واژه وارد شده اشتباه است.')
            }

            const error = reason.response.data.error;

            if (error === 'wrong_password') {
                toast.error('گذر واژه وارد شده اشتباه است.')
            }
        }).then(value => {
            this.setState({ disableForm: false }, () => {
                $('#login_password').val('').focus()
            })
            n.done()
        })
    }

    handleForgotPassword()
    {
        let phone = this.state.phone

        this.setState({ disableForm: true })

        n.start()
        ax.post('/api/forgot_password', {
            phone: phone
        }).then(response => {
            this.setState({
                loginStep: response.data.status,
                disableForm: false
            })
            n.done()
        }).catch(reason => {

            if (reason.response.status === 405) {
                toast.error('وارد کردن شماره همراه الزامی است.')
            }

            const error = reason.response.data.error

            if (error === 'wrong_number') {
                toast.error('کاربری با این شماره همراه وجود ندارد.')
            }

            this.setState({ disableForm: false })
            n.done()
        })
    }

    handleResetPassword()
    {
        let reset_password_token = englishNum($('#reset_password_token').val())
        let password = englishNum($('#new_password').val())

        if (reset_password_token.length !== 5 || isNaN(reset_password_token)) {
            toast.error('کد 5 رقمی وارد شده اشتباه است.')
            return
        }

        if (password.length < 8) {
            toast.error('گذر واژه نمی تواند کمتر از 8 رقم باشد.')
            return
        }

        this.setState({ disableForm: true })

        n.start()
        ax.post('/api/authenticate_token', {
            phone: this.state.phone,
            token: reset_password_token,
            password: password,
            password_confirmation: englishNum($('#new_password_confirmation').val()),
        }).then(response => {
            if (response.data.status === 1) {
                login(response.data.token, this.state.phone, response.data.user)
                this.setState({ showLoginModal: false, disableForm: false, loginStep: 1 })
                n.done()
            }
        }).catch(reason => {
            if (reason.response.status === 405) {
                let errors = reason.response.data
                let i
                for (let key in errors) {
                    for (i = 0; i < errors[key].length; i++) {
                        toast.error(errors[key][i])
                    }
                }
            }

            const error = reason.response.data.error;

            if (error === 'wrong_token') {
                toast.error('کد 5 رقمی وارد شده اشتباه است.')
            }

            if (error === 'too_late') {
                toast.error('کد 5 رقمی منقضی شده است.')
            }
        }).then(value => {
            this.setState({ disableForm: false }, () => {
                $('#register_token').val('').focus()
            })
            n.done()
        })
    }

    render()
    {
        return (
            <div className="navbar-wrapper">
                <div className="container">
                    <nav className="navbar mj-nav navbar-expand-lg">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleProductPageNavbar">
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="navbar-brand">
                            <Link to={'/'}><img src={iran_ins_logo} alt="لوگوی بیمه ایران" style={{maxWidth: '50px'}}/></Link>
                        </div>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mobile-brand">
                                    <Link to={'/'}><img src={logo} alt="Logo"/></Link>
                                </li>
                                {/*<li className="nav-item pages-link dropdown">
                                    <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbardrop" data-toggle="dropdown">
                                        بیمه وسایل نقلیه
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="#">بیمه شخص ثالث</a>
                                        <a href="#">بیمه بدنه</a>
                                        <a href="#">بیمه موتور</a>
                                    </div>
                                </li>
                                <li className="nav-item pages-link dropdown">
                                    <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbardrop" data-toggle="dropdown">
                                        بیمه اشخاص
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="#">بیمه مسافرتی</a>
                                        <a href="#">بیمه عمر</a>
                                        <a href="#">حوادث انفرادی</a>
                                        <a href="#">درمان تکمیلی</a>
                                    </div>
                                </li>
                                <li className="nav-item pages-link dropdown">
                                    <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbardrop" data-toggle="dropdown">
                                        بیمه اموال
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="#">بیمه آتش سوزی</a>
                                        <a href="#">بیمه زلزله</a>
                                    </div>
                                </li>
                                <li className="nav-item pages-link dropdown">
                                    <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="navbardrop" data-toggle="dropdown">
                                        بیمه مسئولیت
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="#">بیمه مسئولیت پزشکان</a>
                                    </div>
                                </li>*/}
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link" >خانه</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/reminder'} className="nav-link" >تنظیم یادآور</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/contribute'} className="nav-link" >همکاری با ما</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://blog.bimeiran.ir/" target="_blank">بلاگ</a>
                                </li>
                            </ul>
                        </div>
                        <div id="main-modal"></div>
                        <div>
                            {this.global.loggedIn &&
                                <button className="dropdown dashboard-dropdown">
                                    <a className="dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown">
                                        {this.global.fname + ' ' + this.global.lname}
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link to={'/dashboard'}>داشبورد<i className="fa fa-dashboard mr-2"></i></Link>
                                        <Link to={'/dashboard'}>بیمه های من<i className="fa fa-medkit mr-2"></i></Link>
                                        <hr/>
                                        <Link to={'/logout'}>خروج<i className="fa fa-sign-out mr-2"></i></Link>
                                    </div>
                                </button>
                            }
                            {!this.global.loggedIn &&
                                <button onClick={this.openLoginModal} className="btn btn-primary">
                                    <i className="fa fa-user ml-2"></i>ورود / ثبت نام
                                </button>
                            }
                        </div>
                    </nav>
                </div>

                {this.state.showLoginModal &&
                    <div className="login-modal">
                        <i className="fa fa-close" onClick={this.closeLoginModal}></i>
                        <div className="login-box">
                            <img src={login_bg} alt="Login Background Image"/>
                            <div className="login-form">
                                <h4><i className="fa fa-user"></i> ورود / ثبت نام</h4>
                                { this.state.loginStep === 1 &&
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <p>برای ورود یا ثبت نام شماره تلفن همراه خود را وارد کنید:</p>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" id="phone_number" name="phone_number" placeholder="موبایل"/>
                                        </div>
                                        <div className="col-12 text-center border-bottom mb-3 pb-3">
                                            <button onClick={this.handlePhoneNumberSubmit} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'disabled-btn' : ''}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                ارسال
                                            </button>
                                        </div>
                                        <div className="col-12 text-center">
                                            <a href="/marketer/login" target="_blank" className="text-white btn btn-warning">ورود به عنوان بازاریاب</a>
                                        </div>
                                    </div>
                                }
                                { this.state.loginStep === 2 &&
                                    <div className="row mj-leftslide">
                                        <div className="col-12 mb-3">
                                            <p>برای ثبت نام کد ارسال شده بعلاوه مشخصات خود را وارد نمایید:</p>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" id="register_token" name="register_token" placeholder="کد 5 رقمی"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" id="first_name" name="first_name" placeholder="نام"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" id="last_name" name="last_name" placeholder="نام خانوادگی"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="password" id="password" name="password" placeholder="گذر واژه"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="password" id="password_confirmation" name="password_confirmation" placeholder="تکرار گذر واژه"/>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleRegister} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'disabled-btn' : ''}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                ثبت نام
                                            </button>
                                        </div>
                                    </div>
                                }
                                { this.state.loginStep === 3 &&
                                    <div className="row mj-leftslide">
                                        <div className="col-12 mb-3">
                                            <p>برای ورود گذر واژه خود را وارد کنید:</p>
                                        </div>
                                        <div className="col-12">
                                            <input type="password" id="login_password" name="login_password" placeholder="گذر واژه"/>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleLogin} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'disabled-btn' : ''}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                ورود
                                            </button>
                                        </div>
                                        <div className="col-8"></div>
                                        <div className="col-12 mb-2 mt-2 pt-2 border-top">
                                            <p>گذر واژه خود را فراموش کرده اید؟</p>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleForgotPassword} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'disabled-btn' : ''}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                بازیابی گذر واژه
                                            </button>
                                        </div>
                                    </div>
                                }
                                { this.state.loginStep === 4 &&
                                    <div className="row mj-leftslide">
                                        <div className="col-12 mb-3">
                                            <p>برای ورود کد ارسال شده را وارد کرده و گذر واژه خود را تغییر دهید:</p>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" id="reset_password_token" name="reset_password_token" placeholder="کد 5 رقمی"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="password" id="new_password" name="new_password" placeholder="گذر واژه جدید"/>
                                        </div>
                                        <div className="col-12">
                                            <input type="password" id="new_password_confirmation" name="new_password_confirmation" placeholder="تکرار گذر واژه جدید"/>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button onClick={this.handleResetPassword} disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'disabled-btn' : ''}>
                                                {this.state.disableForm &&
                                                    <i className="fa fa-spinner fa-spin ml-2"></i>
                                                }
                                                تغییر گذر واژه و ورود
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
