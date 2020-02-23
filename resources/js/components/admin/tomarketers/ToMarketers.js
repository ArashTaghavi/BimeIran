import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class ToMarketers extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            toMarketers: {
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
                        label: 'وضعیت',
                        field: 'status',
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
                        status: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount()
    {
        ax.get('/api/admin/to-marketers', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const reqs = response.data.to_marketers

            reqs.map(req =>
            {
                req.user_id = req.user.fname + ' ' + req.user.lname

                if (req.status === 0) {
                    req.actions = <Link to={`/to-marketer-request/${req.id}`} className="btn btn-info"><FeatherIcon icon="eye"/></Link>
                } else {
                    req.actions = ''
                }

                if (req.status === 0) {
                    req.status = <h5 className="badge badge-dark mb-0 font-weight-normal">بررسی نشده</h5>
                } else if (req.status === 1) {
                    req.status = <h5 className="badge badge-success mb-0 font-weight-normal">تایید شده</h5>
                } else {
                    req.status = <h5 className="badge badge-danger mb-0 font-weight-normal">رد شده</h5>
                }

                delete req.id
                delete req.user
            })

            this.setState({
                ...this.state,
                toMarketers: {
                    ...this.state.toMarketers,
                    rows: reqs
                }
            }, () => {
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
                    <h4 className="mb-4">درخواست های تبدیل به بازاریاب</h4>
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
                        data={this.state.toMarketers}
                    />
                </div>
            </div>
        )
    }
}
