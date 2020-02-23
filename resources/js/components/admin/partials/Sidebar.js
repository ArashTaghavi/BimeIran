import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import ax from 'axios'
import $ from 'jquery'
import { toast } from 'react-toastify'
import { token } from './../helpers/AuthHelper'
import n from '../../../sdk/nprogress'
import logo from '../../../../images/logo.png'

export default class Sidebar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            menuIcon: 'menu',
        }

        this.toggleIcon = this.toggleIcon.bind(this)
    }

    toggleIcon()
    {
        if (this.state.menuIcon === 'menu') {
            this.setState({ menuIcon: 'x' })
        } else {
            this.setState({ menuIcon: 'menu' })
        }
    }

    render()
    {
        return (
            <div className={this.global.loggedIn ? 'admin-marketer-sidebar' : 'admin-marketer-sidebar d-none'}>
                <div className="admin-marketer-header">
                    <div className="row align-row">
                        <div className="col-9">
                            <h3 className="mb-0 font-weight-normal">پنل مدیریت</h3>
                        </div>
                        <div className="col-3 d-block d-md-none text-left">
                            <FeatherIcon icon={this.state.menuIcon} className="cursor-pointer" onClick={this.toggleIcon}/>
                        </div>
                    </div>
                </div>
                <div className="sidebar-wrapper">
                    <div className="text-center m-3 border-bottom pb-3">
                        <img src={logo} alt="لوگوی شرکت سروش اقتصاد"/>
                    </div>
                    <ul className="navigation">
                        <li className="nav-item">
                            <Link to={'/'}>
                                <FeatherIcon icon="home"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>داشبورد</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="has-submenu">
                                <FeatherIcon icon="plus-square"/>
                                <span className="menu-title mr-3">
                                    مدیریت نرخ های بیمه
                                </span>
                            </a>
                            <ul className="menu-content">
                                {/*<li>
                                    <Link to={'/travel-rates'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="briefcase" className="ml-2"/>
                                        بیمه مسافرتی
                                    </Link>
                                </li>*/}
                                <li>
                                    <Link to={'/medic-rates'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="plus-square" className="ml-2"/>
                                        بیمه پزشکان
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/insurance-rates'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="plus-square" className="ml-2"/>
                                        سایر بیمه ها
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="has-submenu">
                                <FeatherIcon icon="credit-card"/>
                                <span className="menu-title mr-3">
                                    مدیریت امور مالی
                                </span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to={'/withdraw-requests'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="share" className="ml-2"/>
                                        درخواست های پرداخت وجه
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to={'/reminders'}>
                                <FeatherIcon icon="list"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    لیست یادآور ها
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/to-marketer-requests'}>
                                <FeatherIcon icon="trending-up"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    درخواست تبدیل به بازاریاب
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/marketers'}>
                                <FeatherIcon icon="users"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    لیست بازاریاب ها
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/users'}>
                                <FeatherIcon icon="users"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    لیست کاربران
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="has-submenu">
                                <FeatherIcon icon="cast"/>
                                <span className="menu-title mr-3">
                                    مدیریت اخبار
                                </span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to={'/news'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="list" className="ml-2"/>
                                        لیست اخبار
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/news/create'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="plus-square" className="ml-2"/>
                                        افزودن خبر جدید
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to={'/company-info'}>
                                <FeatherIcon icon="settings"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    تنظیمات
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/change-password'}>
                                <FeatherIcon icon="lock"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    تغییر گذر واژه
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/" target="_blank">
                                <FeatherIcon icon="chrome"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    مشاهده سایت
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={'/logout'}>
                                <FeatherIcon icon="log-out"/>
                                <span className="menu-item mr-3" onClick={this.toggleIcon}>
                                    خروج
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
