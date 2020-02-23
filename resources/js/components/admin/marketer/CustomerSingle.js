import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class CustomerSingle extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            loading: true,
            customer: {},
        }

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/marketers/${this.props.match.params.id}/customers/${this.props.match.params.cid}`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            this.setState({
                loading: false,
                customer: response.data.customer
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
                    <h4 className="mb-4">ریز مشخصات مشتری</h4>
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
                                        {this.state.customer.full_name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-4">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>کد ملی</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.customer.national_code}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-4">
                                <div className="row align-row border-bottom no-gutters p-2">
                                    <div className="col-6">
                                        <strong>شماره موبایل</strong>
                                    </div>
                                    <div className="col-6 text-left">
                                        {this.state.customer.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row align-row no-gutters p-2">
                                    <div className="col-12 mb-3">
                                        <strong>آدرس</strong>
                                    </div>
                                    <div className="col-12">
                                        {this.state.customer.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="text-left">
                        <button onClick={this.goBack} className="btn btn-primary">بازگشت</button>
                    </div>
                </div>
            </div>
        )
    }
}
