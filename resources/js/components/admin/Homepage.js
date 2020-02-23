import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './helpers/AuthHelper'

export default class Homepage extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            loading: true,
            marketerQty: '',
            reminderQty: '',
            toMarketerQty: '',
            userQty: '',
            withdrawQty: ''
        }
    }

    componentDidMount()
    {
        ax.get('/api/admin/statistics', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                toMarketerQty: response.data.to_marketer_qty,
                marketerQty: response.data.marketer_qty,
                reminderQty: response.data.reminder_qty,
                userQty: response.data.user_qty,
                withdrawQty: response.data.withdraw_qty,
                loading: false
            })
        }).catch(reason => {
            // console.log(reason.response)
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>درخواست یادآوری</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.reminderQty}</span>
                            }
                            <p className="text-left mb-0">درخواست معلق</p>
                            <Link to={'/reminders'} className="btn btn-primary">مشاهده درخواست ها</Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>درخواست برداشت وجه</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.withdrawQty}</span>
                            }
                            <p className="text-left mb-0">درخواست بررسی نشده</p>
                            <Link to={'/withdraw-requests'} className="btn btn-primary">مشاهده درخواست ها</Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>درخواست تبدیل به بازاریاب</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.toMarketerQty}</span>
                            }
                            <p className="text-left mb-0">درخواست بررسی نشده</p>
                            <Link to={'/to-marketer-requests'} className="btn btn-primary">مشاهده درخواست ها</Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>بازاریاب ها</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.marketerQty}</span>
                            }
                            <p className="text-left mb-0">بازاریاب ثبت شده است.</p>
                            <Link to={'/marketers'} className="btn btn-primary">مشاهده بازاریاب ها</Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mb-4">
                        <div className="card card-scale shadow-sm p-3 p-md-4">
                            <h4>کاربران</h4>
                            {this.state.loading &&
                                <span className="d-block text-left stat-number"><i className="fa fa-spinner fa-spin"></i></span>
                            }
                            {!this.state.loading &&
                                <span className="d-block text-left stat-number">{this.state.userQty}</span>
                            }
                            <p className="text-left mb-0">کاربر ثبت شده است.</p>
                            <Link to={'/users'} className="btn btn-primary">مشاهده کاربران</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
