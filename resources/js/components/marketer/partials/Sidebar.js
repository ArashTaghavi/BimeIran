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
                            <h3 className="mb-0 font-weight-normal">پنل بازاریاب</h3>
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
                                <FeatherIcon icon="credit-card"/>
                                <span className="menu-title mr-3">
                                    امور مالی
                                </span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to={'/account-info'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="edit" className="ml-2"/>
                                        ویرایش اطلاعات بانکی
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/withdraw'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="share" className="ml-2"/>
                                        درخواست برداشت وجه
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/withdraw-list'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="list" className="ml-2"/>
                                        لیست درخواست ها
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="has-submenu">
                                <FeatherIcon icon="users"/>
                                <span className="menu-title mr-3">
                                    مدیریت مشتریان
                                </span>
                            </a>
                            <ul className="menu-content">
                                <li>
                                    <Link to={'/customers'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="list" className="ml-2"/>
                                        لیست مشتریان
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/customer/create'} className="menu-item" onClick={this.toggleIcon}>
                                        <FeatherIcon icon="plus-square" className="ml-2"/>
                                        افزودن مشتری جدید
                                    </Link>
                                </li>
                            </ul>
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
