import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class MarketerSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            loading: true,
            marketer: {},
        }

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/marketers/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                loading: false,
                marketer: response.data.marketer
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    goBack()
    {
        this.props.history.goBack()
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">ریز مشخصات بازاریاب</h4>
                    {this.state.loading &&
                        <h4><i className="fa fa-spinner fa-spin"></i></h4>
                    }
                    {!this.state.loading &&
                        <div className="row align-row mb-5">
                            <div className="col-12 col-sm-6 col-xl-4">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>نام و نام خانوادگی</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.marketer.fname + ' ' + this.state.marketer.lname}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-4">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>شماره موبایل</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.marketer.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>نام بانک</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.marketer.marketer_account.bank_name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>شماره حساب</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.marketer.marketer_account.account_number}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-12 col-xl-6 mb-2 mb-xl-0">
                                        <strong>شماره شبا</strong>
                                    </div>
                                    <div className="col-12 col-xl-6 text-right text-xl-left">
                                        {this.state.marketer.marketer_account.shaba_number}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-12 col-xl-6 mb-2 mb-xl-0">
                                        <strong>شماره کارت</strong>
                                    </div>
                                    <div className="col-12 col-xl-6 text-right text-xl-left">
                                        {this.state.marketer.marketer_account.card_number}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="row align-row">
                        <div className="col-6">
                            <Link to={'/marketer/' + this.state.marketer.id + '/customers'} className="btn btn-warning">لیست مشتریان</Link>
                        </div>
                        <div className="col-6 text-left">
                            <button onClick={this.goBack} className="btn btn-primary">بازگشت</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
