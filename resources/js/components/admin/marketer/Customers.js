import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class Customers extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            customers: {
                columns: [
                    {
                        label: 'نام و نام خانوادگی',
                        field: 'full_name',
                        sort: 'asc'
                    },
                    {
                        label: 'کد ملی',
                        field: 'national_code',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره همراه',
                        field: 'phone',
                        sort: 'asc'
                    },
                    {
                        label: 'عملیات',
                        field: 'actions',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        full_name: <i className="fa fa-spinner fa-spin"></i>,
                        national_code: <i className="fa fa-spinner fa-spin"></i>,
                        phone: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }

        this.goBack = this.goBack.bind(this)
    }

    componentDidMount()
    {
        ax.get(`/api/admin/marketers/${this.props.match.params.id}/customers`, {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const customers = response.data.customers

            customers.map(customer => {
                customer.actions = <Link to={`/marketer/${this.props.match.params.id}/customer/${customer.id}`} className="btn btn-info"><FeatherIcon icon="eye"/></Link>
                delete customer.id
            })

            this.setState({
                ...this.state,
                customers: {
                    ...this.state.customers,
                    rows: customers
                }
            }, () => {
            })
        }).catch(reason => {
            // console.log(reason)
        })
    }

    goBack(e)
    {
        e.preventDefault()

        this.props.history.goBack()
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <div className="row align-row mb-4">
                        <div className="col-6">
                            <h4 className="mb-0">لیست مشتریان بازاریاب</h4>
                        </div>
                        <div className="col-6 text-left">
                            <button onClick={this.goBack} className="btn btn-info">بازگشت</button>
                        </div>
                    </div>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        responsive
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        className="responsive-table"
                        data={this.state.customers}
                    />
                </div>
            </div>
        )
    }
}
