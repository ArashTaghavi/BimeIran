import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
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
            customer: {}
        }
    }

    componentDidMount()
    {
        ax.get(`/api/marketer/customers/${this.props.match.params.id}`, {
            headers: {
                'marketer-token': token(),
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

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    {this.state.loading &&
                        <h4 className="mb-4"><i className="fa fa-spinner fa-spin"></i></h4>
                    }
                    {!this.state.loading &&
                        <h4 className="mb-4">مشاهده ریز مشخصات مشتری</h4>
                    }
                    <div className="row align-row mb-3">
                        {this.state.loading &&
                            <div className="col-12"><i className="fa fa-spinner fa-spin"></i></div>
                        }
                        {!this.state.loading &&
                            <div className="col-12 mb-3">
                                <div className="row align-row">
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
                                            <div className="col-12 mb-2">
                                                <strong>آدرس</strong>
                                            </div>
                                            <div className="col-12">
                                                {this.state.customer.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="text-left">
                        <Link to={'/customers'} className="btn btn-primary">بازگشت به لیست مشتریان</Link>
                    </div>
                </div>
            </div>
        )
    }
}
