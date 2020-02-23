import React, { Component, Fragment } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import n from '../../../sdk/nprogress'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class WithdrawList extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            withdraws: {
                columns: [
                    {
                        label: 'تاریخ درخواست',
                        field: 'issue_date',
                        sort: 'asc'
                    },
                    {
                        label: 'مبلغ',
                        field: 'amount',
                        sort: 'asc'
                    },
                    {
                        label: 'وضعیت',
                        field: 'status',
                        sort: 'asc'
                    },
                    {
                        label: 'کد رهگیری',
                        field: 'tracking_code',
                        sort: 'asc'
                    },
                ],
                rows: [
                    {
                        issue_date: <i className="fa fa-spinner fa-spin"></i>,
                        amount: <i className="fa fa-spinner fa-spin"></i>,
                        status: <i className="fa fa-spinner fa-spin"></i>,
                        tracking_code: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount()
    {
        ax.get('/api/marketer/withdraws', {
            headers: {
                'marketer-token': token(),
            }
        }).then(response => {
            const withdraws = response.data.withdraws

            withdraws.map(withdraw => {
                withdraw.id = withdraw.persian_date

                withdraw.amount = withdraw.amount + ' ریال'

                if (withdraw.status === 0) {
                    withdraw.status = <h5 className="badge badge-info mb-0 font-weight-normal">در حال بررسی...</h5>
                } else if (withdraw.status === 1) {
                    withdraw.status = <h5 className="badge badge-success mb-0 font-weight-normal">پرداخت شده</h5>
                } else {
                    withdraw.status = <h5 className="badge badge-danger mb-0 font-weight-normal">رد درخواست</h5>
                }

                delete withdraw.created_at
                delete withdraw.persian_date
            })

            this.setState({
                ...this.state,
                withdraws: {
                    ...this.state.withdraws,
                    rows: withdraws
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
                    <h4 className="mb-4">لیست درخواست برداشت وجه</h4>
                    <MDBDataTable
                        striped
                        barReverse
                        btn
                        entriesLabel="تعداد نتایج در هر صفحه"
                        info={false}
                        paginationLabel={["قبلی", "بعدی"]}
                        searchLabel="جستجو"
                        data={this.state.withdraws}
                    />
                </div>
            </div>
        )
    }
}
