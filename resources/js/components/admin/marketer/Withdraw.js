import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import { englishNum } from '../../../helper/GeneralHelper'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class Withdraw extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            disableForm: false,
            loading: true,
            withdraw: {},
        }

        this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/withdraw/${this.props.match.params.id}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            if (response.data.withdraw.status !== 0) {
                this.props.history.goBack()
            } else {
                this.setState({ withdraw: response.data.withdraw, loading: false })
            }
        }).catch(reason => {
            // console.log(reason)
        })
    }

    goBack(e)
    {
        e.preventDefault()

        this.props.history.goBack()
    }

    handleAcceptRequest(e)
    {
        e.preventDefault()

        this.setState({ disableForm: true })
        n.start()

        const formData = new FormData()

        formData.append('id', this.state.withdraw.id)
        formData.append('tracking_code', englishNum($('#tracking_code').val()))

        ax.post(`/api/admin/withdraw/accept`, formData, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            toast.success('درخواست پرداخت وجه با موفقیت تایید شد.')
            this.setState({ disableForm: false })
            n.done()
            this.props.history.push('/withdraw-requests')
        }).catch(reason => {
            // console.log(reason)
            this.setState({ disableForm: false })
            n.done()
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    {this.state.loading &&
                        <h4 className="mb-4"><i className="fa fa-spinner fa-spin"></i></h4>
                    }
                    {!this.state.loading &&
                        <h4 className="mb-4">پرداخت وجه به مبلغ {this.state.withdraw.amount ? this.state.withdraw.amount : ''} ریال</h4>
                    }
                    <h5>مشخصات بانکی بازاریاب:</h5>
                    {!this.state.loading &&
                        <div className="row align-row mb-4">
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>نام بانک</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.withdraw.account.bank_name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>شماره حساب</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.withdraw.account.account_number}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-12 col-xl-6 mb-2 mb-xl-0">
                                        <strong>شماره شبا</strong>
                                    </div>
                                    <div className="col-12 col-xl-6 text-right text-xl-left">
                                        {this.state.withdraw.account.shaba_number}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-12 col-xl-6 mb-2 mb-xl-0">
                                        <strong>شماره کارت</strong>
                                    </div>
                                    <div className="col-12 col-xl-6 text-right text-xl-left">
                                        {this.state.withdraw.account.card_number}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <form onSubmit={this.handleAcceptRequest} className="admin-marketer-panel-form">
                        <div className="row align-row">
                            <div className="col-12 mb-3">
                                <p>در صورت پرداخت وجه درخواستی، کد رهگیری را وارد کنید.</p>
                                <input type="text" id="tracking_code" className="form-control w-50" placeholder="کد رهگیری"/>
                            </div>
                            <div className="col-12 mb-3">
                                <button type="submit" disabled={this.state.disableForm ? 'disabled' : ''} className={this.state.disableForm ? 'btn btn-success ml-2 disabled-btn' : 'btn btn-success ml-2'}>
                                    {this.state.disableForm &&
                                        <i className="fa fa-spinner fa-spin ml-2"></i>
                                    }
                                    <i className="fa fa-check ml-2"></i>
                                    ثبت
                                </button>
                                <button className="btn btn-info" onClick={this.goBack}>
                                    <i className="fa fa-reply ml-2"></i>
                                    بازگشت
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
