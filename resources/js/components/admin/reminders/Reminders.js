import React, { Component } from 'reactn'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import $ from 'jquery'
import ax from 'axios'
import { token } from './../helpers/AuthHelper'

export default class Reminders extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            reminders: {
                columns: [
                    {
                        label: 'نام و نام خانوادگی',
                        field: 'fullname',
                        sort: 'asc'
                    },
                    {
                        label: 'شماره همراه',
                        field: 'phone',
                        sort: 'asc'
                    },
                    {
                        label: 'تاریخ سررسید',
                        field: 'deadline',
                        sort: 'asc'
                    },
                    {
                        label: 'کد رهگیری',
                        field: 'code',
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
                        fname: <i className="fa fa-spinner fa-spin"></i>,
                        lname: <i className="fa fa-spinner fa-spin"></i>,
                        phone: <i className="fa fa-spinner fa-spin"></i>,
                        actions: <i className="fa fa-spinner fa-spin"></i>,
                    }
                ]
            },
        }
    }

    componentDidMount()
    {
        ax.get('/api/admin/reminders', {
            headers: {
                'admin-token': token(),
            }
        }).then(response => {
            const reminders = response.data.reminders

            reminders.map(reminder => {
                reminder.actions = <Link to={`/reminder/${reminder.id}`} className="btn btn-info"><FeatherIcon icon="eye"/></Link>
                delete reminder.id
                if (!reminder.deadline) {
                    reminder.deadline = 'در اسرع وقت'
                }
            })

            this.setState({
                ...this.state,
                reminders: {
                    ...this.state.reminders,
                    rows: reminders
                }
            }, () => {
            })
        }).catch(reason => {
            console.log(reason.response)
        })
    }

    render()
    {
        return (
            <div className="admin-marketer-panel-content">
                <div className="card shadow-sm p-3 p-md-4">
                    <h4 className="mb-4">لیست یادآوری ها</h4>
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
                        data={this.state.reminders}
                    />
                </div>
            </div>
        )
    }
}
